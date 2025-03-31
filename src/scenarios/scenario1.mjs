//
// Scenario 1: Many acceptance tests broken.
//

import Scenario1 from '@/pages/Scenario1.vue';
import {Commit, Job, JobStatus, NOTHING_SPECIAL_HAPPENS, Scenario, Transition, WorldState} from '@/utils.mjs';

const MUCH_MUCH_EARLIER = new Date(2025, 4, 1, 11, 15, 33);
const MUCH_EARLIER = new Date(2025, 4, 1, 11, 35, 56);
const EARLIER = new Date(2025, 4, 1, 11, 40, 8);
const BEGIN = new Date(2025, 4, 1, 12, 4, 32);

// Jobs

const job_commit = new Job('commit', 183, ['acceptance']);
const job_acceptance = new Job('acceptance', 1223);

const jobs = [job_commit, job_acceptance]

// Commits

const initial_commit = new Commit('Refactor class in project/service', 'you@example.co');
initial_commit.expect_failures('acceptance', 100);
const commits = [initial_commit];

job_commit.add_build([initial_commit], JobStatus.PASS, MUCH_EARLIER, 100, 0);
job_acceptance.add_build([], JobStatus.PASS, MUCH_MUCH_EARLIER, 100, 0);
job_acceptance.add_build([initial_commit], null, EARLIER, 97, 0);

// World State

const state = new WorldState(jobs, commits, BEGIN);

// Transitions

// 11xx: Revert first, ask questions later...

/* Ship it and run */
const transition_1191 = new Transition(
    1191,
    'Go to lunch',
    `You go to lunch.

When you get back, everything looks happy.
You're not 100% sure it was your revert that fixed everything, but hey, what else could it have been?`,
    0,
    NOTHING_SPECIAL_HAPPENS
);

/* Wait for the commit build to finish */
const transition_1190 = new Transition(
    1190,
    'Wait',
    `Your commit completes running through the commit job.

A new acceptance test run starts.`,
    187,
    NOTHING_SPECIAL_HAPPENS
);

/* Run pre-commit hooks */
const transition_1110 = new Transition(
    1110,
    'Run checks',
    `You run the pre-commit checks and push the commit.

It takes a few minutes, but that's less time than you expected!
Nothing fails locally and you see CI pick up the new revision.


> What now?`,
    183,
    (state) => {
        state.commit('Revert "Refactor class in project/service"', 'you@example.co');
    },
    [transition_1190, transition_1191]
);

/* Skip pre-commit hooks */
const transition_1111 = new Transition(
    1111,
    'Skip checks',
    `
You ignore the pre-commit checks and push the commit.


> What now?`,
    15,
    (state) => {
        state.commit('Revert "Refactor class in project/service"', 'you@example.co');
    },
    [transition_1190, transition_1191]
);

/* Revert first, ask questions later... */
const transition_1100 = new Transition(
    1100,
    'Revert',
    `You revert your commit locally.

You remember when you pushed this commit initially, it took a while to run the pre-commit checks.
You reckon the same will be true about the revert.


> Should you run the pre-commit hooks?`,
    45,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1110, transition_1111]
);

// 12xx: Questions, questions, questions...

/* Skip pre-commit hooks */
const transition_1268 = new Transition(
    1268,
    'Go to lunch',
    `You go to lunch.

When you get back, everything and everyone looks happy.
Someone even brought in Lola's cupcakes.

          )
         (.)
         .|.
         l7J
         | |
     _.--| |--._
  .-';  ;\`-'& ; \`&.
 & &  ;  &   ; ;   \\
 \\      ;    &   &_/
  F"""---...---"""J
  | | | | | | | | |
  J | | | | | | | F
   \`---.|.|.|.---'
`,
    0,
    NOTHING_SPECIAL_HAPPENS
);

/* Skip pre-commit hooks */
const transition_1267 = new Transition(
    1267,
    'Wait',
    `Your commit completes running through the commit job.

A new acceptance test run starts.`,
    187,
    NOTHING_SPECIAL_HAPPENS
);

/* Skip pre-commit hooks */
const transition_1266 = new Transition(
    1266,
    'Skip checks',
    `
You ignore the pre-commit checks and push the commit.


> What now?`,
    15,
    (state) => {
        state.commit('Revert "Refactor class in project/service"', 'you@example.co');
    },
    [transition_1267, transition_1268]
);

/* Run pre-commit hooks */
const transition_1265 = new Transition(
    1265,
    'Run checks',
    `You run the pre-commit checks and push the commit.

Nothing fails locally so you push it.
A few seconds later, you see CI pick up the new revision.


> What now?`,
    32,
    (state) => {
        state.commit('Revert "Refactor class in project/service"', 'you@example.co');
    },
    [transition_1267, transition_1268]
);

/* One for all, and all for one */
const transition_1264 = new Transition(
    1264,
    'Ship it',
    `You decide that you don't need to run any acceptance tests locally.
    
The change you made is obviously going to work. 
You have absolute faith in both your reading comprehension and bug fixing skills.

After all, that's the whole point of CI, right?

In fact, the change is so small, you're not even sure you need to run the pre-commit hooks...


> Ship it?`,
    0,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1265, transition_1266]
);

/* One for all, and all for one */
const transition_1263 = new Transition(
    1263,
    'Run some ATs',
    `You run a couple of the acceptance tests that failed.
    
They all pass! 

    
> Ship it?`,
    27,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1265, transition_1266]
);

/* Run ALL the tests */
const transition_1262 = new Transition(
    1262,
    'Run all ATs',
    `You run all the acceptance tests that failed.
    
They all pass! 

    
> Ship it?`,
    271,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1265, transition_1266]
);

/* Run rabbit, run */
const transition_1261 = new Transition(
    1261,
    'Run ATs',
    `You redeploy the application locally.

You can either run all the failed tests, or just a sample. 
    
> Run all the tests?`,
    94,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1262, transition_1263]
);

/* Can we fix it? Yes we can! */
const transition_1260 = new Transition(
    1260,
    'Forward fix',
    `You correct the punctuation mistake.


> Do you want to run the tests locally?`,
    52,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1261, transition_1264]
);

/* Don't fix the commit message  */
const transition_1252 = new Transition(
    1252,
    'Do not edit the commit message',
    `You decide to use the default commit message.

You remember when you pushed this commit initially, it took a while to run the pre-commit checks.
You reckon the same will be true about the revert.


> Should you run the pre-commit hooks?`,
    0,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1110, transition_1111]
);

/* Fix up the commit message  */
const transition_1251 = new Transition(
    1251,
    'Edit the commit message',
    `You edit the commit message to include details of the test that failed.

You remember when you pushed this commit initially, it took a while to run the pre-commit checks.
You reckon the same will be true about the revert.


> Should you run the pre-commit hooks?`,
    30,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1110, transition_1111]
);

/* Revert... second?  */
const transition_1250 = new Transition(
    1250,
    'Revert',
    `You revert your commit locally.

You realise that, since you know what test failed, you could include this in the commit message.


> Do you want to change the commit message?`,
    45,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1251, transition_1252]
);

/* Fix up the commit message with _ALL_ the error details  */
const transition_1241 = new Transition(
    1241,
    'Edit the commit message',
    `You edit the commit message to include details of the test that failed.

You remember when you pushed this commit initially, it took a while to run the pre-commit checks.
You reckon the same will be true about the revert.


> Should you run the pre-commit hooks?`,
    30,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1110, transition_1111]
);

/* Revert... third?  */
const transition_1240 = new Transition(
    1240,
    'Revert',
    `You revert your commit locally.

You realise that, since you have details of the failure reason, you could include this in the commit message.


> Do you want to change the commit message?`,
    45,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1241, transition_1252]
);

/* Find out exactly what went wrong */
const transition_1210 = new Transition(
    1210,
    'Investigate more',
    `You decide to investigate further.

You go investigate the logs from the failing tests.
You start by having a look at the failures that were recorded in the CI job.

You skim through several of the different test cases.
They all look similar:

--------------------------------------------------------------
Failures: 1
1) shouldDoTheThingYouExpectedItTo() (co.example.tests.acceptance.ProjectServiceAcceptanceTest)
org.opentest4j.AssertionFailedError: 
expected: 
  "Hello and welcome to ProductService!"
 but was: 
  "Hello and welcome to ProductService."
        at co.example.tests.acceptance.ProjectServiceAcceptanceTest.shouldDoTheThingYouExpectedItTo(ProjectServiceAcceptanceTest.java:34)
--------------------------------------------------------------
    
This seems a straightforward thing to fix.


> Should you fix forward?
`,
    209,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1240, transition_1260]
);

/* Fix incoming, I promise! */
const transition_1200 = new Transition(
    1200,
    'Investigate',
    `You decide to spend some time investigating the failures.

You open the console log of the job.
As you could see from the summary, there were lots of tests that failed.
You scan the list of failures and see that a suite of tests related to your change failed:

--------------------------------------------------------------
...
//project/service:project-service-acceptance-test-suite FAILED in 223.1s
...
--------------------------------------------------------------


> What now?`,
    302,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1210, transition_1250]
);

// 13xx: Lunch time, bbl...

/* ;----; */
const transition_1390 = new Transition(
    1390,
    'Apologise for your negligence',
    `You apologise for the inconvenience you caused your other colleagues.

It's not that bad— after all, most of them only just got back from lunch, right???`,
    127,
    NOTHING_SPECIAL_HAPPENS
);

/* Gone for lunch: back soon */
const transition_1300 = new Transition(
    1300,
    'Go for lunch',
    `You decide to ignore the failures and go for lunch.

Because you left a bit later than everyone else, you also return later than them.
You notice that in the last 10 minutes, three different people have all messaged you.
All three are pointing out that you've broken the acceptance tests.

Just as you are about to reply to one of these messages, a new conversation pops up.
A fourth colleague is informing you not only that you have broken the tests, but that they've reverted your commit for you.

How helpful of them.
Thank you, colleague #4!`,
    3586,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1390]
);

// 100x: Start...

const transition_1000 = new Transition(
    1000,
    'Start',
    `Just as you're getting ready to lock your PC, the acceptance job finishes...

It looks like there are quite a lot of failures.
As far as you're aware, only your commit is in that build.


> What should you do?`,
    0,
    NOTHING_SPECIAL_HAPPENS,
    [transition_1100, transition_1200, transition_1300]
);

// Scenario

const scenario = new Scenario(
    'out-for-lunch',
    'Lunchtime blues!',
    Scenario1,
    state,
    `
##   ##  ######  ##      ##      ######
##   ##  ##      ##      ##      ##  ##
#######  ######  ##      ##      ##  ##
##   ##  ##      ##      ##      ##  ##
##   ##  ######  ######  ######  ######

It's 12:04.

All your colleagues have left for lunch.
You're planning on joining them, but you shipped a change a little while ago and you're keeping an eye on it.


> Press the start button to begin.
`,
    [transition_1000]
);

export default scenario;