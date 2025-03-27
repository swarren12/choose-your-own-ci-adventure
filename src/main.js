//
// main.js - Initialise the Vue application.
//

import 'bootstrap/dist/css/bootstrap.css';

import App from '@/App.vue';
import Start from '@/pages/Start.vue';
import Scenario1 from '@/pages/Scenario1.vue';
import Scenario2 from '@/pages/Scenario2.vue';

import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faExclamationTriangle, faMusic} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

const routes = [
    {path: '/', component: Start},
    {path: '/accept-this', component: Scenario1},
    {path: '/commit-to-it', component: Scenario2},
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
