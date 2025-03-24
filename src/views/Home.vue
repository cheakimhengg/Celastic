<template>
  <div class="min-h-screen bg-white">
    <HomeNavbar />
    <!-- Hero Section -->
    <div id="hero" class="relative bg-primary h-screen pt-16">
      <div class="absolute inset-0 bg-pattern opacity-20"></div>
      <div class="container mx-auto px-4 h-full flex items-center relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-white space-y-6">
            <h1 class="text-5xl font-bold leading-tight">
              Delicious Food,<br />Delivered to Your Door
            </h1>
            <p class="text-xl opacity-90">
              Experience the best local restaurants at your fingertips. Order your favorite meals
              with just a few clicks.
            </p>
            <div class="flex gap-4 pt-4">
              <el-button
                type="default"
                size="large"
                class="!bg-white !text-primary hover:!bg-opacity-90 !font-semibold"
              >
                Get Started
              </el-button>
              <el-button
                type="default"
                size="large"
                class="!border-white !text-white hover:!bg-white hover:!text-primary !font-semibold"
              >
                Learn More
              </el-button>
            </div>
          </div>
          <div class="hidden lg:block">
            <img
              src="@/assets/images/hero-food.svg"
              alt="Hero Food"
              class="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Nhamey?</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            We provide the best food ordering experience with our easy-to-use platform and reliable
            service.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-sm text-center">
            <el-icon class="text-5xl text-primary mb-4"><Timer /></el-icon>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p class="text-gray-600">Get your food delivered in 30 minutes or less</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm text-center">
            <el-icon class="text-5xl text-primary mb-4"><Food /></el-icon>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Quality Food</h3>
            <p class="text-gray-600">Partner with the best local restaurants in town</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm text-center">
            <el-icon class="text-5xl text-primary mb-4"><Service /></el-icon>
            <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
            <p class="text-gray-600">Our customer service team is always here to help</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Join as Employee Section -->
    <div id="join" class="py-20">
      <div class="container mx-auto px-4">
        <div class="bg-primary rounded-2xl overflow-hidden">
          <div class="grid lg:grid-cols-2 items-center">
            <div class="p-12 lg:p-16">
              <h2 class="text-3xl font-bold text-white mb-4">
                Join Our Team as a Delivery Partner
              </h2>
              <p class="text-white opacity-90 mb-8">
                Become a part of our growing family. Enjoy flexible hours, competitive pay, and
                great benefits.
              </p>
              <el-button
                type="default"
                size="large"
                class="!bg-white !text-primary hover:!bg-opacity-90 !font-semibold"
              >
                Apply Now
              </el-button>
            </div>
            <div class="hidden lg:block relative h-full min-h-[400px]">
              <div class="absolute inset-0 bg-pattern opacity-20"></div>
              <img
                src="@/assets/images/delivery-partner.svg"
                alt="Delivery Partner"
                class="absolute bottom-0 right-0 w-4/5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div id="about" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">About Nhamey</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            We're passionate about connecting people with great food and supporting local
            restaurants.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="bg-gray-50 p-8 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Our Story</h3>
            <p class="text-gray-600">
              Founded in 2023, Nhamey started with a simple mission: making local food accessible to
              everyone while supporting restaurants.
            </p>
          </div>
          <div
            class="bg-gray-50 p-8 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p class="text-gray-600">
              To create a seamless connection between food lovers and local restaurants, delivering
              happiness one meal at a time.
            </p>
          </div>
          <div
            class="bg-gray-50 p-8 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p class="text-gray-600">
              Quality, reliability, and community are at the heart of everything we do. We're
              committed to excellence in food delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
// import { Location, Phone, Message } from '@element-plus/icons-vue';
import HomeNavbar from '@/components/HomeNavbar.vue';
import Footer from '@/components/Footer.vue';
import { Timer, Food, Service } from '@element-plus/icons-vue';
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Hero Section Animations */
.text-white.space-y-6 > * {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.text-white.space-y-6 > :nth-child(1) {
  animation-delay: 0.2s;
}
.text-white.space-y-6 > :nth-child(2) {
  animation-delay: 0.4s;
}
.text-white.space-y-6 > :nth-child(3) {
  animation-delay: 0.6s;
}

/* Feature Cards Animation */
.bg-white.p-8 {
  animation: scaleIn 0.5s ease-out forwards;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.bg-white.p-8:hover {
  transform: translateY(-5px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Icon Animation */
.el-icon {
  transition: transform 0.3s ease;
}

.bg-white.p-8:hover .el-icon {
  transform: scale(1.1);
}

/* Button Hover Effects */
.el-button {
  transition: all 0.3s ease !important;
}

.el-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Join Section Animation */
.bg-primary.rounded-2xl {
  transition: transform 0.3s ease;
}

.bg-primary.rounded-2xl:hover {
  transform: scale(1.01);
}

/* Background Pattern Animation */
.bg-pattern {
  animation: patternFloat 20s linear infinite;
}

@keyframes patternFloat {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 60px 60px;
  }
}
</style>
