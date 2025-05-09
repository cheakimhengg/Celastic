<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <input type="text" placeholder="Search stock, order, etc"
          class="w-full md:w-80 px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
        <button class="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Top Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div v-for="card in statCards" :key="card.label"
        class="bg-white rounded-2xl p-6 shadow flex flex-col gap-2 border border-gray-100">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 font-medium">{{ card.label }}</span>
          <span class="bg-primary/10 p-2 rounded-xl">
            <component :is="card.icon" class="w-6 h-6 text-primary" />
          </span>
        </div>
        <div class="text-2xl font-extrabold text-gray-900">{{ card.value }}</div>
        <div class="flex items-center gap-2 text-sm" :class="card.change > 0 ? 'text-primary' : 'text-red-500'">
          <span>{{ card.change > 0 ? '+' : '' }}{{ card.change }}%</span>
          <span class="text-gray-400">vs last week</span>
        </div>
      </div>
    </div>

    <!-- Analytics and Target -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Revenue Analytics -->
      <div class="bg-white rounded-2xl p-6 shadow border border-gray-100 md:col-span-2 flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-gray-800">Revenue Analytics</span>
          <button class="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-semibold">Last 8 Days</button>
        </div>
        <BaseLineChart :chart-data="revenueChartData" :chart-options="revenueChartOptions" />
      </div>
      <!-- Monthly Target -->
      <div class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex flex-col items-center justify-center">
        <span class="font-semibold text-gray-800 mb-2">Monthly Target</span>
        <div class="relative flex items-center justify-center mb-4">
          <BaseDoughnutChart :chart-data="targetChartData" :chart-options="targetChartOptions" class="w-32 h-32" />
          <div class="absolute flex flex-col items-center">
            <span class="text-3xl font-bold text-primary">85%</span>
            <span class="text-xs text-primary font-semibold">+8.02%</span>
          </div>
        </div>
        <div class="text-center">
          <div class="font-semibold text-gray-700 mb-1">Great Progress! 🎉</div>
          <div class="text-xs text-gray-500 mb-2">Our achievement increased by <span
              class="text-primary font-bold">$200,000</span>.<br>Let's reach 100% next month.</div>
          <div class="flex justify-between gap-2 text-xs">
            <div class="bg-gray-100 rounded-lg px-2 py-1 flex-1 text-gray-600">Target<br><span
                class="font-bold text-gray-900">$600,000</span></div>
            <div class="bg-primary/10 rounded-lg px-2 py-1 flex-1 text-primary">Revenue<br><span
                class="font-bold">$510,000</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Active User -->
      <div class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-gray-800">Active User</span>
          <span class="text-primary text-xs font-semibold">+8.02% <span class="text-gray-400">from last
              month</span></span>
        </div>
        <div class="text-2xl font-extrabold text-gray-900 mb-2">2,758 <span
            class="text-xs text-gray-400 font-normal">Users</span></div>
        <div class="space-y-2 mt-2">
          <div v-for="user in activeUsers" :key="user.country" class="flex items-center gap-2">
            <span class="w-24 text-gray-500 text-xs">{{ user.country }}</span>
            <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div :style="{ width: user.percent + '%' }" class="h-2 rounded-full bg-primary transition-all"></div>
            </div>
            <span class="w-8 text-right text-xs font-semibold text-gray-700">{{ user.percent }}%</span>
          </div>
        </div>
      </div>
      <!-- Conversion Rate -->
      <div class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-gray-800">Conversion Rate</span>
          <button class="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-semibold">This Week</button>
        </div>
        <div class="grid grid-cols-5 gap-2 mt-4">
          <div v-for="step in conversionSteps" :key="step.label" class="flex flex-col items-center">
            <span class="text-xs text-gray-500 mb-1">{{ step.label }}</span>
            <div class="w-10 h-16 bg-primary/10 rounded-t-lg flex items-end">
              <div :style="{ height: step.percent + '%' }" class="w-full bg-primary rounded-t-lg transition-all">
              </div>
            </div>
            <span class="text-sm font-bold text-gray-900 mt-1">{{ step.value }}</span>
            <span class="text-xs" :class="step.change >= 0 ? 'text-primary' : 'text-red-500'">
              {{ step.change >= 0 ? '+' : '' }}{{ step.change }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLineChart from '@/components/charts/BaseLineChart.vue';
import BaseDoughnutChart from '@/components/charts/BaseDoughnutChart.vue';

// Icons (use Heroicons/Material Icons or SVGs)
const DollarIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4-1.343 4-3-1.79-3-4-3zm0 0V4m0 16v-4'/></svg>`
}
const CartIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.95-.68L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z'/></svg>`
}
const UserIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z'/></svg>`
}

const statCards = [
  { label: 'Total Sales', value: '$983,410', change: 3.34, icon: DollarIcon },
  { label: 'Total Orders', value: '58,375', change: -2.89, icon: CartIcon },
  { label: 'Total Visitors', value: '237,782', change: 8.02, icon: UserIcon },
]

// Revenue Analytics Chart Data
const revenueChartData = {
  labels: ['12 Aug', '13 Aug', '14 Aug', '15 Aug', '16 Aug', '17 Aug', '18 Aug', '19 Aug'],
  datasets: [
    {
      label: 'Revenue',
      data: [9000, 11000, 14521, 12000, 13000, 12500, 14000, 13500],
      borderColor: '#409eff',
      backgroundColor: 'rgba(64,158,255,0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#409eff',
    },
    {
      label: 'Order',
      data: [5000, 7000, 9000, 8000, 9000, 8500, 9500, 9000],
      borderColor: '#b2d5ff',
      backgroundColor: 'rgba(64,158,255,0.05)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#b2d5ff',
    },
  ],
}
const revenueChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
    x: { grid: { display: false } },
  },
}

// Monthly Target Doughnut Chart
const targetChartData = {
  labels: ['Achieved', 'Remaining'],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: ['#409eff', '#f3f4f6'],
      borderWidth: 0,
    },
  ],
}
const targetChartOptions = {
  cutout: '75%',
  plugins: { legend: { display: false } },
}

// Active User Data
const activeUsers = [
  { country: 'United States', percent: 36 },
  { country: 'United Kingdom', percent: 24 },
  { country: 'Indonesia', percent: 17.5 },
  { country: 'Russia', percent: 15 },
]

// Conversion Rate Data
const conversionSteps = [
  { label: 'Product Views', value: 25000, percent: 100, change: 9 },
  { label: 'Add to Cart', value: 12000, percent: 48, change: 6 },
  { label: 'Proceed to Checkout', value: 8500, percent: 34, change: 4 },
  { label: 'Completed Purchases', value: 6200, percent: 25, change: 7 },
  { label: 'Abandoned Carts', value: 3000, percent: 12, change: -5 },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.table-row-fade-enter-active,
.table-row-fade-leave-active {
  transition: background 0.4s, opacity 0.4s;
}

.table-row-fade-enter-from,
.table-row-fade-leave-to {
  opacity: 0;
}
</style>
