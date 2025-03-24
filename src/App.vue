<template>
  <div v-if="$route.path.includes('admin')" class="flex flex-col">
    <Navbar :toggle-sidebar="toggleSidebar" />
    <div class="flex flex-row">
      <Sidebar :is-open="isOpen" />
      <RouterView />
    </div>
  </div>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
import { ref } from 'vue';

const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>
