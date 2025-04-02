<template>
  <div class="min-h-screen flex bg-gradient-to-br from-primary/5 to-primary/10">
    <div class="w-full flex items-center justify-center p-8">
      <el-card
        class="w-full max-w-md border-none shadow-lg backdrop-blur-sm bg-white/90 transition-all duration-300 hover:translate-y-[-2px]"
        :shadow="'hover'"
      >
        <template #header>
          <div class="flex items-center justify-center space-x-3">
            <el-icon class="text-3xl text-primary"><UserFilled /></el-icon>
            <h2
              class="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              Login
            </h2>
          </div>
        </template>

        <div>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginFormRef"
            @submit.prevent="handleLogin"
          >
            <el-form-item prop="username">
              <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <el-input
                v-model="loginForm.username"
                placeholder="Enter your username"
                :prefix-icon="User"
                size="large"
                class="rounded-lg"
              />
            </el-form-item>

            <el-form-item prop="password">
              <div class="w-full flex justify-between items-center mb-1">
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" class="text-sm text-secondary hover:underline">Forgot password?</a>
              </div>
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="Enter your password"
                :prefix-icon="Lock"
                size="large"
                class="rounded-lg"
                show-password
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="w-full text-lg h-12 rounded-lg hover:bg-opacity-90 transition-all duration-200"
                :loading="isLoading"
                native-type="submit"
              >
                Login
              </el-button>
            </el-form-item>
          </el-form>

          <div class="text-center text-gray-600 mt-4 text-sm">
            <span>Don't have an account? </span>
            <a href="/register" class="text-primary hover:underline font-medium">Register</a>
          </div>
        </div>
      </el-card>
    </div>
    <div
      class="hidden lg:flex items-center justify-center w-full bg-primary relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-pattern opacity-20"></div>
      <div class="relative z-10 flex flex-col justify-center items-center p-12 text-white">
        <div class="mb-8 relative inline-flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-2 border-white"></div>
          <img :src="logo" alt="Logo" class="h-16 z-10 p-3" />
        </div>
        <h1 class="text-4xl font-bold mb-4">Welcome to Nhamey</h1>
        <p class="text-xl text-center">
          Manage your resources and analyze data with our powerful dashboard.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, UserFilled } from '@element-plus/icons-vue';
import logo from '@/assets/images/logo.png';
import { useLogin } from '@/composable/useLogin';

const { isLoading, handleLogin, loginFormRef, rules, loginForm } = useLogin();
</script>

<style>
.el-card__header {
  border-bottom: none;
}

.el-input__wrapper {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
  border: 1px solid #e5e7eb !important;
}

.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 2px rgba(var(--el-color-primary-rgb), 0.2) !important;
  border-color: var(--el-color-primary) !important;
}

.el-button--primary {
  background: linear-gradient(
    to right,
    var(--el-color-primary),
    rgba(var(--el-color-primary-rgb), 0.8)
  );
  border: none;
  transition: all 0.3s ease;
}

.el-button--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(var(--el-color-primary-rgb), 0.2);
}
</style>
