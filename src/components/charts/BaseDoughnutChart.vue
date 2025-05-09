<template>
    <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
defineProps(['chartData', 'chartOptions'])
</script>
