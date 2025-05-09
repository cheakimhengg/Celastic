<template>
    <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
defineProps(['chartData', 'chartOptions'])
</script>
