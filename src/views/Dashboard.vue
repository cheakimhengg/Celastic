<template>
  <div class="w-full bg-[#fafbfc] p-6 md:p-10" v-loading="isLoading">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    </div>

    <!-- Dashboard Content -->
    <div>
      <!-- Top Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            <span>{{ card.change > 0 ? '+' : '' }}{{ card.change.toFixed(2) }}%</span>
            <span class="text-gray-400">vs last week</span>
          </div>
        </div>
      </div>

      <!-- Revenue Analytics -->
      <div class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-gray-800">Revenue Analytics</span>
        </div>
        <BaseLineChart :chart-data="revenueChartData" :chart-options="revenueChartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseLineChart from '@/components/charts/BaseLineChart.vue';
import { useDashboard } from '@/composable/useDashboard';

const { dashboardData, isLoading } = useDashboard();

// Icons
const DollarIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4-1.343 4-3-1.79-3-4-3zm0 0V4m0 16v-4'/></svg>`
}
const CartIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.95-.68L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z'/></svg>`
}

const statCards = computed(() => {
  if (!dashboardData.value) return [];
  return [
    { label: 'Total Sales', value: `$${dashboardData.value.totalSales.value.toLocaleString()}`, change: parseFloat(dashboardData.value.totalSales.change), icon: DollarIcon },
    { label: 'Total Orders', value: dashboardData.value.totalOrders.value.toLocaleString(), change: parseFloat(dashboardData.value.totalOrders.change), icon: CartIcon },
  ];
});

const revenueChartData = computed(() => {
  if (!dashboardData.value?.revenueAnalytics) return { labels: [], datasets: [] };

  const labels = Object.keys(dashboardData.value.revenueAnalytics);
  const data = Object.values(dashboardData.value.revenueAnalytics);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: data,
        borderColor: '#409eff',
        backgroundColor: 'rgba(64,158,255,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#409eff',
      },
    ],
  };
});

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
};
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
