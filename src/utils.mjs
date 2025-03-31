//
// utils.mjs - Useful functions that don't really belong anywhere else.
//

/*
 * A no-op state transformation.
 */
export const NOTHING_SPECIAL_HAPPENS = (state) => {
};

/*
 * Possible job statuses
 */
export const JobStatus = Object.freeze({
    PASS: Symbol('pass'),
    FAIL: Symbol('fail'),
    DISABLED: Symbol('disabled'),
});

/*
 * A job that is running in CI.
 */
export class Job {

    _name;
    _duration;
    _triggers;

    _builds = [];
    _queued = null;

    // Constructor

    constructor(name, duration, triggers = []) {
        this._name = name;
        this._duration = duration;
        this._triggers = triggers;
    }

    // Getters

    /*
     * Get the Job name.
     */
    get name() {
        return this._name;
    }

    /*
     * Get the Job duration.
     */
    get duration() {
        return this._duration;
    }

    // Helper Methods

    /*
     * Get the status of the build.
     */
    get status() {
        return this._last_completed_build._status || JobStatus.DISABLED;
    }

    /*
     * Get the status of the build.
     */
    get failures() {
        return this._last_completed_build._failures || 0;
    }

    /*
     * Get the status of the build.
     */
    get progress() {
        return this._latest_build._progress;
    }

    /*
     * Queue up a new build.
     */
    queue(commits) {
        if (!this._queued) {
            this._queued = new Build(this, [], null, 0);
        }

        this._queued._commits.push(...commits);
    }

    /*
     * Trigger the queued build.
     */
    trigger(now) {
        if (!this._queued) return;
        if (this._latest_build._progress < 100) return; // build in progress

        // console.debug('Triggering build of', this);
        this._queued._started_at = now;
        this._queued._progress = 1;
        this._builds.push(this._queued);
        this._queued = null;
    }

    /*
     * Add an initial build.
     */
    add_build(commits, status, started_at, progress = 100, failures = 0) {
        this._builds.push(new Build(this, commits, status, started_at, progress, failures));
    }

    /*
     * Get the latest completed Build of this Job.
     */
    get _latest_build() {
        return this._builds.length > 0
            ? this._builds[this._builds.length - 1]
            : new Build(null, [], JobStatus.DISABLED, null, 100, 0);
    }

    /*
     * Get the latest completed Build of this Job.
     */
    get _last_completed_build() {
        if (this._builds.length < 1) return new Build(null, [], JobStatus.DISABLED, null, 100, 0);

        const latest = this._builds[this._builds.length - 1];
        if (!!latest._status)
            return latest;

        return this._builds.length > 1
            ? this._builds[this._builds.length - 2]
            : new Build(null, [], JobStatus.DISABLED, null, 100, 0);
    }

    /*
     * Advance this Job.
     */
    _advance(new_time, on_complete) {
        // console.debug('Cloning job:', this._name);
        const clone = new Job(
            this._name,
            this._duration,
            [...this._triggers]
        );

        clone._builds = [];
        // console.debug('Cloning builds for job:', this._name);
        let is_build_in_progress = false;
        if (this._builds.length > 0) {
            // Clone all but the last
            for (let i = 0; i < this._builds.length - 1; i++) {
                const build = this._builds[i];
                clone._builds.push(build._clone(clone));
            }

            const latest_build = this._builds[this._builds.length - 1];
            // console.debug('Latest build:', latest_build);
            if (!!latest_build._status) {
                clone._builds.push(latest_build._clone(clone));
            } else {
                const expected_end = latest_build._started_at.getTime() + (this._duration * 1000);
                const is_still_in_progress = expected_end > new_time.getTime();
                // console.debug('Checking if latest build is in complete:', expected_end, new_time.getTime(), is_still_in_progress);
                if (is_still_in_progress) {
                    is_build_in_progress = true;
                    // console.debug('Latest build of job', this._name, 'is still in progress!');
                    clone._builds.push(latest_build._advance(clone, new_time));
                } else {
                    const failures = latest_build._commits.reduce(
                        (p, c) => {
                            if (p < 0) return p;
                            const failures = c.get_expected_failures(this._name);
                            if (failures < 0) return failures;
                            return p + failures;
                        },
                        0
                    );
                    const status = failures === 0 ? JobStatus.PASS : JobStatus.FAIL;
                    // console.debug('Latest build of job', this._name, 'completed. Status:', status, 'Failures:', failures);

                    const completed = new Build(
                        clone,
                        [...latest_build._commits],
                        status,
                        latest_build._started_at,
                        100,
                        Math.max(0, failures)
                    );
                    clone._builds.push(completed);

                    this._triggers.forEach(trigger => on_complete.call(clone, trigger, completed._commits));
                }
            }
        }

        // console.debug('Checking if queued build needs to be triggered:', !is_build_in_progress);
        // Trigger a queued build if possible
        // console.debug('Queued build:', this._queued);
        if (!!this._queued) {
            const queued_clone = this._queued._clone(clone);
            if (is_build_in_progress) clone._queued = queued_clone;
            else {
                queued_clone._started_at = new_time;
                clone._builds.push(queued_clone);
            }
        }
        return clone;
    }

}

/*
 * A job that is running in CI.
 */
export class Build {

    _job;
    _commits;
    _status;
    _started_at;
    _progress;
    _failures;

    // Constructor

    constructor(job, commits, status, started_at, progress, failures) {
        this._job = job;
        this._commits = commits;
        this._status = status;
        this._started_at = started_at;
        this._progress = progress;
        this._failures = failures;
    }

    // Getters

    /*
     * Get the overall job.
     */
    get job() {
        return this._job;
    }

    /*
     * Get the commits in the current Build.
     */
    get commits() {
        return [...this._commits];
    }

    /*
     * Get the Job status.
     */
    get status() {
        return this._status;
    }

    /*
     * Get the Build progress.
     */
    get started_at() {
        return this._started_at;
    }

    /*
     * Get the progress of the Build.
     */
    get progress() {
        return this._progress;
    }

    /*
     * Get the number of failures in the Build.
     */
    get failures() {
        return this._failures;
    }

    // Helper Methods

    /*
     * Advance this Build.
     */
    _advance(job_clone, new_time) {
        // console.debug('Advancing build. Started at:', this._started_at, 'Currently:', new_time);
        const delta = new_time.getTime() - this.started_at.getTime();
        const progress = Math.floor(delta / (job_clone.duration * 1000) * 100);
        // console.debug('Duration:', delta, 'Expected:', job_clone.duration * 1000, 'Progress:', progress);
        return new Build(
            job_clone,
            [...this.commits],
            this._status,
            this._started_at,
            progress,
            this._failures
        );
    }

    /*
     * Clone this Build.
     */
    _clone(job_clone) {
        // console.debug('Cloning build for job', this._job._name, 'started at', this.started_at);
        return new Build(
            job_clone,
            [...this.commits],
            this._status,
            this._started_at,
            this._progress,
            this._failures
        );
    }

}

/*
 * A transition to apply to a Scenario.
 */
export class Transition {

    _id;
    _description;

    _narration;
    _duration;
    _modifier;
    _transitions;

    // Constructor

    constructor(id, description, narration, duration, modifier, transitions = []) {
        this._id = id;
        this._description = description;
        this._narration = narration;
        this._duration = duration;
        this._modifier = modifier;
        this._transitions = transitions;
    }

    // Getters

    /*
     * Get the ID of this Transition.
     */
    get id() {
        return this._id;
    }

    /*
     * Get the description of this Transition.
     */
    get description() {
        return this._description;
    }

    /*
     * Get the duration of this Transition.
     */
    get duration() {
        return this._duration;
    }

    // Helper Methods

    /*
     * Apply this transition to a given Scenario.
     */
    apply(scenario) {
        // console.debug("Generating new World State...");
        const new_state = scenario.state.apply(this._duration, this._modifier);

        return new Scenario(
            scenario.id,
            scenario.title,
            scenario.page,
            new_state,
            this._narration,
            this._transitions
        );
    }

}

/*
 * A commit.
 */
export class Commit {

    _message;
    _author;

    _trigger_failures_in = {};

    // Constructors

    constructor(message, author) {
        this._message = message;
        this._author = author;
    }

    // Getters

    // Helper Methods

    /*
     * Get the number of failures that this commit will
     * trigger in the specified job.
     */
    get_expected_failures(job_name) {
        return this._trigger_failures_in[job_name] || 0;
    }

    /*
     * Register an indication that this commit is expected
     * to trigger failures in a specific job.
     */
    expect_failures(job_name, number_of_failures) {
        this._trigger_failures_in[job_name] = number_of_failures;
    }

}

/*
 * Represents the current state of the world.
 */
export class WorldState {

    _jobs;
    _commits;
    _time;

    // Constructor

    constructor(jobs, commits, date = new Date()) {
        this._jobs = jobs;
        this._commits = commits;
        this._time = date;
    }

    // Getters

    /*
     * Get the current jobs.
     */
    get jobs() {
        return {...this._jobs};
    }

    /*
     * Get the current jobs.
     */
    get commits() {
        return [...this.commits];
    }

    // Helper Methods

    get current_time() {
        return this._time.toLocaleTimeString().slice(0, 5);
    }

    apply(duration, modifier) {
        // console.debug("Copying existing World State and advancing time...");
        const new_time = new Date(this._time.getTime() + (duration * 1000));
        const new_state = new WorldState(
            this._advance_builds(new_time),
            [...this._commits],
            new_time
        );
        modifier.call(null, new_state);
        new_state._jobs.forEach(job => job.trigger(this._time));
        return new_state;
    }

    /*
     * Add a commit.
     */
    commit(msg, author) {
        const commit = new Commit(msg, author);
        this._commits.push(commit);

        this._queue('commit', [commit]);
        return commit;
    }

    /*
     * Add a historic build to a Job.
     */
    rerun(job_name, commits = null) {
        const job = this._find_job(job_name);
        job.queue(commits || job._latest_build.commits);
    }

    /*
     * Add a historic build to a Job.
     */
    add_build(job_name, commits, status = null, started_at = null, progress = 100, failures = 0) {
        const job = this._find_job(job_name);
        job._builds.push(new Build(job, commits, status, started_at || this._time, progress, failures));
    }

    /*
     * Copy all Jobs.
     */
    _advance_builds(new_time) {
        const me = this;
        return this._jobs.map(j => j._advance(new_time, (job, commits) => me._queue(job, commits)));
    }

    /*
     * Queue a new run of a Job.
     */
    _queue(job_name, commits) {
        const job = this._find_job(job_name);
        job.queue(commits);
    }

    /*
     * Find a Job by name.
     */
    _find_job(job_name) {
        return this._jobs.filter(job => job._name === job_name)[0];
    }

}

/*
 * A scenario to explore a CI breakage.
 */
export class Scenario {

    _id;
    _title;
    _page;

    _state;
    _narration;
    _transitions;

    // Constructor

    constructor(id, title, page, state, narration, transitions) {
        this._id = id;
        this._title = title;
        this._page = page;
        this._state = state;
        this._narration = narration;
        this._transitions = transitions;
    }

    // Getters

    /*
     * Get the Scenario ID.
     */
    get id() {
        return this._id;
    }

    /*
     * Get the Scenario title.
     */
    get title() {
        return this._title;
    }

    /*
     * Get the Scenario Vue page.
     */
    get page() {
        return this._page;
    }

    /*
     * Get the Scenario jobs.
     */
    get state() {
        return this._state;
    }

    /*
     * Get the Scenario narration.
     */
    get narration() {
        return this._narration;
    }

    /*
     * Get the Scenario transitions.
     */
    get transitions() {
        return [...this._transitions];
    }

    // Helper Methods

}