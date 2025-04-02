<template>
  <div id="hero" class="relative bg-primary h-screen pt-16">
    <div class="absolute inset-0 bg-pattern opacity-20"></div>
    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="text-white space-y-6">
          <h1 class="text-5xl font-bold leading-tight">
            Digital Menus, Smarter Dining<br />for Modern Restaurants
          </h1>
          <!-- ass -->
          <p class="text-xl opacity-90">
            Revolutionize your restaurant with digital menus and seamless ordering. Enhance customer
            experience, boost efficiency, and grow your business with our innovative QR menu
            solutions.
          </p>
          <div class="flex gap-4 pt-4">
            <el-button
              type="default"
              size="large"
              class="!bg-white !text-primary"
              @click="$router.push('/register')"
            >
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
</template>

<script setup lang="ts">
// No additional imports needed for this component
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
</style>
