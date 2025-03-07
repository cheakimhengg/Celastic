<template>
  <div class="flex items-center justify-between w-full px-6 py-3 border-b">
    <button @click="props.toggleSidebar()" class="toggle-button mb-0">
      <el-icon><Operation /></el-icon>
    </button>
    <div class="user-name text-right">
      <span>John Doe</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Operation } from '@element-plus/icons-vue';

const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true,
  },
});
</script>
