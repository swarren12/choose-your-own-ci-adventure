//
// Scenario 2: Multiple failures, relatively obvious cause.
//

import Scenario2 from '@/pages/Scenario2.vue';
import {Job, JobStatus, Scenario, Transition} from '@/utils.mjs';

// Jobs

const job_commit = new Job('commit', JobStatus.DISABLED);
const job_acceptance = new Job('acceptance', JobStatus.DISABLED);
const job_integration = new Job('integration', JobStatus.DISABLED);
const job_analysis = new Job('analysis', JobStatus.DISABLED);

const jobs = {
    'commit': job_commit,
    'acceptance': job_acceptance,
    'integration': job_integration,
    'analysis': job_analysis,
}

/* Template */
const transition_1xxxxx = new Transition(
    '',
    `
    
    
> ?`,
    0,
    {
        'commit': job_commit,
        'acceptance': job_acceptance,
        'integration': job_integration,
        'analysis': job_analysis,
    },
    []
);

// Transitions

// 1003xx: Analysis

// 1002xx: Integration

/* No tests, only pushes */
const transition_100225 = new Transition(
    100225,
    'Push the revert',
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
    38,
    {
        'commit': job_commit.pass().at(2),
        'acceptance': job_acceptance.fail(26).at(42),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    []
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
    38,
    {
        'commit': job_commit.pass().at(2),
        'acceptance': job_acceptance.fail(26).at(42),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
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
    23,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26).at(42),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100225]
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
    49,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26).at(41),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100225, transition_100223]
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
    17,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26).at(40),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    12,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26).at(40),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100224, transition_100223]
);

/* Error message in a bottle */
const transition_100207 = new Transition(
    100207,
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
    5,
    {
        'commit': job_commit.pass().at(90),
        'acceptance': job_acceptance.fail(26).at(39),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100221, transition_100220]
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
    5,
    {
        'commit': job_commit.pass().at(90),
        'acceptance': job_acceptance.fail(26).at(39),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100221, transition_100220]
);

/* Revert first? */
const transition_100205 = new Transition(
    100205,
    'Revert',
    `


> How should the Sheriff proceed?`,
    10,
    {
        'commit': job_commit.pass().at(17),
        'acceptance': job_acceptance.fail(26).at(39),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    18,
    {
        'commit': job_commit.pass().at(27),
        'acceptance': job_acceptance.fail(26).at(38),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    5,
    {
        'commit': job_commit.pass().at(22),
        'acceptance': job_acceptance.fail(26).at(37),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100204, transition_100207]
);

/* Out with the old... */
const transition_100202 = new Transition(
    100202,
    'Investigate previous build',
    `The Sheriff pulls up the build details for latest failed run.

The build details show that there were three changes in this run:

- "Fix spelling of Charcuterie" <charlesb@example.co>
- "Add extra verification step for withdrawing yoghurt" <terryj@example.co>

Underneath, there is a link to the details of the test failures.


> What should the Sheriff do now?`,
    35,
    {
        'commit': job_commit.pass().at(14),
        'acceptance': job_acceptance.fail(26).at(34),
        'integration': job_integration.fail(4).at(82),
        'analysis': job_analysis.fail(1),
    },
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
    {
        'commit': job_commit.pass().at(21),
        'acceptance': job_acceptance.fail(26).at(37),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    10,
    {
        'commit': job_commit.pass().at(14),
        'acceptance': job_acceptance.fail(26).at(34),
        'integration': job_integration.fail(4).at(82),
        'analysis': job_analysis.fail(1),
    },
    [transition_100201, transition_100202]
);

// 1001xx: Acceptance

/* No tests, only pushes */
const transition_100125 = new Transition(
    100125,
    'Push the revert',
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
    38,
    {
        'commit': job_commit.pass().at(2),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    []
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
    38,
    {
        'commit': job_commit.pass().at(2),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
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
    188,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    49,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    17,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    12,
    {
        'commit': job_commit.pass(),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100124, transition_100123]
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
    5,
    {
        'commit': job_commit.pass().at(90),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    5,
    {
        'commit': job_commit.pass().at(90),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    10,
    {
        'commit': job_commit.pass().at(17),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    18,
    {
        'commit': job_commit.pass().at(78),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    5,
    {
        'commit': job_commit.pass().at(77),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
    [transition_100104, transition_100107]
);

/* Out with the old... */
const transition_100102 = new Transition(
    100102,
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
    35,
    {
        'commit': job_commit.pass().at(14),
        'acceptance': job_acceptance.fail(26).at(34),
        'integration': job_integration.fail(4).at(82),
        'analysis': job_analysis.fail(1),
    },
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
    {
        'commit': job_commit.pass().at(76),
        'acceptance': job_acceptance.fail(26),
        'integration': job_integration.fail(4),
        'analysis': job_analysis.fail(1),
    },
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
    10,
    {
        'commit': job_commit.pass().at(14),
        'acceptance': job_acceptance.fail(26).at(34),
        'integration': job_integration.fail(4).at(82),
        'analysis': job_analysis.fail(1),
    },
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
    10,
    {
        'commit': job_commit.pass().at(13),
        'acceptance': job_acceptance.fail(26).at(34),
        'integration': job_integration.fail(4).at(81),
        'analysis': job_analysis.fail(1),
    },
    [transition_100100,transition_100200,]
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
    5,
    {
        'commit': job_commit.pass().at(14),
        'acceptance': job_acceptance.fail(26).at(35),
        'integration': job_integration.fail(4).at(82),
        'analysis': job_analysis.fail(1),
    },
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
    {
        'commit': job_commit.pass().at(13),
        'acceptance': job_acceptance.fail(26).at(34),
        'integration': job_integration.fail(4).at(81),
        'analysis': job_analysis.fail(1).at(99),
    },
    [transition_100001, transition_100002]
);

// Scenario

const scenario = new Scenario(
    'on-the-beat',
    'On the beat',
    Scenario2,
    jobs,
    `Rain, cold and relentless, pounded on the windows of the small home-office.
The inside was dark; natural light was scarce at the best of times and the inclement weather just made it worse.

The door to the office opens and the room is lit up by light from the hallway.
A figure enters, and closes the door behind them.
Darkness once again embraces the room.

The figure crosses the room and settles into the chair behind the desk.
They wiggle the mouse and monitor lights up.
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
                                                                         
The figure takes a deep breath, preparing themselves for the worst.     ,   /\\   ,                                                                        
Things had been quiet, but that was no reason to get complacent.       / '-'  '-' \\
"The calm before the storm."                                           |  SHERIFF |
And that's why they are here.                                          |   .--.   |
To watch. To protect. And, if necessary, to take action.               |  ( 19 )  |
                                                                       \\   '--'   /
Today, they are the sheriff.                                            '--.  .--'
                                                                            \\/  

> Press the start button to begin.`,
    [transition_100000]
);

export default scenario;