
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/auth/register',
    component: () => import('../views/Register.vue'),
    meta: { guest: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Check authentication status
  if (authStore.token) {
    try {
      await authStore.fetchUser();
    } catch {
      authStore.logout();
    }
  }

  // Route protection
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login');
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

    if (requiresAuth && !authStore.isAuthenticated) {
        return next('/auth/login')
    }

    if (requiresGuest && authStore.isAuthenticated) {
        return next('/dashboard')
    }

    next()
})

export default router

