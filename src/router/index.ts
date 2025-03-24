import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Food from '@/views/Food.vue';
import Category from '@/views/Category.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/admin/categories',
      name: 'categories',
      component: () => Category,
    },
    {
      path: '/admin/foods',
      name: 'foods',
      component: () => Food,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => Login,
    },
    {
      path: '/register',
      name: 'register',
      component: () => Register,
    },
    {
      path: '/',
      name: 'Home',
      component: () => Home,
    },
  ],
});

export default router;
