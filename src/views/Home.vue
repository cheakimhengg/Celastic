<template>
  <div class="min-h-screen bg-white">
    <HomeNavbar />
    <HeroSection />
    <FeaturesSection />
    <JoinSection />
    <PricingSection />
  </div>
  <Footer />
</template>

<script setup lang="ts">
import HomeNavbar from '@/components/HomeNavbar.vue';
import Footer from '@/components/Footer.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import FeaturesSection from '@/components/home/FeaturesSection.vue';
import JoinSection from '@/components/home/JoinSection.vue';
import PricingSection from '@/components/home/PricingSection.vue';
import { onMounted } from 'vue';

// This ensures smooth scrolling when clicking on navigation links
onMounted(() => {
  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      const id = target.getAttribute('href')?.substring(1);
      const element = document.getElementById(id || '');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  document.addEventListener('click', handleAnchorClick);
  
  return () => {
    document.removeEventListener('click', handleAnchorClick);
  };
});
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
