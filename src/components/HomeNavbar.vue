<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img src="@/assets/images/logo.png" alt="Nhamey" class="h-12" />
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <a v-for="(item, index) in navItems" :key="index" :href="item.href"
            class="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            @click.prevent="scrollToSection(item.href)">
            {{ item.text }}
          </a>
        </div>

        <!-- Auth Buttons - Hide on mobile -->
        <div class="hidden md:flex items-center space-x-4">
          <el-button type="primary" @click="$router.push('/login')"> Login </el-button>
          <el-button type="default" @click="$router.push('/register')"> Register </el-button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <el-button @click="toggleMobileMenu" class="!p-2 !border-none hover:!bg-primary/5"
            :class="{ '!text-primary': isMobileMenuOpen }">
            <el-icon>
              <component :is="isMobileMenuOpen ? Close : Menu" />
            </el-icon>
          </el-button>
        </div>
      </div>

      <!-- Mobile Menu with improved animation -->
      <div class="md:hidden transition-all duration-300 ease-in-out" :style="{
        maxHeight: isMobileMenuOpen ? '500px' : '0',
        opacity: isMobileMenuOpen ? '1' : '0',
        overflow: 'hidden',
        padding: isMobileMenuOpen ? '1rem 0' : '0',
      }">
        <div class="space-y-4 px-2">
          <a v-for="(item, index) in navItems" :key="index" :href="item.href"
            class="block text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2"
            @click.prevent="scrollToSection(item.href)">
            {{ item.text }}
          </a>

          <!-- Auth Buttons in mobile menu -->
          <div class="flex flex-col space-y-3 pt-4 mt-2 border-t border-gray-200">
            <el-button type="primary" @click="$router.push('/login')"> Login </el-button>
          </div>
          <div class="flex flex-col">
            <el-button type="default" @click="$router.push('/register')"> Register </el-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, Close } from '@element-plus/icons-vue';

const isMobileMenuOpen = ref(false);

const navItems = [
  { text: 'Home', href: '#hero' },
  { text: 'Features', href: '#features' },
  { text: 'Join Us', href: '#join' },
  { text: 'Pricing', href: '#pricing' },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    isMobileMenuOpen.value = false;
  }
};
</script>

<style scoped>
:deep(.el-button) {
  box-shadow: none !important;
  transform: none !important;
}

:deep(.el-button:hover) {
  box-shadow: none !important;
  transform: none !important;
}
</style>
