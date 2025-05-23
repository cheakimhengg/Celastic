<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10">
    <h1 class="text-2xl font-bold text-gray-900 mb-8">Order Management</h1>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <el-input v-model="search" placeholder="Search by customer or order ID" class="w-full md:w-72" clearable>
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-select v-model="filterStatus" placeholder="Status" clearable class="w-full md:w-48">
        <el-option label="Pending" value="pending" />
        <el-option label="Preparing" value="preparing" />
        <el-option label="Ready" value="ready" />
        <el-option label="Completed" value="completed" />
        <el-option label="Cancelled" value="cancelled" />
      </el-select>
    </div>
    <el-card>
      <el-table :data="filteredOrders" stripe :loading="isLoading" class="w-full">
        <el-table-column prop="id" label="Order ID" width="120" />
        <el-table-column prop="customer" label="Customer" />
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ row.status.charAt(0).toUpperCase() + row.status.slice(1) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="Total" width="120">
          <template #default="{ row }">
            ${{ row.total.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Date" width="180">
          <template #default="{ row }">
            {{ new Date(row.date).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="160">
          <template #default="{ row }">
            <el-button size="small" @click="viewOrder(row)">View</el-button>
            <el-button size="small" type="success" @click="printReceipt(row)">Print</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- Order Details Dialog -->
    <el-dialog v-model="dialogVisible" title="Order Details" width="500px">
      <div v-if="selectedOrder">
        <div class="mb-4">
          <strong>Order ID:</strong> {{ selectedOrder.id }}<br />
          <strong>Customer:</strong> {{ selectedOrder.customer }}<br />
          <strong>Status:</strong> <el-tag :type="statusType(selectedOrder.status)">{{ selectedOrder.status }}</el-tag><br />
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
const search = ref('');
const filterStatus = ref('');

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

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.value.toLowerCase()) ||
      order.id.toLowerCase().includes(search.value.toLowerCase());
    const matchesStatus = !filterStatus.value || order.status === filterStatus.value;
    return matchesSearch && matchesStatus;
  });
});

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
.el-table th, .el-table td {
  vertical-align: middle;
}
</style>
