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
              Digital Menus, Smarter Dining<br />for Modern Restaurants
            </h1>
            <p class="text-xl opacity-90">
              Revolutionize your restaurant with digital menus and seamless ordering. Enhance
              customer experience, boost efficiency, and grow your business with our innovative QR
              menu solutions.
            </p>
            <div class="flex gap-4 pt-4">
              <el-button type="default" size="large" class="!bg-white !text-primary">
                Get Started
              </el-button>
            </div>
          </div>
          <div class="hidden lg:block">
            <img src="@/assets/images/hero.svg" alt="Hero" class="w-full max-w-lg mx-auto" />
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <span class="text-primary font-semibold text-sm uppercase tracking-wider"
            >Why Choose Us</span
          >
          <h2 class="text-4xl font-bold text-gray-900 mt-2 mb-4">
            Experience the Nhamey Difference
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover why thousands of customers trust us for their daily dining needs. We combine
            cutting-edge technology with exceptional service.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <div
              class="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 relative z-10"
            >
              <el-icon
                class="text-3xl text-primary group-hover:!text-white transition-all duration-500 group-hover:scale-110"
              >
                <Timer />
              </el-icon>
            </div>
            <h3
              class="text-xl font-bold text-gray-900 mb-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500"
            >
              Lightning Fast Delivery
            </h3>
            <p
              class="text-gray-600 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform duration-500"
            >
              Experience swift delivery within 30 minutes. Our efficient system ensures your food
              arrives hot, fresh, and right on time.
            </p>
          </div>

          <div
            class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <div
              class="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 relative z-10"
            >
              <el-icon
                class="text-3xl text-primary group-hover:!text-white transition-all duration-500 group-hover:scale-110"
              >
                <Food />
              </el-icon>
            </div>
            <h3
              class="text-xl font-bold text-gray-900 mb-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500"
            >
              Premium Quality Food
            </h3>
            <p
              class="text-gray-600 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform duration-500"
            >
              Savor dishes from our carefully curated selection of top-rated local restaurants,
              ensuring the highest quality in every bite.
            </p>
          </div>

          <div
            class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <div
              class="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 relative z-10"
            >
              <el-icon
                class="text-3xl text-primary group-hover:!text-white transition-all duration-500 group-hover:scale-110"
              >
                <Service />
              </el-icon>
            </div>
            <h3
              class="text-xl font-bold text-gray-900 mb-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500"
            >
              24/7 Premium Support
            </h3>
            <p
              class="text-gray-600 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform duration-500"
            >
              Our dedicated support team is available around the clock to assist you with any
              questions or concerns you may have.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Join as Employee Section -->
    <div id="join" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="bg-primary rounded-2xl overflow-hidden">
          <div class="grid lg:grid-cols-2 items-center">
            <div class="p-12 lg:p-16">
              <h2 class="text-3xl font-bold text-white mb-4">Become a Nhamey Delivery Partner</h2>
              <p class="text-white opacity-90 mb-8">
                Join our elite team of delivery professionals. Enjoy flexible scheduling,
                competitive earnings, comprehensive benefits, and be part of Cambodia's
                fastest-growing food delivery network.
              </p>
              <el-button
                type="default"
                size="large"
                class="!bg-white !text-primary hover:!bg-opacity-90 !font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Apply Now
              </el-button>
            </div>
            <div class="hidden lg:block relative h-full min-h-[400px]">
              <div class="absolute inset-0 bg-pattern opacity-20"></div>
              <img
                src="@/assets/images/delivery.svg"
                alt="Delivery Partner"
                class="absolute bottom-0 right-0 w-4/5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <!-- <div id="about" class="py-20 bg-primary/5">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">The Nhamey Story</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            We're on a mission to revolutionize food delivery in Cambodia by connecting food lovers
            with exceptional local restaurants while supporting our community's growth.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="bg-gray-50 p-8 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Our Story</h3>
            <p class="text-gray-600">
              Established in 2023, Nhamey emerged with a vision to transform Cambodia's food
              delivery landscape by making quality local cuisine accessible to everyone while
              empowering local restaurants.
            </p>
          </div>
          <div
            class="bg-gray-50 p-8 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p class="text-gray-600">
              To revolutionize the food delivery experience by creating perfect harmony between
              customers, restaurants, and delivery partners, serving happiness with every order.
            </p>
          </div>
          <div
            class="bg-gray-50 p-8 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p class="text-gray-600">
              Excellence, innovation, and community empowerment drive our mission. We're dedicated
              to setting new standards in food delivery service and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div> -->
    <section id="pricing" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold text-sm uppercase tracking-wider">Our Plans</span>
          <h2 class="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Select a plan tailored to your business requirements. Our flexible pricing options are designed to scale with your growth and deliver maximum value.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Basic Plan -->
          <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-bold mb-4">Basic</h3>
            <div class="text-4xl font-bold mb-4">
              $9<span class="text-lg text-gray-500">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Team collaboration for up to 5 users</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Essential analytics dashboard</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Standard customer support</span>
              </li>
            </ul>
            <el-button type="primary" class="w-full">Start Free Trial</el-button>
          </div>

          <!-- Pro Plan -->
          <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-primary">
            <div class="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm">Most Popular</div>
            <h3 class="text-xl font-bold mb-4">Professional</h3>
            <div class="text-4xl font-bold mb-4">
              $29<span class="text-lg text-gray-500">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Enhanced collaboration for up to 20 users</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Advanced analytics & reporting</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Priority support channels</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>API access & custom integrations</span>
              </li>
            </ul>
            <el-button type="primary" class="w-full">Upgrade Now</el-button>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-bold mb-4">Enterprise</h3>
            <div class="text-4xl font-bold mb-4">
              $99<span class="text-lg text-gray-500">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Unlimited user licenses</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Enterprise-grade analytics suite</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Dedicated account manager</span>
              </li>
              <li class="flex items-center">
                <el-icon class="text-green-500 mr-2"><Check /></el-icon>
                <span>Custom deployment & integration</span>
              </li>
            </ul>
            <el-button type="primary" class="w-full">Schedule Consultation</el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue';
import HomeNavbar from '@/components/HomeNavbar.vue';
import Footer from '@/components/Footer.vue';
import { Timer, Food, Service } from '@element-plus/icons-vue';
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Base Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Hero Section Animations */
.text-white.space-y-6 > * {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
.grid.md\:grid-cols-3.gap-8 > div {
  animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.grid.md\:grid-cols-3.gap-8 > div:nth-child(1) {
  animation-delay: 0.2s;
}
.grid.md\:grid-cols-3.gap-8 > div:nth-child(2) {
  animation-delay: 0.4s;
}
.grid.md\:grid-cols-3.gap-8 > div:nth-child(3) {
  animation-delay: 0.6s;
}

/* About Section Cards */
.bg-gray-50.p-8 {
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-gray-50.p-8:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
