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
          <a
            v-for="(item, index) in navItems"
            :key="index"
            :href="item.href"
            class="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ item.text }}
          </a>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <el-button type="primary" @click="$router.push('/login')"> Login </el-button>
          <el-button
            type="default"
            :class="['border-primary text-primary hover:bg-primary hover:text-white']"
            @click="$router.push('/register')"
          >
            Register
          </el-button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <el-button
            @click="toggleMobileMenu"
            class="!p-2 !border-none hover:!bg-primary/5"
            :class="{ '!text-primary': isMobileMenuOpen }"
          >
            <el-icon><component :is="isMobileMenuOpen ? Close : Menu" /></el-icon>
          </el-button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMobileMenuOpen" class="md:hidden py-4 space-y-4 transition-all duration-200">
        <a
          v-for="(item, index) in navItems"
          :key="index"
          :href="item.href"
          class="block text-gray-700 hover:text-primary font-medium transition-colors duration-200"
          @click.prevent="scrollToSection(item.href)"
        >
          {{ item.text }}
        </a>
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
  // { text: 'About', href: '#about' },
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
