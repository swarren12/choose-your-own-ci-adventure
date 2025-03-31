//
// Scenario 3: Commit broken, obvious cause.
//

import {Commit, Job, JobStatus, NOTHING_SPECIAL_HAPPENS, Scenario, Transition, WorldState} from '@/utils.mjs';
import Scenario3 from '@/pages/Scenario3.vue';

const MUCH_EARLIER = new Date(2025, 4, 1, 8, 44, 37);
const EARLIER = new Date(2025, 4, 1, 8, 56, 32);
const BEGIN = new Date(2025, 4, 1, 9, 13, 1);

// Jobs

const job_commit = new Job('commit', 120/*, ['acceptance', 'integration', 'analysis']*/);
// const job_acceptance = new Job('acceptance', 1155);
// const job_integration = new Job('integration', 544);
// const job_analysis = new Job('analysis', 182);

const jobs = [job_commit/*, job_acceptance, job_integration, job_analysis*/];

// Commits

const commit1 = new Commit('Re-implement processing logic to be easier to extend', 'person1@example.co');
const commit2 = new Commit('Update tolerance threshold from 10 to 15', 'person2@example.co');
const commit3 = new Commit('Make approval required for high-value transactions', 'person1@example.co');
const commits = [];

job_commit.add_build([commit1], JobStatus.PASS, MUCH_EARLIER, 100, 0);
job_commit.add_build([commit2], JobStatus.FAIL, EARLIER, 100, 0);

// World State

const state = new WorldState(jobs, commits, BEGIN);

// Transitions

// 19xxxx: Finale

/* Second time lucky, I guess */
const transition_190001 = new Transition(
    190001,
    'Job done!',
    `--- Conversation started @ 09:13 ---

      [You] cool
      [You] let me know if you have any other problems
[Colleague] Thanks for the help!


> How do you respond?`,
    5,
    NOTHING_SPECIAL_HAPPENS,
    []
);

/* Reject them. You're too busy... */
const transition_190000 = new Transition(
    190000,
    'Sorry...',
    `--- Conversation started @ 09:13 ---

      [You] sorry, the person you are calling is currently unavailable
      [You] to leave a message, press 11
[Colleague] ...`,
    0,
    NOTHING_SPECIAL_HAPPENS,
    []
);

// 15xxxx: Mid-point

/* Big fish, little fish, cardboard box */
const transition_150310 = new Transition(
    150310,
    'LMGTFY',
    `--- Conversation started @ 09:13 ---

      [You] have you tried searching for the error online?
[Colleague] No.
[Colleague] I'll give that a go now.
...
[Colleague] I found a post on the Buffer Underflow forums with a similar error.
[Colleague] Apparently exit 137 can be caused by an Out of Memory error


> How do you respond?`,
    231,
    NOTHING_SPECIAL_HAPPENS,
    []
);

/* Big fish, little fish, cardboard box */
const transition_150302 = new Transition(
    150302,
    '...',
    `--- Conversation started @ 09:13 ---

      [You] "Reacher said nothing"
[Colleague] Huh?
[Colleague] What?
      [You] nevermind
      [You] maybe there's some way we can get some more information on that error?
[Colleague] Oh, you mean...
      [You] ...


> How do you respond?`,
    61,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150310]
);

/* The world's first consulting detective */
const transition_150301 = new Transition(
    150300,
    'Investigate',
    `--- Conversation started @ 09:13 ---

      [You] even though it passed the second time, maybe we should look into it more
      [You] do you have the error from the failed run?
[Colleague] Yes, I think I sent it to you earlier.
[Colleague] Maybe I didn't...
[Colleague] Anyway, here it is:
              > Building application... (eta: 25s)
              > [1]    172896 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Colleague] I'm not really sure what's going on there.


> How do you respond?`,
    113,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150310, transition_150302]
);

/* The world's first consulting detective */
const transition_150300 = new Transition(
    150300,
    'Investigate',
    `--- Conversation started @ 09:13 ---

      [You] we should have a look at the failure
      [You] do you have the error from the latest run?
[Colleague] Yes.
[Colleague] I checked and it's the same in both runs, only the "eta" changes.
[Colleague] Here's the end of the last run:
              > Building application... (eta: 25s)
              > Building application... (eta: 20s)
              > [1]    180147 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Colleague] I'm not really sure what's going on there.


> How do you respond?`,
    101,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150310, transition_150302]
);

/* Fool me once, shame on me */
const transition_150200 = new Transition(
    150200,
    '🤔',
    `--- Conversation started @ 09:13 ---

      [You] hmm
      [You] interesting
[Colleague] ?
      [You] we should probably ask people not to push any more changes for the time being
[Colleague] Good idea.
[Colleague] I'll let everyone else know!
[Colleague] But how do we fix it?


> How do you respond?`,
    59,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150300]
);

// 1003xx: Re-run

/* Patience is a virtue */
const transition_100302 = new Transition(
    100302,
    'Just wait',
    `--- Conversation started @ 09:13 ---

      [You] let's just wait for the run to finish
[Colleague] Sure, I'll keep an eye on it.
...
[Colleague] Hey, the job completed!
[Colleague] Oh no...
[Colleague] It failed again!


> How do you respond?`,
    128,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150200, transition_150300]
);

/* Patience is a virtue */
const transition_100301 = new Transition(
    100301,
    'Just wait',
    `--- Conversation started @ 09:13 ---

      [You] let's just wait for the run to finish
[Colleague] Sure, I'll keep an eye on it.
...
[Colleague] Hey, the job completed!
[Colleague] Looks like it passed this time?


> How do you respond?`,
    125,
    NOTHING_SPECIAL_HAPPENS,
    [transition_190001, transition_150301]
);

/* Run it again, Sam */
const transition_100300 = new Transition(
    100300,
    'Run it again',
    `--- Conversation started @ 09:13 ---

      [You] how many times has it failed?
[Colleague] Just once.
      [You] maybe we should run it again, and see if it fails again
[Colleague] Good idea!
[Colleague] I'll kick off a new run now.
[Colleague] Do we need to do anything else?


> How do you respond?`,
    81,
    (state) => {
        state.rerun('commit')
    },
    [transition_100301]
);

// 1002xx: Investigate the failure

/* Well, I'm stumped! */
const transition_100210 = new Transition(
    100210,
    'Speculative revert',
    `--- Conversation started @ 09:13 ---

      [You] we should revert the commit first, just in case
[Colleague] Okay, I'll do that now!
...
[Colleague] Done - it took a while because it was my first commit of the day.
[Colleague] The revert should be landing in CI any moment.
[Colleague] What next?


> How do you respond?`,
    311,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'colleague@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302]
);

/* Just one more thing, sir... */
const transition_100200 = new Transition(
    100200,
    'Investigate',
    `--- Conversation started @ 09:13 ---

      [You] maybe we should look at what went wrong
      [You] it doesn't look like any tests failed
[Colleague] I had a look in the job log but I couldn't find anything obvious.
[Colleague] The last few lines just look like this:
              > Building application... (eta: 25s)
              > [1]    172896 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Colleague] That doesn't seem very helpful.
      [You] you're right, that message doesn't tell us very much
[Colleague] Is there any way we can get more information?


> How do you respond?`,
    94,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100210, transition_100300, transition_150310, transition_150302]
);

/* A quick peek won't hurt? */
const transition_100201 = new Transition(
    100201,
    'Investigate',
    `--- Conversation started @ 09:13 ---

      [You] whilst we wait, maybe we should look at what went wrong
      [You] it doesn't look like any tests failed
[Colleague] I had a look in the job log but I couldn't find anything obvious.
[Colleague] The last few lines just look like this:
              > Building application... (eta: 25s)
              > [1]    172896 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Colleague] That doesn't seem very helpful.
      [You] you're right, that message doesn't tell us very much
[Colleague] Is there any way we can get more information?


> How do you respond?`,
    94,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150310, transition_150302]
);

// 1001xx: Help out the colleague

/* No way, Jose */
const transition_100121 = new Transition(
    100121,
    'Actually...',
    `--- Conversation started @ 09:13 ---

      [You] maybe we shouldn't be so hasty
      [You] there's a few other things we could do first
[Colleague] Oh!
[Colleague] Like what?
      [You] well...

> How do you respond?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100300, transition_100200]
);

/* Do it. Do it now! */
const transition_100120 = new Transition(
    100120,
    'Yes',
    `--- Conversation started @ 09:13 ---

      [You] yes
      [You] there's no need to worry, they can always reapply it later
[Colleague] Okay, I'll do that now!
...
[Colleague] Done - it took a while because it was my first commit of the day.
[Colleague] The revert should be landing in CI any moment.
[Colleague] What next?


> How do you respond?`,
    311,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'colleague@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302, transition_100201]
);

/* Take matters into your own hands */
const transition_100113 = new Transition(
    100113,
    'Revert them yourself',
    `--- Conversation started @ 09:13 ---

      [You] just revert them
      [You] no point wasting any time
[Colleague] Okay, I'll do that now!
...
[Colleague] Done - it took a while because it was my first commit of the day.
[Colleague] The revert should be landing in CI any moment.
[Colleague] What next?


> How do you respond?`,
    311,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'colleague@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302]
);

/* Please, sir... */
const transition_100112 = new Transition(
    100112,
    'Ask them to revert',
    `--- Conversation started @ 09:13 ---

      [You] you could ask them to revert
      [You] they can always reapply the commit later
[Colleague] Okay! I'll ask them
...
[Colleague] They were a bit reluctant, but eventually they agreed.
[Colleague] Their revert should be landing in CI any moment.
[Colleague] What next?


> How do you respond?`,
    153,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'person2@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302, transition_100201]
);

/* Well, they would say that, wouldn't they... */
const transition_100111 = new Transition(
    100111,
    'Revert anyway',
    `--- Conversation started @ 09:13 ---

      [You] even so, we should revert it anyway, just to be sure
[Colleague] Should I ask them to, or should I just do it myself?


> How do you respond?`,
    88,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100112, transition_100113]
);

/* Talkin' 'bout my generation */
const transition_100110 = new Transition(
    100110,
    'Check with the commit author',
    `--- Conversation started @ 09:13 ---

      [You] have you asked the author of that commit about it?
[Colleague] I did.
[Colleague] They said that the commit worked fine on their machine.
[Colleague] The failure must be something else.
      [You] could be, but still...


> How do you respond?`,
    95,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100111, transition_100200]
);

/* Revert first, ask questions later! */
const transition_100101 = new Transition(
    100101,
    'Revert first...',
    `--- Conversation started @ 09:13 ---

      [You] there's only one change in that build, right?
[Colleague] Yes, but as I said, it doesn't look like it would break anything.
      [You] remember the golden rule of CI: "Revert first, ask questions later"
[Colleague] So I should revert the commit?


> How do you respond?`,
    64,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100120, transition_100121, transition_100110]
);

/* Help! I need somebody. Help! Not just anybody~ */
const transition_100100 = new Transition(
    100100,
    'How can I help you?',
    `--- Conversation started @ 09:13 ---

      [You] sure
      [You] what's up?
[Colleague] It's my turn to look after CI, but it seems broken.
[Colleague] I don't really understand what's going on.
[Colleague] I was hoping you'd be able to help me.
      [You] what do you mean "seems broken"?
[Colleague] The \`commit\` build failed but I can't work out why... 
[Colleague] There's only one change in the last build, but it doesn't sound like it would break anything
              > "Update tolerance threshold from 10 to 15 <person2@example.co>"


> How do you respond?`,
    61,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100101, transition_100110, transition_100300, transition_100200]
);

// Scenario

const scenario = new Scenario(
    'lfg',
    'LFG!',
    Scenario3,
    state,
    `--- Conversation started @ 09:13 ---

[Colleague] Hey, good morning!
      [You] good morning
[Colleague] Sorry to bother you so early, but I need your help with something.


> How do you respond?`,
    [transition_100100, transition_190000]
);

export default scenario;