<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10">
    <h1 class="text-2xl font-bold text-gray-900 mb-8">Order Management</h1>
    <el-tabs v-model="activeTab" class="mb-6">
      <el-tab-pane label="Active Orders" name="active">
        <OrderTable :orders="activeOrders" :is-loading="isLoading" @view-order="viewOrder"
          @print-receipt="printReceipt" />
      </el-tab-pane>
      <el-tab-pane label="Order History" name="history">
        <OrderTable :orders="historyOrders" :is-loading="isLoading" @view-order="viewOrder"
          @print-receipt="printReceipt" />
      </el-tab-pane>
    </el-tabs>
    <!-- Order Details Dialog -->
    <el-dialog v-model="dialogVisible" title="Order Details" width="500px">
      <div v-if="selectedOrder">
        <div class="mb-4">
          <strong>Order ID:</strong> {{ selectedOrder.id }}<br />
          <strong>Customer:</strong> {{ selectedOrder.customer }}<br />
          <strong>Status:</strong> <el-tag :type="statusType(selectedOrder.status)">{{ selectedOrder.status
            }}</el-tag><br />
          <strong>Date:</strong> {{ new Date(selectedOrder.date).toLocaleString() }}<br />
        </div>
        <el-table :data="selectedOrder.items" border size="small">
          <el-table-column prop="name" label="Item" />
          <el-table-column prop="quantity" label="Qty" width="60" />
          <el-table-column prop="price" label="Price" width="80">
            <template #default="{ row }">${{ row.price.toFixed(2) }}</template>
          </el-table-column>
          <el-table-column prop="total" label="Total" width="80">
            <template #default="{ row }">${{ (row.price * row.quantity).toFixed(2) }}</template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end mt-4">
          <span class="font-bold text-lg">Total: ${{ selectedOrder.total.toFixed(2) }}</span>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">Close</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import OrderTable from '../components/home/OrderTable.vue';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}
interface Order {
  id: string;
  customer: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total: number;
  date: string;
  items: OrderItem[];
}

const isLoading = ref(true);
const dialogVisible = ref(false);
const selectedOrder = ref<Order | null>(null);
const activeTab = ref('active');

// Mock data
const orders = ref<Order[]>([]);

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    orders.value = [
      {
        id: 'ORD-1001',
        customer: 'John Doe',
        status: 'pending',
        total: 25.5,
        date: new Date().toISOString(),
        items: [
          { name: 'Fried Rice', quantity: 2, price: 5.5 },
          { name: 'Pizza', quantity: 1, price: 14.5 },
        ],
      },
      {
        id: 'ORD-1002',
        customer: 'Jane Smith',
        status: 'completed',
        total: 12.0,
        date: new Date(Date.now() - 86400000).toISOString(),
        items: [
          { name: 'Burger', quantity: 2, price: 6.0 },
        ],
      },
      {
        id: 'ORD-1003',
        customer: 'Alice Brown',
        status: 'preparing',
        total: 8.0,
        date: new Date(Date.now() - 3600000).toISOString(),
        items: [
          { name: 'Salad', quantity: 1, price: 4.0 },
          { name: 'Drink', quantity: 2, price: 2.0 },
        ],
      },
    ];
    isLoading.value = false;
  }, 1000);
});

const activeOrders = computed(() =>
  orders.value.filter(
    (order) =>
      order.status === 'pending' ||
      order.status === 'preparing' ||
      order.status === 'ready'
  )
);
const historyOrders = computed(() =>
  orders.value.filter(
    (order) =>
      order.status === 'completed' ||
      order.status === 'cancelled'
  )
);

function statusType(status: string) {
  switch (status) {
    case 'pending': return 'warning';
    case 'preparing': return 'info';
    case 'ready': return 'primary';
    case 'completed': return 'success';
    case 'cancelled': return 'danger';
    default: return '';
  }
}

function viewOrder(order: Order) {
  selectedOrder.value = order;
  dialogVisible.value = true;
}

function printReceipt(order: Order) {
  // For now, just open the dialog. In a real app, open a print-friendly page or modal.
  selectedOrder.value = order;
  dialogVisible.value = true;
}
</script>

<style scoped>
.el-table th,
.el-table td {
  vertical-align: middle;
}
</style>
