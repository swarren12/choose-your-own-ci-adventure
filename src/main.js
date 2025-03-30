//
// main.js - Initialise the Vue application.
//

import 'bootstrap/dist/css/bootstrap.css';

import App from '@/App.vue';
import Start from '@/pages/Start.vue';
import scenarios from "@/scenarios/scenarios.mjs";

import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faExclamationTriangle, faMusic} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

const routes = [
    {path: '/', component: Start},
    ...scenarios.map(scenario => {
        return {'path': `/${scenario.id}`, 'component': scenario.page};
    })
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

library.add(faExclamationTriangle)
library.add(faMusic)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
