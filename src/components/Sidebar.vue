<template>
  <el-menu active-text-color="#409eff" background-color="ffffff" class="el-menu-vertical-demo h-[calc(100vh-3.75rem)]"
    :collapse="props.isOpen" default-active="2" text-color="#000000" router>
    <el-menu-item index="/admin/dashboard">
      <el-icon>
        <Monitor />
      </el-icon>
      <template #title>
        <span>1. Dashboard</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <List />
        </el-icon>
        <span>2. Menu Management</span>
      </template>
      <el-menu-item index="/admin/categories">
        <el-icon>
          <Menu />
        </el-icon>
        <template #title>
          <span>2.1 Categories</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/admin/foods">
        <el-icon>
          <Food />
        </el-icon>
        <template #title>
          <span>2.2 Foods</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Histogram />
        </el-icon>
        <span>3. Order Management</span>
      </template>
      <el-menu-item index="/admin/tables">
        <el-icon>
          <Grid />
        </el-icon>
        <template #title>
          <span>3.1 Tables</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/admin/orders">
        <el-icon>
          <Tickets />
        </el-icon>
        <template #title>
          <span>3.2 Orders</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <PieChart />
        </el-icon>
        <span>4. Report Management</span>
      </template>
      <el-menu-item index="/admin/reports">
        <el-icon>
          <PieChart />
        </el-icon>
        <template #title>
          <span>4.1 Reports</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Menu, List, Monitor, Food, Tickets, Histogram, PieChart, Grid } from '@element-plus/icons-vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}

.el-menu-vertical-demo.el-menu--collapse {
  width: 64px;
}
</style>
