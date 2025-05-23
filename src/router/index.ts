import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/admin/categories',
      name: 'categories',
      component: () => import('@/views/Category.vue'),
    },
    {
      path: '/admin/foods',
      name: 'foods',
      component: () => import('@/views/Food.vue'),
    },
    {
      path: '/admin/orders',
      name: 'orders',
      component: () => import('@/views/Order.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path.startsWith('/admin')) {
    if (!token) {
      next({ path: '/login' });
      return;
    }
  }
  if ((to.path === '/login' || to.path === '/register') && token) {
    next({ path: '/admin/dashboard' });
    return;
  }
  next();
});

export default router;
