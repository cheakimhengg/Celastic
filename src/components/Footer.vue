<template>
  <footer class="bg-gray-800 text-white py-8 md:py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <!-- Company Info -->
        <div class="mb-6 md:mb-0">
          <img src="@/assets/images/logo.png" alt="Nhamey" class="h-10 md:h-12 mb-3 md:mb-4" />
          <p class="text-gray-400 text-sm max-w-xs">
            Discover the best local food and restaurants in your area with Nhamey.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-primary transition-colors duration-200 inline-block">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-400 hover:text-primary transition-colors duration-200">
                About Us
              </router-link>
            </li>
            <li>
              <router-link to="/menu" class="text-gray-400 hover:text-primary transition-colors duration-200">
                Menu
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-gray-400 hover:text-primary transition-colors duration-200">
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
          <ul class="space-y-3">
            <li class="flex items-start text-gray-400">
              <el-icon class="mr-2 mt-1 flex-shrink-0">
                <Location />
              </el-icon>
              <span>123 Street, Phnom Penh, Cambodia</span>
            </li>
            <li class="flex items-center text-gray-400">
              <el-icon class="mr-2">
                <Phone />
              </el-icon>
              +855 71 556 2678
            </li>
            <li class="flex items-center text-gray-400">
              <el-icon class="mr-2">
                <Message />
              </el-icon>
              info@nhamey.com
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-semibold mb-3 md:mb-4">Follow Us</h3>
          <div class="flex space-x-5">
            <a href="#" class="text-gray-400 hover:text-primary transition-colors duration-200">
              <el-icon class="text-xl">
                <IconFacebook />
              </el-icon>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors duration-200">
              <el-icon class="text-xl">
                <IconInstagram />
              </el-icon>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors duration-200">
              <el-icon class="text-xl">
                <IconTwitter />
              </el-icon>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Nhamey. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Location, Phone, Message } from '@element-plus/icons-vue';
import IconFacebook from '@/components/icons/IconFacebook.vue';
import IconInstagram from '@/components/icons/IconInstagram.vue';
import IconTwitter from '@/components/icons/IconTwitter.vue';
</script>

<style scoped>
/* Add responsive styles */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
