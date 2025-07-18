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
}
, // Fitur-fitur ini hanya bisa diakses setelah login [cite: 111]
children: [
    {
        path: '',
        name: 'Dashboard',
        component
:
() => import('../views/Dashboard.vue'), // Halaman untuk menampilkan & membuat checklist [cite: 100, 102]
},
{
    path: 'checklist/:id',
        name
:
    'ChecklistDetail',
        
    component: () => import('../views/ChecklistDetail.vue'), // Halaman detail checklist [cite: 103]
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
    () => import('../views/Login.vue'), // Halaman login [cite: 98]
},
    {
        path: 'register',
            name
    :
        'Register',
            
        component: () => import('../views/Register.vue'), // Halaman daftar baru [cite: 99]
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
    // Cek pinia store setelah diinisialisasi
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