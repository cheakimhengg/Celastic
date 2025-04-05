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

export default router;