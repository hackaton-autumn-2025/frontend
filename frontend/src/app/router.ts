import {createRouter, createWebHistory} from "vue-router";
import AuthLayout from "@/pages/AuthLayout.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Profile from "@/pages/Profile.vue";
import MainLayout from "@/pages/MainLayout.vue";
import Analytics from "@/pages/Analytics.vue";
import DemoPage from "@/pages/DemoPage.vue";

const routes = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {path: 'login', component: Login},
            {path: 'register', component: Register},
        ],
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {path: 'dashboard', component: Dashboard},
            {path: 'profile', component: Profile},
            {path: 'analytics', component: Analytics},
            {path: 'demo', component: DemoPage},
        ],
    },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})