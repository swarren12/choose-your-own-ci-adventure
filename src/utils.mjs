//
// utils.mjs - Useful functions that don't really belong anywhere else.
//

/*
 * Possible job statuses
 */
export const JobStatus = Object.freeze({
    PASS: Symbol('pass'),
    FAIL: Symbol('fail'),
});

/*
 * A job that is running in CI.
 */
export class Job {

    _name;
    _status;

    _progress = 100;
    _failures = 0;

    // Constructor

    constructor(name, status) {
        this._name = name;
        this._status = status;
    }

    // Getters

    /*
     * Get the Job name.
     */
    get name() {
        return this._name;
    }

    /*
     * Get the Job status.
     */
    get status() {
        return this._status;
    }

    /*
     * Get the Job progress.
     */
    get progress() {
        return this._progress;
    }

    /*
     * Get the number of failures in the Job.
     */
    get failures() {
        return this._failures;
    }

    // Helper Methods

    at(progress, failures = undefined) {
        const new_job = new Job(this._name, this._status);
        new_job._progress = progress;
        new_job._failures = failures || this._failures;
        return new_job
    }

    fail(failures) {
        const new_job = new Job(this._name, JobStatus.FAIL);
        new_job._progress = 100;
        new_job._failures = failures;
        return new_job
    }
}

/*
 * A transition to apply to a Scenario.
 */
export class Transition {

    _description;

    _narration;
    _duration;
    _jobs;
    _transitions;

    // Constructor

    constructor(description, narration, duration, jobs, transitions = []) {
        this._description = description;
        this._narration = narration;
        this._duration = duration;
        this._jobs = jobs;
        this._transitions = transitions;
    }

    // Getters

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
        return new Scenario(
            scenario.id,
            scenario.title,
            this._jobs,
            this._narration,
            this._transitions
        );
    }

}

/*
 * A scenario to explore a CI breakage.
 */
export class Scenario {

    _id;
    _title;

    _jobs;
    _narration;
    _transitions;

    // Constructor

    constructor(id, title, jobs, narration, transitions) {
        this._id = id;
        this._title = title;
        this._jobs = jobs;
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
     * Get the Scenario jobs.
     */
    get jobs() {
        return {...this._jobs};
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