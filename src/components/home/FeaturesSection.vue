<template>
  <div id="features" class="py-20 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
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
          class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <div
            class="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 relative z-10">
            <el-icon
              class="text-3xl text-primary group-hover:!text-white transition-all duration-500 group-hover:scale-110">
              <Timer />
            </el-icon>
          </div>
          <h3
            class="text-xl font-bold text-gray-900 mb-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500">
            Lightning Fast Delivery
          </h3>
          <p
            class="text-gray-600 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform duration-500">
            Experience swift delivery within 30 minutes. Our efficient system ensures your food
            arrives hot, fresh, and right on time.
          </p>
        </div>

        <div
          class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <div
            class="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 relative z-10">
            <el-icon
              class="text-3xl text-primary group-hover:!text-white transition-all duration-500 group-hover:scale-110">
              <Food />
            </el-icon>
          </div>
          <h3
            class="text-xl font-bold text-gray-900 mb-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500">
            Premium Quality Food
          </h3>
          <p
            class="text-gray-600 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform duration-500">
            Savor dishes from our carefully curated selection of top-rated local restaurants,
            ensuring the highest quality in every bite.
          </p>
        </div>

        <div
          class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <div
            class="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 relative z-10">
            <el-icon
              class="text-3xl text-primary group-hover:!text-white transition-all duration-500 group-hover:scale-110">
              <Service />
            </el-icon>
          </div>
          <h3
            class="text-xl font-bold text-gray-900 mb-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500">
            24/7 Premium Support
          </h3>
          <p
            class="text-gray-600 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform duration-500">
            Our dedicated support team is available around the clock to assist you with any
            questions or concerns you may have.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timer, Food, Service } from '@element-plus/icons-vue';
</script>

<style scoped>
/* Feature Cards Animation */
.grid.md\:grid-cols-3.gap-8>div {
  animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.grid.md\:grid-cols-3.gap-8>div:nth-child(1) {
  animation-delay: 0.2s;
}

.grid.md\:grid-cols-3.gap-8>div:nth-child(2) {
  animation-delay: 0.4s;
}

.grid.md\:grid-cols-3.gap-8>div:nth-child(3) {
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
</style>
