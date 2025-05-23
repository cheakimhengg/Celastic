<template>
  <section id="pricing" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider">Our Plans</span>
        <h2 class="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Select a plan tailored to your business requirements. Our flexible pricing options are
          designed to scale with your growth and deliver maximum value.
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
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Team collaboration for up to 5 users</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Essential analytics dashboard</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Standard customer support</span>
            </li>
          </ul>
          <el-button type="primary" class="w-full">Start Free Trial</el-button>
        </div>

        <!-- Pro Plan -->
        <div
          class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-primary">
          <div class="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm">
            Most Popular
          </div>
          <h3 class="text-xl font-bold mb-4">Professional</h3>
          <div class="text-4xl font-bold mb-4">
            $29<span class="text-lg text-gray-500">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Enhanced collaboration for up to 20 users</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Advanced analytics & reporting</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Priority support channels</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
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
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Unlimited user licenses</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Enterprise-grade analytics suite</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Dedicated account manager</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-green-500 mr-2">
                <Check />
              </el-icon>
              <span>Custom deployment & integration</span>
            </li>
          </ul>
          <el-button type="primary" class="w-full">Schedule Consultation</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue';
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
