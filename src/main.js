import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import './css/app.css';

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: () => import('./pages/HomeApp.vue'),
    },
    { 
        path: '/users', 
        name: 'users', 
        component: () => import('./pages/UsersApp.vue') 
    },
    {
        path: '/companies',
        name: 'companies',
        component: () => import('./pages/CompaniesApp.vue') 
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes, 
    linkActiveClass: 'link-active',
})

createApp(App).use(createPinia()).use(router).mount('#app')
