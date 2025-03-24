<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <img src="@/assets/images/logo.png" alt="Nhamey" class="h-8 mb-4" />
          <p class="text-gray-400 text-sm">
            Discover the best local food and restaurants in your area with Nhamey.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/"
                class="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                About Us
              </router-link>
            </li>
            <li>
              <router-link
                to="/menu"
                class="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Menu
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
          <ul class="space-y-2">
            <li class="flex items-center text-gray-400">
              <el-icon class="mr-2"><Location /></el-icon>
              123 Street, Phnom Penh, Cambodia
            </li>
            <li class="flex items-center text-gray-400">
              <el-icon class="mr-2"><Phone /></el-icon>
              +855 12 345 678
            </li>
            <li class="flex items-center text-gray-400">
              <el-icon class="mr-2"><Message /></el-icon>
              info@nhamey.com
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-primary transition-colors duration-200">
              <el-icon class="text-xl"><IconFacebook /></el-icon>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors duration-200">
              <el-icon class="text-xl"><IconInstagram /></el-icon>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors duration-200">
              <el-icon class="text-xl"><IconTwitter /></el-icon>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
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
