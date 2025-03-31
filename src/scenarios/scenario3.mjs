//
// Scenario 3: Commit broken, obvious cause.
//

import {Commit, Job, JobStatus, Scenario, Transition, WorldState} from '@/utils.mjs';
import Scenario3 from '@/pages/Scenario3.vue';

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

const commit1 = new Commit('A commit', 'someone@example.co');
const commits = [commit1];

// World State

const state = new WorldState(jobs, commits, BEGIN);

// Transitions

// 1001xx: ???

// Scenario

const scenario = new Scenario(
    'all-you-can-eat',
    'All You Can Eat',
    Scenario3,
    state,
    `Under construction ... come back later!`,
    []
);

export default scenario;