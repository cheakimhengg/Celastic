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
      <el-dropdown @command="handleDropdownCommand" placement="bottom-end">
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

const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true,
  },
});

const username = ref(localStorage.getItem('username') || 'Admin');
const router = useRouter();
const isLoggingOut = ref(false);

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
