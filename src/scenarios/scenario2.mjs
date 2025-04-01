//
// Scenario 2: Multiple failures, relatively obvious cause.
//

import Scenario2 from '@/pages/Scenario2.vue';
import {Commit, Job, JobStatus, NOTHING_SPECIAL_HAPPENS, Scenario, Transition, WorldState} from '@/utils.mjs';

const MUCH_MUCH_EARLIER = new Date(2025, 4, 1, 13, 2, 1);
const MUCH_EARLIER = new Date(2025, 4, 1, 13, 23, 14);
const EARLIER = new Date(2025, 4, 1, 13, 40, 8);
const BEGIN = new Date(2025, 4, 1, 13, 52, 32);

// Jobs

const job_commit = new Job('commit', 75, ['acceptance', 'integration', 'analysis']);
const job_acceptance = new Job('acceptance', 1155);
const job_integration = new Job('integration', 544);
const job_analysis = new Job('analysis', 182);

const jobs = [job_commit, job_acceptance, job_integration, job_analysis];

// Commits

const commit1 = new Commit('Fix spelling of Charcuterie', 'charlesb@example.co');
const commit2 = new Commit('Add extra verification step for withdrawing yoghurt', 'terryj@example.co');
const commit3 = new Commit('Avoid unnecessary work', 'norms@example.co');
const commits = [commit1, commit2, commit3];

commit1.expect_failures('analysis', 1);
commit2.expect_failures('acceptance', 26);
commit2.expect_failures('integration', 4);

// World State

const state = new WorldState(jobs, commits, BEGIN);

// Transitions

// 1003xx: Analysis

/* It's my party and I'll cry if I want to */
const transition_100352 = new Transition(
    100352,
    'Push the fix',
    `
"Case closed"                                                          ⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠄⠀⠒⠂⢀⡤⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀
The Sheriff wastes no time.                                            ⠀⠀⠀⠀⡀⠔⢈⠀⠀⡿⠀⢀⣤⡄⠈⠋⢁⣀⠀⢈⡒⢄⠀⠀⠀⠀
They push the fix, making sure to run the pre-commit checks first.     ⠀⠀⣠⠊⣁⡀⠉⠋⠀⣦⠀⠀⠁⢀⠀⠀⠀⠛⠀⠘⠃⣄⠑⢄⠀⠀
                                                                       ⠀⡔⡁⠀⠉⢁⣄⠄⠀⠈⠀⣶⠀⠈⠛⠀⣠⠄⠶⠦⠀⠑⠀⢬⣧⠀
The Sheriff sits back in their chair.                                  ⡐⠀⠿⢠⢄⠀⣀⠀⠀⡠⠄⠠⠔⠉⠢⡀⠉⠀⠀⢀⣴⠆⠀⠈⠁⢣
It'll be a while until the change makes it through the various jobs.   ⠃⣤⠄⠀⢁⣄⠙⠀⠘⠀⡠⠒⠉⠉⠒⢄⠉⢢⠀⠀⢀⡀⠟⠃⢴⡤
They'll check on it later.                                             ⡀⠀⢔⡀⠈⠋⠠⢄⠰⡜⠀⠀⠀⠀⠀⠀⠱⡜⢠⡤⠈⠛⠁⢀⣄⢀
                                                                       ⡇⠀⣀⡀⠀⠀⠀⠉⠀⠘⠢⣀⠀⠀⠀⡠⠊⢀⠈⠀⠀⢸⡄⠈⠁⢸
For now, there's a doughnut in the fridge with their name on it.       ⠰⡌⠋⠀⠰⣂⠛⠃⠀⢰⣆⠀⠈⣯⡁⢀⡀⠈⠋⠀⣔⠆⠀⠸⢆⡎
They think they've earned it.                                          ⠀⠸⡐⠂⠤⢀⠀⢶⠀⠀⣈⡀⠀⢈⡅⠈⠘⡁⠀⠶⠅⡀⠠⠒⡙⠀
                                                                       ⠀⠀⠐⡄⠀⠀⠱⡀⠀⠀⠉⢁⡠⢏⠁⠀⠚⠁⠀⢠⠊⠀⢀⠜⠀⠀
                                                                       ⠀⠀⠀⠈⠢⠀⠀⠈⠒⠀⠂⠁⠀⠀⠉⠂⠤⠤⠐⠁⢀⠴⠋⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠈⠑⠠⢄⡀⠀⠀⠀⠀⠀⠀⣀⡠⠄⠂⠁⠀⠀⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠉`,
    100,
    (state) => {
        state.commit('Correct translations to fix analysis test', 'peraltaj@example.co');
    },
    []
);

/* It's my party and I'll cry if I want to */
const transition_100351 = new Transition(
    100351,
    'Push anyway',
    `"All justice is best served swiftly".                                  ⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠄⠀⠒⠂⢀⡤⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀
The Sheriff wastes no time.                                            ⠀⠀⠀⠀⡀⠔⢈⠀⠀⡿⠀⢀⣤⡄⠈⠋⢁⣀⠀⢈⡒⢄⠀⠀⠀⠀
They push the revert, making sure to run the pre-commit checks first.  ⠀⠀⣠⠊⣁⡀⠉⠋⠀⣦⠀⠀⠁⢀⠀⠀⠀⠛⠀⠘⠃⣄⠑⢄⠀⠀
                                                                       ⠀⡔⡁⠀⠉⢁⣄⠄⠀⠈⠀⣶⠀⠈⠛⠀⣠⠄⠶⠦⠀⠑⠀⢬⣧⠀
The Sheriff sits back in their chair.                                  ⡐⠀⠿⢠⢄⠀⣀⠀⠀⡠⠄⠠⠔⠉⠢⡀⠉⠀⠀⢀⣴⠆⠀⠈⠁⢣
It'll be a while until the change makes it through the various jobs.   ⠃⣤⠄⠀⢁⣄⠙⠀⠘⠀⡠⠒⠉⠉⠒⢄⠉⢢⠀⠀⢀⡀⠟⠃⢴⡤
They'll check on it later.                                             ⡀⠀⢔⡀⠈⠋⠠⢄⠰⡜⠀⠀⠀⠀⠀⠀⠱⡜⢠⡤⠈⠛⠁⢀⣄⢀
                                                                       ⡇⠀⣀⡀⠀⠀⠀⠉⠀⠘⠢⣀⠀⠀⠀⡠⠊⢀⠈⠀⠀⢸⡄⠈⠁⢸
For now, there's a doughnut in the fridge with their name on it.       ⠰⡌⠋⠀⠰⣂⠛⠃⠀⢰⣆⠀⠈⣯⡁⢀⡀⠈⠋⠀⣔⠆⠀⠸⢆⡎
They think they've earned it.                                          ⠀⠸⡐⠂⠤⢀⠀⢶⠀⠀⣈⡀⠀⢈⡅⠈⠘⡁⠀⠶⠅⡀⠠⠒⡙⠀
                                                                       ⠀⠀⠐⡄⠀⠀⠱⡀⠀⠀⠉⢁⡠⢏⠁⠀⠚⠁⠀⢠⠊⠀⢀⠜⠀⠀
                                                                       ⠀⠀⠀⠈⠢⠀⠀⠈⠒⠀⠂⠁⠀⠀⠉⠂⠤⠤⠐⠁⢀⠴⠋⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠈⠑⠠⢄⡀⠀⠀⠀⠀⠀⠀⣀⡠⠄⠂⠁⠀⠀⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠉`,
    100,
    (state) => {
        state.commit('Revert \'Fix spelling of Charcuterie\'', 'peraltaj@example.co');
    },
    []
);

/* No tests, only pushes */
const transition_100350 = new Transition(
    100350,
    'Push the revert',
    `"All justice is best served swiftly".                                  ⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠄⠀⠒⠂⢀⡤⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀
The Sheriff wastes no time.                                            ⠀⠀⠀⠀⡀⠔⢈⠀⠀⡿⠀⢀⣤⡄⠈⠋⢁⣀⠀⢈⡒⢄⠀⠀⠀⠀
They push the revert, making sure to run the pre-commit checks first.  ⠀⠀⣠⠊⣁⡀⠉⠋⠀⣦⠀⠀⠁⢀⠀⠀⠀⠛⠀⠘⠃⣄⠑⢄⠀⠀
                                                                       ⠀⡔⡁⠀⠉⢁⣄⠄⠀⠈⠀⣶⠀⠈⠛⠀⣠⠄⠶⠦⠀⠑⠀⢬⣧⠀
The Sheriff sits back in their chair.                                  ⡐⠀⠿⢠⢄⠀⣀⠀⠀⡠⠄⠠⠔⠉⠢⡀⠉⠀⠀⢀⣴⠆⠀⠈⠁⢣
It'll be a while until the change makes it through the various jobs.   ⠃⣤⠄⠀⢁⣄⠙⠀⠘⠀⡠⠒⠉⠉⠒⢄⠉⢢⠀⠀⢀⡀⠟⠃⢴⡤
They'll check on it later.                                             ⡀⠀⢔⡀⠈⠋⠠⢄⠰⡜⠀⠀⠀⠀⠀⠀⠱⡜⢠⡤⠈⠛⠁⢀⣄⢀
                                                                       ⡇⠀⣀⡀⠀⠀⠀⠉⠀⠘⠢⣀⠀⠀⠀⡠⠊⢀⠈⠀⠀⢸⡄⠈⠁⢸
For now, there's a doughnut in the fridge with their name on it.       ⠰⡌⠋⠀⠰⣂⠛⠃⠀⢰⣆⠀⠈⣯⡁⢀⡀⠈⠋⠀⣔⠆⠀⠸⢆⡎
They think they've earned it.                                          ⠀⠸⡐⠂⠤⢀⠀⢶⠀⠀⣈⡀⠀⢈⡅⠈⠘⡁⠀⠶⠅⡀⠠⠒⡙⠀
                                                                       ⠀⠀⠐⡄⠀⠀⠱⡀⠀⠀⠉⢁⡠⢏⠁⠀⠚⠁⠀⢠⠊⠀⢀⠜⠀⠀
                                                                       ⠀⠀⠀⠈⠢⠀⠀⠈⠒⠀⠂⠁⠀⠀⠉⠂⠤⠤⠐⠁⢀⠴⠋⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠈⠑⠠⢄⡀⠀⠀⠀⠀⠀⠀⣀⡠⠄⠂⠁⠀⠀⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠉`,
    100,
    (state) => {
        state.commit('Revert \'Fix spelling of Charcuterie\'', 'peraltaj@example.co');
    },
    []
);

/* We have the technology */
const transition_100346 = new Transition(
    100346,
    'Run the failing test',
    `The Sheriff's brow glistens with a thin layer of sweat.
They're entering unfamiliar territory here.
It's one thing to investigate failures, but fixing them?

But the Sheriff knows that they have a secret weapon.
Something that will give them confidence.
Something that will prove them right.

They have the tests.

It takes longer for the Sheriff to hit run than for the test to complete. 
And with that, it's over.
The test is green.

    
> What will the Sheriff do next?`,
    85,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100352]
);

/* We can fix him */
const transition_100345 = new Transition(
    100345,
    'Attempt to fix',
    ``,
    192,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100346, transition_100350]
);

/* Measure twice, cut once */
const transition_100343 = new Transition(
    100343,
    'Run the failing test',
    `The Sheriff remembers what their uncle once told them: "With great power comes great responsibility".
They are confident that their revert will help.
Confident, but not arrogant.

They decide to verify this.

Luckily, they can run the failing test locally.
One test.
No set up.
It takes longer for the Sheriff to hit run than for the test to complete. 

The Sheriff's smile grows a little wider.
Green, just like they expected.

    
> What will the Sheriff do next?`,
    85,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100350]
);

/* Revert first? */
const transition_100342 = new Transition(
    100342,
    'Revert',
    `The Sheriff eyes the screen in front of them.
It was almost too easy.
They had a crime scene, bathed in a blood red crimson.
They had a suspect, a singular change standing alone amid chaos and destruction.
An open and shut case.

The Sheriff opens a terminal and enters a command.
A few seconds late, the change has been reverted.


> How should the Sheriff proceed?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100343, transition_100350]
);

/* Error message in a bottle */
const transition_100341 = new Transition(
    100341,
    'Look at failures',
    `The Sheriff clicks the link to view the test failure details.

A new page loads.
It contains details on the failure.

The Sheriff scrutinises the failure message:

--------------------------------------------------------------
1) allFrontEndTextMustHaveGaelicTranslations() (co.example.tests.analysis.GaelicTranslationTest)
co.example.tests.analysis.MissingTranslationException: No translation found for:
  - "Order Charcuterie"
  - "Cancel Charcuterie order"
  - "Track Charcuterie order"
        at co.example.tests.integration.fridge.FridgeIntegrationTest.shouldBeAbleToWithdrawYoghurt(FridgeIntegrationTest.java:17)
...
--------------------------------------------------------------

The plot thickens, like milk turning into yoghurt.


> What should the Sheriff do now?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100342, transition_100345]
);

/* Out with the old... */
const transition_100340 = new Transition(
    100340,
    'Investigate previous build',
    `The Sheriff pulls up the build details for first failed run.

The build details show that there was one change in this run:

- "Fix spelling of Charcuterie" <charlesb@example.co>

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    75,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100342, transition_100341]
);

/* I've made a terrible mistake */
const transition_100335 = new Transition(
    100335,
    'Investigate previous build',
    `The Sheriff thinks about the scene in front of them.
A thought occurs to them.

They've been a fool.
They've been looking at this all wrong.
They've been focusing on the wrong run.

They had been blinded by the red of the current run.
Red, like a herring.
But no longer.

There was another run - an earlier run.

The Sheriff pulls up the build details for previous run.

The build details show that there was one change in this run:

- "Fix spelling of Charcuterie" <charlesb@example.co>

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    74,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100340]
);

/* Measure twice, cut once */
const transition_100333 = new Transition(
    100333,
    'Run the failing test',
    `The Sheriff remembers what their uncle once told them: "With great power comes great responsibility".
They are confident that their revert will help.
Confident, but not arrogant.

They decide to verify this.

Luckily, they can run the failing test locally.
One test.
No set up.
It takes longer for the Sheriff to hit run than for the test to complete. 

The Sheriff's smile fades.
They stare at the screen in disbelief.
Red.

    
> What will the Sheriff do next?`,
    85,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100351]
);

/* 'Till all are one */
const transition_100331 = new Transition(
    100331,
    'Revert one',
    `


> How should the Sheriff proceed?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100333, transition_100350]
);

/* Two's company */
const transition_100330 = new Transition(
    100330,
    'Revert both',
    `The Sheriff clenches their jaw.
There's only one thing for it.
Desperate times call for desperate measures.

The Sheriff opens a terminal and enters a command.
A few seconds late, the changes have been reverted.


> How should the Sheriff proceed?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100333, transition_100350]
);

/* No questions, only reverts? */
const transition_100312 = new Transition(
    100312,
    'Revert',
    `The Sheriff eyes the screen in front of them.
Something isn't right.
But what?

They shake off the feeling.
This is no time for doubts.

One failure.
Two suspects.
Three ways to revert.


> How should the Sheriff proceed?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100330, transition_100331, transition_100335]
);

/* Error message in a bottle */
const transition_100311 = new Transition(
    100311,
    'Look at failures',
    `The Sheriff clicks the link to view the test failure details.

A new page loads.
It contains details on the failure.

The Sheriff scrutinises the failure message:

--------------------------------------------------------------
1) allFrontEndTextMustHaveGaelicTranslations() (co.example.tests.analysis.GaelicTranslationTest)
co.example.tests.analysis.MissingTranslationException: No translation found for:
  - "Order Charcuterie"
  - "Cancel Charcuterie order"
  - "Track Charcuterie order"
        at co.example.tests.integration.fridge.FridgeIntegrationTest.shouldBeAbleToWithdrawYoghurt(FridgeIntegrationTest.java:17)
...
--------------------------------------------------------------

The plot thickens, like milk turning into yoghurt.


> What should the Sheriff do now?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100312, transition_100335]
);

/* I'm late, I'm late! */
const transition_100310 = new Transition(
    100310,
    'Investigate latest build',
    `The Sheriff pulls up the build details for the latest run.

The build details show that there was one change in this run.

- "Avoid unnecessary work" <norms@example.co>
- "Add extra verification step for withdrawing yoghurt" <terryj@example.co>

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    74,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100312, transition_100311]
);

/* Your mission, if you chose to accept it... */
const transition_100300 = new Transition(
    100300,
    'Analysis',
    `The Sheriff opens the details page for the "analysis" job.
The job failed and hasn't been re-run since.

The build history shows the following runs:

- #652 - 2 changes: FAILURE (1 tests failed)
- #651 - 1 changes: FAILURE (1 tests failed)
- #650 - 1 changes: SUCCESS
- #649 - 1 changes: SUCCESS


> What should the Sheriff do now?`,
    40,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100340, transition_100310]
);

// 1002xx: Integration

/* No tests, only pushes */
const transition_100226 = new Transition(
    100226,
    'Push the reverts',
    `"All justice is best served swiftly".                                  ⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠄⠀⠒⠂⢀⡤⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀
The Sheriff wastes no time.                                            ⠀⠀⠀⠀⡀⠔⢈⠀⠀⡿⠀⢀⣤⡄⠈⠋⢁⣀⠀⢈⡒⢄⠀⠀⠀⠀
They push the revert, making sure to run the pre-commit checks first.  ⠀⠀⣠⠊⣁⡀⠉⠋⠀⣦⠀⠀⠁⢀⠀⠀⠀⠛⠀⠘⠃⣄⠑⢄⠀⠀
                                                                       ⠀⡔⡁⠀⠉⢁⣄⠄⠀⠈⠀⣶⠀⠈⠛⠀⣠⠄⠶⠦⠀⠑⠀⢬⣧⠀
The Sheriff sits back in their chair.                                  ⡐⠀⠿⢠⢄⠀⣀⠀⠀⡠⠄⠠⠔⠉⠢⡀⠉⠀⠀⢀⣴⠆⠀⠈⠁⢣
It'll be a while until the change makes it through the various jobs.   ⠃⣤⠄⠀⢁⣄⠙⠀⠘⠀⡠⠒⠉⠉⠒⢄⠉⢢⠀⠀⢀⡀⠟⠃⢴⡤
They'll check on it later.                                             ⡀⠀⢔⡀⠈⠋⠠⢄⠰⡜⠀⠀⠀⠀⠀⠀⠱⡜⢠⡤⠈⠛⠁⢀⣄⢀
                                                                       ⡇⠀⣀⡀⠀⠀⠀⠉⠀⠘⠢⣀⠀⠀⠀⡠⠊⢀⠈⠀⠀⢸⡄⠈⠁⢸
For now, there's a doughnut in the fridge with their name on it.       ⠰⡌⠋⠀⠰⣂⠛⠃⠀⢰⣆⠀⠈⣯⡁⢀⡀⠈⠋⠀⣔⠆⠀⠸⢆⡎
They think they've earned it.                                          ⠀⠸⡐⠂⠤⢀⠀⢶⠀⠀⣈⡀⠀⢈⡅⠈⠘⡁⠀⠶⠅⡀⠠⠒⡙⠀
                                                                       ⠀⠀⠐⡄⠀⠀⠱⡀⠀⠀⠉⢁⡠⢏⠁⠀⠚⠁⠀⢠⠊⠀⢀⠜⠀⠀
                                                                       ⠀⠀⠀⠈⠢⠀⠀⠈⠒⠀⠂⠁⠀⠀⠉⠂⠤⠤⠐⠁⢀⠴⠋⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠈⠑⠠⢄⡀⠀⠀⠀⠀⠀⠀⣀⡠⠄⠂⠁⠀⠀⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠉`,
    100,
    (state) => {
        state.commit('Revert \'Add extra verification step for withdrawing yoghurt\'', 'peraltaj@example.co');
        state.commit('Revert \'Fix spelling of Charcuterie\'', 'peraltaj@example.co');
    },
    []
);

/* Measure twice, cut once */
const transition_100225 = new Transition(
    100225,
    'Run the failing tests',
    `The Sheriff remembers what their uncle once told them: "With great power comes great responsibility".
They are confident that their revert will help.
Confident, but not arrogant.

They decide to verify this.

Luckily, they can run the failing tests locally.
There's only 4 tests so it only takes a couple of seconds to run them. 

The Sheriff's smile grows a little wider.
All 4 tests passed, just like they expected.

    
> What will the Sheriff do next?`,
    85,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100226]
);

/* No tests, only pushes */
const transition_100224 = new Transition(
    100224,
    'Push the revert',
    `"All justice is best served swiftly".                                  ⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠄⠀⠒⠂⢀⡤⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀
The Sheriff wastes no time.                                            ⠀⠀⠀⠀⡀⠔⢈⠀⠀⡿⠀⢀⣤⡄⠈⠋⢁⣀⠀⢈⡒⢄⠀⠀⠀⠀
They push the revert, making sure to run the pre-commit checks first.  ⠀⠀⣠⠊⣁⡀⠉⠋⠀⣦⠀⠀⠁⢀⠀⠀⠀⠛⠀⠘⠃⣄⠑⢄⠀⠀
                                                                       ⠀⡔⡁⠀⠉⢁⣄⠄⠀⠈⠀⣶⠀⠈⠛⠀⣠⠄⠶⠦⠀⠑⠀⢬⣧⠀
The Sheriff sits back in their chair.                                  ⡐⠀⠿⢠⢄⠀⣀⠀⠀⡠⠄⠠⠔⠉⠢⡀⠉⠀⠀⢀⣴⠆⠀⠈⠁⢣
It'll be a while until the change makes it through the various jobs.   ⠃⣤⠄⠀⢁⣄⠙⠀⠘⠀⡠⠒⠉⠉⠒⢄⠉⢢⠀⠀⢀⡀⠟⠃⢴⡤
They'll check on it later.                                             ⡀⠀⢔⡀⠈⠋⠠⢄⠰⡜⠀⠀⠀⠀⠀⠀⠱⡜⢠⡤⠈⠛⠁⢀⣄⢀
                                                                       ⡇⠀⣀⡀⠀⠀⠀⠉⠀⠘⠢⣀⠀⠀⠀⡠⠊⢀⠈⠀⠀⢸⡄⠈⠁⢸
For now, there's a doughnut in the fridge with their name on it.       ⠰⡌⠋⠀⠰⣂⠛⠃⠀⢰⣆⠀⠈⣯⡁⢀⡀⠈⠋⠀⣔⠆⠀⠸⢆⡎
They think they've earned it.                                          ⠀⠸⡐⠂⠤⢀⠀⢶⠀⠀⣈⡀⠀⢈⡅⠈⠘⡁⠀⠶⠅⡀⠠⠒⡙⠀
                                                                       ⠀⠀⠐⡄⠀⠀⠱⡀⠀⠀⠉⢁⡠⢏⠁⠀⠚⠁⠀⢠⠊⠀⢀⠜⠀⠀
                                                                       ⠀⠀⠀⠈⠢⠀⠀⠈⠒⠀⠂⠁⠀⠀⠉⠂⠤⠤⠐⠁⢀⠴⠋⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠈⠑⠠⢄⡀⠀⠀⠀⠀⠀⠀⣀⡠⠄⠂⠁⠀⠀⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠉`,
    100,
    (state) => {
        state.commit('Revert \'Add extra verification step for withdrawing yoghurt\'', 'peraltaj@example.co');
    },
    []
);

/* Measure twice, cut once */
const transition_100223 = new Transition(
    100223,
    'Run the failing tests',
    `The Sheriff remembers what their uncle once told them: "With great power comes great responsibility".
They are confident that their revert will help.
Confident, but not arrogant.

They decide to verify this.

Luckily, they can run the failing tests locally.
There's only 4 tests so it only takes a couple of seconds to run them. 

The Sheriff's smile grows a little wider.
All 4 tests passed, just like they expected.

    
> What will the Sheriff do next?`,
    85,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100224]
);

/* No tests, only pushes */
const transition_100222 = new Transition(
    100222,
    'Edit the commit message',
    `The Sheriff is proud of their investigation.
They have a strong case; a compelling case.
Not only did they identify a suspect, they collected evidence to back up their suspicions.

They decide that they should include their findings in the revert commit message.
They tap in a new command to the terminal, and begin editing.
The change doesn't take long, they already had all the information they needed to hand.

They review the change once again:

    "Revert 'Add extra verification step for withdrawing yoghurt'"
    
    Breaks "integration", e.g.
    
    FridgeIntegrationTest ->
    
    org.opentest4j.AssertionFailedError: "Permission denied"
        at co.example.tests.integration.fridge.FridgeIntegrationTest.shouldBeAbleToWithdrawYoghurt(FridgeIntegrationTest.java:17)

The Sheriff thinks this is a good commit message.
Not only will it tell others why the change was reverted, it will also help track down the failure. 


> What will the Sheriff do next?`,
    111,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100224, transition_100223]
);

/* Revert, for the sake of yoghurt lovers everywhere... */
const transition_100221 = new Transition(
    100221,
    'Revert one',
    `The investigation identified two possible suspects - but one more likely than the other.

The Sheriff opens a terminal and enters a command.
A few seconds late, the change has been reverted.

They review their work:

- "Revert 'Add extra verification step for withdrawing yoghurt'"

    
> What will the Sheriff do next?`,
    79,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100222, transition_100224, transition_100223]
);

/* Say "Hello" to my BOOMSTICK */
const transition_100220 = new Transition(
    100220,
    'Revert both',
    `The investigation identified two possible suspects.
Without looking at the changes themselves, it's 50/50 as to which one is the true cause of the failures.
The Sheriff could narrow it down further, but do they need to?

After all, why not?
Why shouldn't they revert both of them?

The Sheriff opens a terminal and types the words they know by heart.
A few seconds late, it's done.
The changes have been reverted.

They review their work:

- "Revert 'Add extra verification step for withdrawing yoghurt'"
- "Revert 'Fix spelling of Charcuterie'"

    
> What will the Sheriff do next?`,
    74,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100226, transition_100225]
);

/* Error message in a bottle */
const transition_100206 = new Transition(
    100206,
    'Look at failures',
    `The Sheriff clicks the link to view the test failure details.

A new page loads.
It contains details on the 4 failures.

The Sheriff scans the list.
All the tests appear to fail for the same reason:

--------------------------------------------------------------
1) shouldBeAbleToWithdrawYoghurt() (co.example.tests.integration.fridge.FridgeIntegrationTest)
org.opentest4j.AssertionFailedError: "Permission denied"
        at co.example.tests.integration.fridge.FridgeIntegrationTest.shouldBeAbleToWithdrawYoghurt(FridgeIntegrationTest.java:17)
...
--------------------------------------------------------------

The plot thickens, like milk turning into yoghurt.


> What should the Sheriff do now?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100221, transition_100220]
);

/* Revert first? */
const transition_100205 = new Transition(
    100205,
    'Revert',
    `


> How should the Sheriff proceed?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100206, transition_100220]
);

/* Sometimes it helps to take a step back */
const transition_100204 = new Transition(
    100204,
    'Investigate previous build',
    `The Sheriff pulls up the build details for the previous run.

The build details show that there were three changes in this run:

- "Fix spelling of Charcuterie" <charlesb@example.co>
- "Add extra verification step for withdrawing yoghurt" <terryj@example.co>

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    80,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100205, transition_100206]
);

/* I'm late, I'm late! */
const transition_100203 = new Transition(
    100203,
    'Investigate latest build',
    `The Sheriff pulls up the build details for the latest run.

The build details show that there was one change in this run.

- "Avoid unnecessary work" <norms@example.co>

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100204, transition_100206]
);

/* Out with the old... */
const transition_100202 = new Transition(
    100202,
    'Investigate previous build',
    `The Sheriff pulls up the build details for latest completed run.

The build details show that there were three changes in this run:

- "Fix spelling of Charcuterie" <charlesb@example.co>
- "Add extra verification step for withdrawing yoghurt" <terryj@example.co>

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    97,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100205, transition_100206]
);

/* ... in with the new */
const transition_100201 = new Transition(
    100201,
    'Wait',
    `It doesn't take long for the "integration" job to complete.

The build history shows the following runs:

- #2111 - 1 changes: FAILURE (4 tests failed)
- #2110 - 2 changes: FAILURE (4 tests failed)
- #2109 - 1 changes: SUCCESS
- #2108 - 1 changes: FAILURE (2 tests failed)
- #2107 - 0 changes: FAILURE (2 tests failed)
- #2106 - 2 changes: SUCCESS


> What should the Sheriff do now?`,
    52,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100203, transition_100204]
);

/* Your mission, if you chose to accept it... */
const transition_100200 = new Transition(
    100200,
    'Integration',
    `The Sheriff opens the details page for the "integration" job.
It seems a new run is in progress, but it seems like it will complete very soon.

The build history shows the following runs:

- #2111 - 1 changes: IN PROGRESS
- #2110 - 2 changes: FAILURE (4 tests failed)
- #2109 - 1 changes: SUCCESS
- #2108 - 1 changes: FAILURE (2 tests failed)
- #2107 - 0 changes: FAILURE (2 tests failed)
- #2106 - 2 changes: SUCCESS


> What should the Sheriff do now?`,
    40,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100201, transition_100202]
);

// 1001xx: Acceptance

/* No tests, only pushes */
const transition_100126 = new Transition(
    100125,
    'Push the reverts',
    `"All justice is best served swiftly".                                  ⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠄⠀⠒⠂⢀⡤⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀
The Sheriff wastes no more time.                                       ⠀⠀⠀⠀⡀⠔⢈⠀⠀⡿⠀⢀⣤⡄⠈⠋⢁⣀⠀⢈⡒⢄⠀⠀⠀⠀
They push the revert, making sure to run the pre-commit checks first.  ⠀⠀⣠⠊⣁⡀⠉⠋⠀⣦⠀⠀⠁⢀⠀⠀⠀⠛⠀⠘⠃⣄⠑⢄⠀⠀
                                                                       ⠀⡔⡁⠀⠉⢁⣄⠄⠀⠈⠀⣶⠀⠈⠛⠀⣠⠄⠶⠦⠀⠑⠀⢬⣧⠀
The Sheriff sits back in their chair.                                  ⡐⠀⠿⢠⢄⠀⣀⠀⠀⡠⠄⠠⠔⠉⠢⡀⠉⠀⠀⢀⣴⠆⠀⠈⠁⢣
It'll be a while until the change makes it through the various jobs.   ⠃⣤⠄⠀⢁⣄⠙⠀⠘⠀⡠⠒⠉⠉⠒⢄⠉⢢⠀⠀⢀⡀⠟⠃⢴⡤
They'll check on it later.                                             ⡀⠀⢔⡀⠈⠋⠠⢄⠰⡜⠀⠀⠀⠀⠀⠀⠱⡜⢠⡤⠈⠛⠁⢀⣄⢀
                                                                       ⡇⠀⣀⡀⠀⠀⠀⠉⠀⠘⠢⣀⠀⠀⠀⡠⠊⢀⠈⠀⠀⢸⡄⠈⠁⢸
For now, there's a doughnut in the fridge with their name on it.       ⠰⡌⠋⠀⠰⣂⠛⠃⠀⢰⣆⠀⠈⣯⡁⢀⡀⠈⠋⠀⣔⠆⠀⠸⢆⡎
They think they've earned it.                                          ⠀⠸⡐⠂⠤⢀⠀⢶⠀⠀⣈⡀⠀⢈⡅⠈⠘⡁⠀⠶⠅⡀⠠⠒⡙⠀
                                                                       ⠀⠀⠐⡄⠀⠀⠱⡀⠀⠀⠉⢁⡠⢏⠁⠀⠚⠁⠀⢠⠊⠀⢀⠜⠀⠀
                                                                       ⠀⠀⠀⠈⠢⠀⠀⠈⠒⠀⠂⠁⠀⠀⠉⠂⠤⠤⠐⠁⢀⠴⠋⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠈⠑⠠⢄⡀⠀⠀⠀⠀⠀⠀⣀⡠⠄⠂⠁⠀⠀⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠉`,
    100,
    (state) => {
        state.commit('Revert \'Avoid unnecessary work\'', 'peraltaj@example.co');
        state.commit('Revert \'Add extra verification step for withdrawing yoghurt\'', 'peraltaj@example.co');
        state.commit('Revert \'Fix spelling of Charcuterie\'', 'peraltaj@example.co');
    },
    []
);

/* Measure twice, cut once */
const transition_100125 = new Transition(
    100123,
    'Run the failing tests',
    `The Sheriff remembers what their uncle once told them: "With great power comes great responsibility".
They are confident that their revert will help.
Confident, but not arrogant.

They decide to verify this.

Luckily, they can run the failing tests locally.
Even though it's only 26 tests the process still takes a few minutes, but eventually the test run completes.

The Sheriff's smile grows a little wider.
All the tests passed, just like they expected.

    
> What will the Sheriff do next?`,
    250,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100126]
);

/* No tests, only pushes */
const transition_100124 = new Transition(
    100124,
    'Push the revert',
    `"All justice is best served swiftly".                                  ⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠄⠀⠒⠂⢀⡤⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀
The Sheriff wastes no time.                                            ⠀⠀⠀⠀⡀⠔⢈⠀⠀⡿⠀⢀⣤⡄⠈⠋⢁⣀⠀⢈⡒⢄⠀⠀⠀⠀
They push the revert, making sure to run the pre-commit checks first.  ⠀⠀⣠⠊⣁⡀⠉⠋⠀⣦⠀⠀⠁⢀⠀⠀⠀⠛⠀⠘⠃⣄⠑⢄⠀⠀
                                                                       ⠀⡔⡁⠀⠉⢁⣄⠄⠀⠈⠀⣶⠀⠈⠛⠀⣠⠄⠶⠦⠀⠑⠀⢬⣧⠀
The Sheriff sits back in their chair.                                  ⡐⠀⠿⢠⢄⠀⣀⠀⠀⡠⠄⠠⠔⠉⠢⡀⠉⠀⠀⢀⣴⠆⠀⠈⠁⢣
It'll be a while until the change makes it through the various jobs.   ⠃⣤⠄⠀⢁⣄⠙⠀⠘⠀⡠⠒⠉⠉⠒⢄⠉⢢⠀⠀⢀⡀⠟⠃⢴⡤
They'll check on it later.                                             ⡀⠀⢔⡀⠈⠋⠠⢄⠰⡜⠀⠀⠀⠀⠀⠀⠱⡜⢠⡤⠈⠛⠁⢀⣄⢀
                                                                       ⡇⠀⣀⡀⠀⠀⠀⠉⠀⠘⠢⣀⠀⠀⠀⡠⠊⢀⠈⠀⠀⢸⡄⠈⠁⢸
For now, there's a doughnut in the fridge with their name on it.       ⠰⡌⠋⠀⠰⣂⠛⠃⠀⢰⣆⠀⠈⣯⡁⢀⡀⠈⠋⠀⣔⠆⠀⠸⢆⡎
They think they've earned it.                                          ⠀⠸⡐⠂⠤⢀⠀⢶⠀⠀⣈⡀⠀⢈⡅⠈⠘⡁⠀⠶⠅⡀⠠⠒⡙⠀
                                                                       ⠀⠀⠐⡄⠀⠀⠱⡀⠀⠀⠉⢁⡠⢏⠁⠀⠚⠁⠀⢠⠊⠀⢀⠜⠀⠀
                                                                       ⠀⠀⠀⠈⠢⠀⠀⠈⠒⠀⠂⠁⠀⠀⠉⠂⠤⠤⠐⠁⢀⠴⠋⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠈⠑⠠⢄⡀⠀⠀⠀⠀⠀⠀⣀⡠⠄⠂⠁⠀⠀⠀⠀⠀
                                                                       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠉`,
    100,
    (state) => {
        state.commit('Revert \'Add extra verification step for withdrawing yoghurt\'', 'peraltaj@example.co');
    },
    []
);

/* Measure twice, cut once */
const transition_100123 = new Transition(
    100123,
    'Run the failing tests',
    `The Sheriff remembers what their uncle once told them: "With great power comes great responsibility".
They are confident that their revert will help.
Confident, but not arrogant.

They decide to verify this.

Luckily, they can run the failing tests locally.
Even though it's only 26 tests the process still takes a few minutes, but eventually the test run completes.

The Sheriff's smile grows a little wider.
All the tests passed, just like they expected.

    
> What will the Sheriff do next?`,
    250,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100125]
);

/* No tests, only pushes */
const transition_100122 = new Transition(
    100122,
    'Edit the commit message',
    `The Sheriff is proud of their investigation.
They have a strong case; a compelling case.
Not only did they identify a suspect, they collected evidence to back up their suspicions.

They decide that they should include their findings in the revert commit message.
They tap in a new command to the terminal, and begin editing.
The change doesn't take long, they already had all the information they needed to hand.

They review the change once again:

    "Revert 'Add extra verification step for withdrawing yoghurt'"
    
    Breaks "acceptance", e.g.
    
    FridgeAcceptanceTest ->
      expected: 
          A success message matching /.*yoghurt.*widthdraw.*/
         but was: 
          A failure message of "Withdrawal failed: unauthorised yoghurt withdrawal"
                at co.example.tests.acceptance.fridge.FridgeAcceptanceTest.shouldBeAbleToWithdrawYoghurt(FridgeAcceptanceTest.java:81)
    
    RecipeAcceptanceTest ->
        expected: 
          Success
         but was: 
          Internal Server Error
                at co.example.tests.acceptance.recipe.RecipeAcceptanceTest.shouldCreateComplex(RecipeAcceptanceTest.java:16)

The Sheriff thinks this is a good commit message.
Not only will it tell others why the change was reverted, it will also help track down the failure. 


> What will the Sheriff do next?`,
    111,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100125, transition_100123]
);

/* Revert, for the sake of yoghurt lovers everywhere... */
const transition_100121 = new Transition(
    100121,
    'Revert',
    `The Sheriff smiles.
They can see a case coming together.
What is needed now is action.

Three jobs.
Three changes.
Only one clear suspect.

The Sheriff opens up a terminal and starts typing.
Others might have used a GUI or had to look up the command, but not this Sheriff.
This is a command the Sheriff has typed many times.
It is a command etched upon their soul.

It takes less than 10 seconds.
The Sheriff does not know how long it took to prepare that change originally.
Nor do they care.
However long it took was not long enough.

They review the change:

    "Revert 'Add extra verification step for withdrawing yoghurt'"

But they wonder: is this enough?
Is there more they can - more they should - do?


> What will the Sheriff do next?`,
    79,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100122, transition_100124, transition_100123]
);

/* Say "Hello" to my BOOMSTICK */
const transition_100120 = new Transition(
    100120,
    'Revert all',
    `Maths was not the Sheriff's best subject, but it was also not their worst. 
At least they paid enough attention to understand basic probabilities.
All things being equal, to revert just one commit would give a 33% chance of picking the right one.
Picking two would improve the odds to 66% - but why stop there?
The only way to be sure they got the right one would be to revert all three.
Three from three - 100% chance of picking the correct one.

The Sheriff opens up a terminal and starts typing.
Others might have used a GUI or had to look up the command, but not this Sheriff.
This is a command the Sheriff has typed many times.
It is a command etched upon their soul.

It takes less than 10 seconds.
The Sheriff does not know how long it took to prepare these changes originally.
Nor do they care.
For at least one of these commits, it  was not long enough.

They review the changes:

- "Revert 'Avoid unnecessary work'"
- "Revert 'Add extra verification step for withdrawing yoghurt'"
- "Revert 'Fix spelling of Charcuterie'"

    
> What will the Sheriff do next?`,
    74,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100126, transition_100125]
);

/* Error message in a bottle */
const transition_100106 = new Transition(
    100106,
    'Look at failures',
    `The Sheriff clicks the link to view the test failure details.

A new page loads.
It contains details on all 26 failures.

The Sheriff scans the list.
The tests appear to fail for one of two reasons:

--------------------------------------------------------------
1) shouldBeAbleToWithdrawYoghurt() (co.example.tests.acceptance.fridge.FridgeAcceptanceTest)
org.opentest4j.AssertionFailedError: 
expected: 
  A success message matching /.*yoghurt.*widthdraw.*/
 but was: 
  A failure message of "Withdrawal failed: unauthorised yoghurt withdrawal"
        at co.example.tests.acceptance.fridge.FridgeAcceptanceTest.shouldBeAbleToWithdrawYoghurt(FridgeAcceptanceTest.java:81)
...
5) shouldCreateComplex[Tzatziki]() (co.example.tests.acceptance.recipe.RecipeAcceptanceTest)
org.opentest4j.AssertionFailedError: 
expected: 
  Success
 but was: 
  Internal Server Error
        at co.example.tests.acceptance.recipe.RecipeAcceptanceTest.shouldCreateComplex(RecipeAcceptanceTest.java:16)
...
--------------------------------------------------------------

The plot thickens, like milk turning into yoghurt.


> What should the Sheriff do now?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100121, transition_100120]
);

/* Danger, Will Robinson. Danger! */
const transition_100107 = new Transition(
    100107,
    'Look at failures',
    `The Sheriff clicks the link to view the test failure details.

A new page loads.
It contains details on all 26 failures.

The Sheriff scans the list.
The tests appear to fail for one of two reasons:

--------------------------------------------------------------
1) shouldBeAbleToWithdrawYoghurt() (co.example.tests.acceptance.fridge.FridgeAcceptanceTest)
org.opentest4j.AssertionFailedError: 
expected: 
  A success message matching /.*yoghurt.*widthdraw.*/
 but was: 
  A failure message of "Withdrawal failed: unauthorised yoghurt withdrawal"
        at co.example.tests.acceptance.fridge.FridgeAcceptanceTest.shouldBeAbleToWithdrawYoghurt(FridgeAcceptanceTest.java:81)
...
5) shouldCreateComplex[Tzatziki]() (co.example.tests.acceptance.recipe.RecipeAcceptanceTest)
org.opentest4j.AssertionFailedError: 
expected: 
  Success
 but was: 
  Internal Server Error
        at co.example.tests.acceptance.recipe.RecipeAcceptanceTest.shouldCreateComplex(RecipeAcceptanceTest.java:16)
...
--------------------------------------------------------------

The plot thickens, like milk turning into yoghurt.


> What should the Sheriff do now?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [] // TODO -> transition to "Revert", but will need to work out what?
);

/* Revert first? */
const transition_100105 = new Transition(
    100105,
    'Revert',
    `The Sheriff smiles.
They can see a case coming together.
There are still many questions to answer, but those can wait.
What is needed now is action.

The Sheriff's smile turns to a frown.
A new thought has occurred to them.
Up until now they had thought this the work of a solo operator.
A one-man job.
But what if...

Three jobs.
Three changes.
Three suspects.

What if they were all in on it together?

The Sheriff ponders this.
It occurs to them that they're still not sure what is actually broken.
Without that information there would be no way to rule out any of the suspects.


> How should the Sheriff proceed?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100106, transition_100120]
);

/* Sometimes it helps to take a step back */
const transition_100104 = new Transition(
    100104,
    'Investigate previous build',
    `The Sheriff pulls up the build details for the previous run.

The build details show that there were three changes in this run:

- "Fix spelling of Charcuterie" <charlesb@example.co>
- "Add extra verification step for withdrawing yoghurt" <terryj@example.co>
- "Avoid unnecessary work" <norms@example.co>

Underneath, there is a link to the details of the test failures.

The Sheriff furrows their brow.
Three jobs.
Three changes.
Three suspects.

Was this a coincidence?
Almost certainly.


> What should the Sheriff do now?`,
    80,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100105, transition_100106]
);

/* I'm late, I'm late! */
const transition_100103 = new Transition(
    100103,
    'Investigate latest build',
    `The Sheriff pulls up the build details for the latest run.

The build details show that there were no changes in this run.

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100104, transition_100107]
);

/* Out with the old... */
const transition_100102 = new Transition(
    100102,
    'Investigate previous build',
    `The Sheriff pulls up the build details for the latest completed run.

The build details show that there were three changes in this run:

- "Fix spelling of Charcuterie" <charlesb@example.co>
- "Add extra verification step for withdrawing yoghurt" <terryj@example.co>
- "Avoid unnecessary work" <norms@example.co>

Underneath, there is a link to the details of the test failures.

The Sheriff furrows their brow.
Three jobs.
Three changes.
Three suspects.

Was this a coincidence?
Almost certainly.


> What should the Sheriff do now?`,
    97,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100105, transition_100106]
);

/* ... in with the new */
const transition_100101 = new Transition(
    100101,
    'Wait',
    `The Sheriff is a patient creature.
They wait for the "acceptance" job to complete.

The build history shows the following runs:

- #1678 - 0 changes: FAILURE (26 tests failed)
- #1677 - 3 changes: FAILURE (26 tests failed)
- #1676 - 2 changes: SUCCESS
- #1675 - 2 changes: SUCCESS


> What should the Sheriff do now?`,
    615,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100103, transition_100104]
);

/* Your mission, if you chose to accept it... */
const transition_100100 = new Transition(
    100100,
    'Acceptance',
    `The Sheriff opens the details page for the "acceptance" job.
It seems a new run is in progress.
The Sheriff reasons that there's about 10 minutes left before it completes.

The build history shows the following runs:

- #1678 - 0 changes: IN PROGRESS
- #1677 - 3 changes: FAILURE (26 tests failed)
- #1676 - 2 changes: SUCCESS
- #1675 - 2 changes: SUCCESS


> What should the Sheriff do now?`,
    40,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100101, transition_100102]
);

// 1000xx: Start...

/* Elementary, my dear Watson! */
const transition_100002 = new Transition(
    100002,
    'Investigate',
    `Three jobs in particular catch the Sheriff's eye.

First, there is the "acceptance" job.
Out of the three, the Sheriff considers this to be the most important.
The job itself tests the end-to-end flow of the system.
If it's green, the Sheriff can have confidence that everything is working as expected.
Well, maybe not everything... but still, nothing is perfect.
Unfortunately, the Sheriff knows that this job is also the most unstable, unpredictable.

Then there is the "integration" job.
The tests here are at a much finer grain.
They're fast, and specific; but they don't give the "bigger picture".
This job also has a reputation of being unstable, but not to the same degree as "acceptance".

Finally, there's the "analysis" job.
The tests here are not checking the behaviour of the system.
Instead, they try to detect problems based on, well, an analysis.
Given the nature of these tests, they're almost never unstable.
Any failures here are likely to be genuine.


> Where should the Sheriff focus their attention?`,
    72,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100100, transition_100200, transition_100300]
);

/* I AM THE LAW */
const transition_100001 = new Transition(
    100001,
    'Revert',
    `This isn't the Sheriff's first rodeo.
They've seen this countless times before.
Others might try and write it off as just another mystery of the universe; unknowable, unexplainable.
But not this Sheriff.

They know that this isn't an act of God.
This isn't a coincidence, a fluke.

Being a Sheriff means making decisions.
Tough decisions.
Decisions that not everyone might agree with. 
But a Sheriff must be unwavering in their pursuit of order.

Someone caused this.

But who?

The Sheriff pauses.
In their haste to dispense justice, they have overlooked something crucial.
They have no suspects.
They have no evidence.

And with no suspects and no evidence, they have no case.


> What should the Sheriff do?`,
    67,
    NOTHING_SPECIAL_HAPPENS,
    [transition_100002]
);

/* Start */
const transition_100000 = new Transition(
    100000,
    'Start',
    `The page finally loads; on it, a collection of boxes.
Some are green, some are red.

Tsk.


> What should the Sheriff do?`,
    0,
    (state) => {
        // Commit state
        state.add_build('commit', [commit1], JobStatus.PASS, MUCH_MUCH_EARLIER);
        state.add_build('commit', [commit2], JobStatus.PASS, MUCH_MUCH_EARLIER);
        state.add_build('commit', [commit3], JobStatus.PASS, MUCH_MUCH_EARLIER);

        // Previous failures
        state.add_build('acceptance', [commit1, commit2, commit3], JobStatus.FAIL, MUCH_EARLIER, 100, 26);
        state.add_build('integration', [commit1, commit2], JobStatus.FAIL, MUCH_EARLIER, 100, 4);
        state.add_build('analysis', [commit1, commit2], JobStatus.FAIL, MUCH_EARLIER, 100, 1);

        // Current runs
        state.add_build('acceptance', [commit1, commit2, commit3], null, EARLIER, 51);
        state.add_build('integration', [commit1, commit2, commit3], null, EARLIER, 60);
        state.add_build('analysis', [commit1, commit2, commit3], null, EARLIER, 99);
    },
    [transition_100001, transition_100002]
);

// Scenario

const scenario = new Scenario(
    'on-the-beat',
    'On the beat',
    Scenario2,
    state,
    `Rain, cold and relentless, pounded on the window of the small home-office.
The inside was dark; natural light was scarce at the best of times and the inclement weather just made it worse.

The door to the office opens and the room is lit up by light from the hallway.
A figure enters, and closes the door behind them.
Darkness once again embraces the room.

The figure crosses the room and settles into the chair behind the desk.
They wiggle the mouse and the monitor lights up.
A password prompt, and then a second.
They're logged back in.

The figure double-clicks an icon on the desktop.
A browser opens, their tabs restored from the previous session.
One day, they think, they will close some of those tabs.
But not today.
Today they have a different task.

The figure flicks through the various tabs until they find the one they're looking for.
The page renders slowly; it's been slow all day.
Maybe it's the storm, maybe it's the VPN - more likely it's a combination of the two.
                                                                             ,
The figure takes a deep breath, preparing themselves for the worst.     ,   / \\   ,
Things had been quiet, but that was no reason to get complacent.       / '-'   '-' \\
"The calm before the storm."                                           |  SHERIFF  |
And that's why they are here.                                          |   .---.   |
To watch. To protect. And, if necessary, to take action.               |  ( 109 )  |
                                                                       \\   '---'   /
Today, they are the Sheriff.                                            '--.   .--'
                                                                            \\ /  
                                                                             \`
> Press the start button to begin.`,
    [transition_100000]
);

export default scenario;