//
// Scenario 3: Commit broken, obvious cause.
//

import {Scenario} from '@/utils.mjs';
import Scenario3 from '@/pages/Scenario3.vue';

// Jobs

// const job_commit = new Job('commit', JobStatus.PASS);
// const job_acceptance = new Job('acceptance', JobStatus.PASS);
// const job_integration = new Job('integration', JobStatus.PASS);
//
// const jobs = {
//     'commit': job_commit,
//     'acceptance': job_acceptance,
//     'integration': job_integration,
// }

// Transitions

// 11xx: Revert first, ask questions later...

const scenario = new Scenario(
    'all-you-can-eat',
    'All You Can Eat',
    Scenario3,
    {},
    `Under construction ... come back later!`,
    []
);

export default scenario;