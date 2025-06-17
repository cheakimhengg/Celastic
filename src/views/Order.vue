<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-2xl font-bold text-gray-900">Order Management</h1>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <el-input v-model="search" placeholder="Search by order code" class="w-full md:w-72" clearable>
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
        <el-select v-model="filterStatus" placeholder="Status" clearable class="w-full md:w-48">
          <el-option label="Pending" value="pending" />
          <el-option label="Preparing" value="preparing" />
          <el-option label="Ready" value="ready" />
          <el-option label="Cancelled" value="cancelled" />
          <el-option label="Cancelled" value="cancelled" />
        </el-select>
      </div>
    </div>

    <el-card class="p-0" v-loading="isLoading">
      <el-table :data="filteredOrders" stripe class="w-full">
        <el-table-column prop="orderCode" label="Order Code" width="120" align="center" />
        <el-table-column label="Items" min-width="200">
          <template #default="{ row }">
            <div class="space-y-1">
              <div v-for="item in row.items" :key="item._id" class="flex items-center gap-2">
                <span class="text-sm">{{ item.foodId?.foodName || 'Unknown Item' }}</span>
                <span class="text-sm text-gray-500">x{{ item.quantity }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="Total" width="100" align="right">
          <template #default="{ row }">
            ${{ row.totalPrice.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status.charAt(0).toUpperCase() + row.status.slice(1) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="paymentStatus" label="Payment" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getPaymentStatusType(row.paymentStatus)">
              {{ row.paymentStatus.charAt(0).toUpperCase() + row.paymentStatus.slice(1) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="paymentMethod" label="Payment Method" width="140" align="center">
          <template #default="{ row }">
            <span class="capitalize">{{ row.paymentMethod.replace('_', ' ') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Date" width="180" align="center">
          <template #default="{ row }">
            {{ new Date(row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="120" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="viewOrder(row)" circle><el-icon><View /></el-icon></el-button>
            <el-button size="small" type="primary" @click="editOrder(row)" circle><el-icon><Edit /></el-icon></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Order Details Dialog -->
    <el-dialog v-model="dialogVisible" title="Order Details" width="500px">
      <div v-if="selectedOrder" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Order Code</p>
            <p class="font-medium">{{ selectedOrder.orderCode }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Date</p>
            <p class="font-medium">{{ new Date(selectedOrder.createdAt).toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Status</p>
            <el-tag :type="getStatusType(selectedOrder.status)">
              {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
            </el-tag>
          </div>
          <div>
            <p class="text-sm text-gray-500">Payment Status</p>
            <el-tag :type="getPaymentStatusType(selectedOrder.paymentStatus)">
              {{ selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1) }}
            </el-tag>
          </div>
        </div>

        <div class="border-t pt-4">
          <h3 class="font-medium mb-2">Order Items</h3>
          <div class="space-y-2">
            <div v-for="item in selectedOrder.items" :key="item._id" class="flex justify-between items-center">
              <div>
                <p class="font-medium">{{ item.foodId?.foodName || 'Unknown Item' }}</p>
                <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500">${{ item.foodId?.price.toFixed(2) || '0.00' }} each</p>
                <p class="font-medium">${{ ((item.foodId?.price || 0) * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-500">Payment Method</p>
            <p class="font-medium capitalize">{{ selectedOrder.paymentMethod.replace('_', ' ') }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Total Amount</p>
            <p class="text-xl font-bold">${{ selectedOrder.totalPrice.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="dialogVisible = false">Close</el-button>
          <el-button type="primary" @click="printOrder">Print Receipt</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="Update Order" width="400px">
      <el-form :model="editingOrder">
        <el-form-item label="Status">
          <el-select v-model="editingOrder.status">
            <el-option label="Pending" value="pending" />
            <el-option label="Preparing" value="preparing" />
            <el-option label="Ready" value="ready" />
            <el-option label="Cancelled" value="cancelled" />
          </el-select>
        </el-form-item>
        <el-form-item label="Payment Status">
          <el-select v-model="editingOrder.paymentStatus">
            <el-option label="Pending" value="pending" />
            <el-option label="Paid" value="paid" />
            <el-option label="Cancelled" value="cancelled" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="updateDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onUpdateOrder">Update</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Edit, View } from '@element-plus/icons-vue';
import { useOrder } from '@/composable/useOrder';

const {
  orders,
  fetchOrders,
  isLoading,
  getStatusType,
  getPaymentStatusType,
  dialogVisible,
  selectedOrder,
  updateDialogVisible,
  editingOrder,
  viewOrder,
  editOrder,
  onUpdateOrder,
  printOrder
} = useOrder();
const search = ref('');
const filterStatus = ref('');

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch = order.orderCode.toLowerCase().includes(search.value.toLowerCase());
    const matchesStatus = !filterStatus.value || order.status === filterStatus.value;
    return matchesSearch && matchesStatus;
  });
});

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.el-table th,
.el-table td {
  vertical-align: middle;
}
</style>
