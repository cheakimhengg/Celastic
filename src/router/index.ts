import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Food from '@/views/Food.vue';
import Category from '@/views/Category.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => Category,
    },
    {
      path: '/foods',
      name: 'foods',
      component: () => Food,
    },
  ],
});

export default router;
