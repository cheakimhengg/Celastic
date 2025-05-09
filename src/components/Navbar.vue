<template>
  <div class="flex items-center justify-between w-full px-6 py-3 border-b">
    <button @click="props.toggleSidebar()" class="toggle-button mb-0">
      <el-icon>
        <Operation />
      </el-icon>
    </button>
    <div class="flex items-center gap-4 user-name text-right">
      <el-icon class="relative cursor-pointer hover:text-primary transition-colors duration-200">
        <Bell />
        <!-- <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow"
          style="font-size:10px;">1</span> -->
      </el-icon>
      <span class="mx-2 text-gray-800 capitalize whitespace-nowrap">{{ username.charAt(0).toUpperCase() +
        username.slice(1) }}</span>
      <el-icon class="relative cursor-pointer hover:text-primary transition-colors duration-200">
        <Setting />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Operation, Bell, Setting } from '@element-plus/icons-vue';

const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true,
  },
});

const username = ref(localStorage.getItem('username') || 'Admin');
</script>
