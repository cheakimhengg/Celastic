<template>
  <div class="flex items-center justify-between w-full px-6 py-3 border-b">
    <button @click="props.toggleSidebar()" class="toggle-button mb-0">
      <el-icon>
        <Operation />
      </el-icon>
    </button>
    <div class="flex items-center gap-4 user-name text-right">
      <!-- Notification Bell with Badge -->
      <div class="relative cursor-pointer group" @click="handleNotificationClick">
        <el-icon class="text-gray-600 group-hover:text-primary transition-colors duration-200">
          <Bell />
        </el-icon>
        <!-- Notification Badge -->
        <div v-if="pendingCount > 0"
             class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-lg border-2 border-white transform scale-100 group-hover:scale-110 transition-transform duration-200">
          {{ pendingCount > 99 ? '99+' : pendingCount }}
        </div>
        <!-- Loading indicator -->
        <div v-if="isLoading"
             class="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center shadow-lg border-2 border-white">
          <el-icon class="animate-spin text-[8px]">
            <Loading />
          </el-icon>
        </div>
        <!-- Tooltip -->
        <div v-if="pendingCount > 0"
             class="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
          {{ pendingCount }} pending order{{ pendingCount > 1 ? 's' : '' }}
          <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
        </div>
      </div>
      <span class="mx-2 text-gray-800 capitalize whitespace-nowrap">{{ username.charAt(0).toUpperCase() +
        username.slice(1) }}</span>
      <el-dropdown @command="handleDropdownCommand" >
        <span class="flex items-center cursor-pointer">
          <el-icon class="relative hover:text-primary transition-colors duration-200">
            <component :is="isLoggingOut ? Loading : Setting" class="animate-spin" v-if="isLoggingOut" />
            <Setting v-else />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout" :disabled="isLoggingOut">
              <span v-if="isLoggingOut">
                <el-icon class="mr-1">
                  <Loading />
                </el-icon> Logging out...
              </span>
              <span v-else>Logout</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Operation, Bell, Setting, Loading } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { usePendingOrderCount } from '../composable/usePendingOrderCount';

const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true,
  },
});

const username = ref(localStorage.getItem('username') || 'Admin');
const router = useRouter();
const isLoggingOut = ref(false);

// Use the pending order count composable
const { pendingCount, isLoading, fetchPendingCount } = usePendingOrderCount();

async function handleDropdownCommand(command: string) {
  if (command === 'logout' && !isLoggingOut.value) {
    isLoggingOut.value = true;
    // Simulate async logout (in real app, could call API or just clear storage)
    setTimeout(() => {
      localStorage.clear();
      router.push('/login');
      isLoggingOut.value = false;
    }, 800);
  }
}

// Handle notification bell click
const handleNotificationClick = () => {
  // Navigate to orders page or show notification dropdown
  router.push('/admin/orders');
  // Optionally refresh the count when clicked
  fetchPendingCount();
};
</script>

<style scoped>
:deep(.el-dropdown .el-icon),
:deep(.el-dropdown .el-icon:hover),
:deep(.el-dropdown .el-icon:focus) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
</style>
