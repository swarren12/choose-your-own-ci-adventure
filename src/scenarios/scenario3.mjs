//
// Scenario 3: Commit broken, obvious cause.
//

import {Commit, Job, JobStatus, NOTHING_SPECIAL_HAPPENS, Scenario, Transition, WorldState} from '@/utils.mjs';
import Scenario3 from '@/pages/Scenario3.vue';

const MUCH_EARLIER = new Date(2025, 4, 1, 8, 44, 37);
const EARLIER = new Date(2025, 4, 1, 8, 56, 32);
const BEGIN = new Date(2025, 4, 1, 9, 13, 1);

// Jobs

const job_commit = new Job('commit', 120);
const jobs = [job_commit];

// Commits

const commit1 = new Commit('Re-implement processing logic to be easier to extend', 'jeff@example.co');
const commit2 = new Commit('Update tolerance threshold from 10 to 15', 'geoff@example.co');
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
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] cool
    [You] let me know if you have any other problems
[Godfrey] Thanks for the help!`,
    5,
    NOTHING_SPECIAL_HAPPENS,
    []
);

/* Reject them. You're too busy... */
const transition_190000 = new Transition(
    190000,
    'Sorry...',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] sorry, the person you are calling is currently unavailable
    [You] to leave a message, press 11
[Godfrey] ...`,
    0,
    NOTHING_SPECIAL_HAPPENS,
    []
);

// 15xxxx: Mid-point

/* Big fish, little fish, cardboard box */
const transition_150310 = new Transition(
    150310,
    'LMGTFY',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] have you tried searching for the error online?
[Godfrey] No.
[Godfrey] I'll give that a go now.
...
[Godfrey] I found a post on the Buffer Underflow forums with a similar error.
[Godfrey] Apparently exit 137 can be caused by an Out of Memory error


> How do you respond?`,
    231,
    NOTHING_SPECIAL_HAPPENS,
    []
);

/* Big fish, little fish, cardboard box */
const transition_150302 = new Transition(
    150302,
    '...',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] "Reacher said nothing"
[Godfrey] Huh?
[Godfrey] What?
    [You] nevermind
    [You] maybe there's some way we can get some more information on that error?
[Godfrey] Oh, you mean...
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
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] even though it passed the second time, maybe we should look into it more
    [You] do you have the error from the failed run?
[Godfrey] Yes, I think I sent it to you earlier.
[Godfrey] Maybe I didn't...
[Godfrey] Anyway, here it is:
              > Building application... (eta: 25s)
              > [1]    172896 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Godfrey] I'm not really sure what's going on there.


> How do you respond?`,
    113,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150310, transition_150302]
);

/* The world's first consulting detective */
const transition_150300 = new Transition(
    150300,
    'Investigate',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] we should have a look at the failure
    [You] do you have the error from the latest run?
[Godfrey] Yes.
[Godfrey] I checked and it's the same in both runs, only the "eta" changes.
[Godfrey] Here's the end of the last run:
              > Building application... (eta: 25s)
              > Building application... (eta: 20s)
              > [1]    180147 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Godfrey] I'm not really sure what's going on there.


> How do you respond?`,
    101,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150310, transition_150302]
);

/* Fool me once, shame on me */
const transition_150200 = new Transition(
    150200,
    '🤔',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] hmm
    [You] interesting
[Godfrey] ?
    [You] we should probably ask people not to push any more changes for the time being
[Godfrey] Good idea.
[Godfrey] I'll let everyone else know!
[Godfrey] But how do we fix it?


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
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] let's just wait for the run to finish
[Godfrey] Sure, I'll keep an eye on it.
...
[Godfrey] Hey, the job completed!
[Godfrey] Oh no...
[Godfrey] It failed again!


> How do you respond?`,
    128,
    NOTHING_SPECIAL_HAPPENS,
    [transition_150200, transition_150300]
);

/* Patience is a virtue */
const transition_100301 = new Transition(
    100301,
    'Just wait',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] let's just wait for the run to finish
[Godfrey] Sure, I'll keep an eye on it.
...
[Godfrey] Hey, the job completed!
[Godfrey] Looks like it passed this time?


> How do you respond?`,
    125,
    NOTHING_SPECIAL_HAPPENS,
    [transition_190001, transition_150301]
);

/* Run it again, Sam */
const transition_100300 = new Transition(
    100300,
    'Run it again',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] how many times has it failed?
[Godfrey] Just once.
    [You] maybe we should run it again, and see if it fails again
[Godfrey] Good idea!
[Godfrey] I'll kick off a new run now.
[Godfrey] Do we need to do anything else?


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
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] we should revert the commit first, just in case
[Godfrey] Okay, I'll do that now!
...
[Godfrey] Done - it took a while because it was my first commit of the day.
[Godfrey] The revert should be landing in CI any moment.
[Godfrey] What next?


> How do you respond?`,
    311,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'godfrey@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302]
);

/* Just one more thing, sir... */
const transition_100200 = new Transition(
    100200,
    'Investigate',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] maybe we should look at what went wrong
    [You] it doesn't look like any tests failed
[Godfrey] I had a look in the job log but I couldn't find anything obvious.
[Godfrey] The last few lines just look like this:
              > Building application... (eta: 25s)
              > [1]    172896 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Godfrey] That doesn't seem very helpful.
    [You] you're right, that message doesn't tell us very much
[Godfrey] Is there any way we can get more information?


> How do you respond?`,
    94,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100210, transition_100300, transition_150310, transition_150302]
);

/* A quick peek won't hurt? */
const transition_100201 = new Transition(
    100201,
    'Investigate',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] whilst we wait, maybe we should look at what went wrong
    [You] it doesn't look like any tests failed
[Godfrey] I had a look in the job log but I couldn't find anything obvious.
[Godfrey] The last few lines just look like this:
              > Building application... (eta: 25s)
              > [1]    172896 killed     fancy-build-script.sh
              > Job failed (exit=137)
[Godfrey] That doesn't seem very helpful.
    [You] you're right, that message doesn't tell us very much
[Godfrey] Is there any way we can get more information?


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
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] maybe we shouldn't be so hasty
    [You] there's a few other things we could do first
[Godfrey] Oh!
[Godfrey] Like what?
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
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] yes
    [You] there's no need to worry, he can always reapply it later
[Godfrey] Okay, I'll do that now!
...
[Godfrey] Done - it took a while because it was my first commit of the day.
[Godfrey] The revert should be landing in CI any moment.
[Godfrey] What next?


> How do you respond?`,
    311,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'godfrey@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302, transition_100201]
);

/* Take matters into your own hands */
const transition_100113 = new Transition(
    100113,
    'Revert them yourself',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] just revert him
    [You] no point wasting any time
[Godfrey] Okay, I'll do that now!
...
[Godfrey] Done - it took a while because it was my first commit of the day.
[Godfrey] The revert should be landing in CI any moment.
[Godfrey] What next?


> How do you respond?`,
    311,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'godfrey@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302]
);

/* Please, sir... */
const transition_100112 = new Transition(
    100112,
    'Ask them to revert',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] you could ask him to revert
    [You] he can always reapply the commit later
[Godfrey] Okay, I'll ask him!
...
[Godfrey] He was a bit reluctant, but eventually he agreed.
[Godfrey] His revert should be landing in CI any moment.
[Godfrey] What next?


> How do you respond?`,
    153,
    (state) => {
        const revert = state.commit('Revert "Update tolerance threshold from 10 to 15"', 'geoff@example.co');
        revert.expect_failures("commit", -1);
    },
    [transition_100302, transition_100201]
);

/* Well, they would say that, wouldn't they... */
const transition_100111 = new Transition(
    100111,
    'Revert anyway',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] even so, we should revert it anyway, just to be sure
[Godfrey] Should I ask him to, or should I just do it myself?


> How do you respond?`,
    88,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100112, transition_100113]
);

/* Talkin' 'bout my generation */
const transition_100110 = new Transition(
    100110,
    'Check with Geoff',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] have you asked Geoff about it?
[Godfrey] I did.
[Godfrey] He said that the commit worked fine on his machine.
[Godfrey] The failure must be something else.
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
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] there's only one change in that build, right?
[Godfrey] Yes, but as I said, it doesn't look like it would break anything.
    [You] remember the golden rule of CI: "Revert first, ask questions later"
[Godfrey] So I should revert the commit?


> How do you respond?`,
    64,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100120, transition_100121, transition_100110]
);

/* Help! I need somebody. Help! Not just anybody~ */
const transition_100100 = new Transition(
    100100,
    'How can I help you?',
    `--- Chat with Godfrey @ 09:13 (cont...) ---

    [You] sure
    [You] what's up?
[Godfrey] It's my turn to look after CI, but it seems broken.
[Godfrey] I don't really understand what's going on.
[Godfrey] I was hoping you'd be able to help me.
    [You] what do you mean "seems broken"?
[Godfrey] The \`commit\` build failed but I can't work out why... 
[Godfrey] There's only one change in the last build, but it doesn't sound like it would break anything
              > "Update tolerance threshold from 10 to 15" 
              > 
              > 7c850a24 Geoff <geoff@example.co> on 01/04/2025 at 08:43:17


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
    `--- Chat with Godfrey @ 09:13 ---

[Godfrey] Hey, good morning!
    [You] good morning
[Godfrey] Sorry to bother you so early, but I need your help with something.


> How do you respond?`,
    [transition_100100, transition_190000]
);

export default scenario;