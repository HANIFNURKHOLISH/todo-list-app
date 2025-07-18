// src/plugins/router.js
import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '../stores/auth';

const routes = [
    {
        path: '/',
        component: () => import('../layouts/AppLayout.vue'),
        meta
:
{
    requiresAuth: true
},

children: [
    {
        path: '',
        name: 'Dashboard',
        component
:
() => import('../views/Dashboard.vue'),
},
{
    path: 'checklist/:id',
        name
:
    'ChecklistDetail',
        
    component: () => import('../views/ChecklistDetail.vue'),
        props
:
    true,
}
,
],
},
{
    path: '/auth',
        component
:
    () => import('../layouts/AuthLayout.vue'),
        children
:
    [
        {
            path: 'login',
            name: 'Login',
            component
:
    () => import('../views/Login.vue'),
},
    {
        path: 'register',
            name
    :
        'Register',
            
        component: () => import('../views/Register.vue'),
    }
,
],
}
,
{
    path: '/:pathMatch(.*)*',
        redirect
:
    '/',
}
]
;

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {

    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !authStore.isAuthenticated) {
        next({name: 'Login'});
    } else if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
        next({name: 'Dashboard'});
    } else {
        next();
    }
});

export default router;