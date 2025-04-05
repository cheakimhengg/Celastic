<template>
  <div id="join" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="bg-primary rounded-2xl overflow-hidden">
        <div class="grid lg:grid-cols-2 items-center">
          <div class="p-12 lg:p-16 animate-fade-up">
            <h2 class="text-3xl font-bold text-white mb-4 animate-fade-up animation-delay-200">
              Become a Nhamey Delivery Partner
            </h2>
            <p class="text-white opacity-90 mb-8 animate-fade-up animation-delay-400">
              Join our elite team of delivery professionals. Enjoy flexible scheduling, competitive
              earnings, comprehensive benefits, and be part of Cambodia's fastest-growing food
              delivery network.
            </p>
            <el-button
              type="default"
              size="large"
              class="!bg-white !text-primary hover:!bg-gray-100 transition-colors animate-fade-up animation-delay-600"
              @click="handleApplyClick"
            >
              Apply Now
            </el-button>
          </div>
          <div class="hidden lg:block relative h-full min-h-[400px] animate-slide-in-right">
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
</template>

<script lang="ts" setup>
const handleApplyClick = () => {
  const formUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSfFAZy0W-D3PWHPRWeclzzCgOpdANDZLMVm5PflrbCA9bm6Ag/viewform?usp=sf_link';
  window.open(formUrl, '_blank');
};
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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

/* Entrance Animations */
.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
}

.animate-slide-in-right {
  opacity: 0;
  transform: translateX(50px);
  animation: slideInRight 0.8s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}
</style>
