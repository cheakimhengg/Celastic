<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10" v-loading="isLoading">
    <!-- Header Row -->
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
        <el-button @click="showFilter = !showFilter"
          class="bg-white border border-gray-200 hover:bg-gray-50 transition">
          <el-icon>
            <Filter />
          </el-icon>
          <span class="ml-1">Filter</span>
        </el-button>
      </div>
    </div>

    <!-- Filter Dropdown -->
    <el-card v-if="showFilter" class="mb-6 p-4 max-w-xl">
      <div class="flex flex-col md:flex-row gap-4 items-center w-full">
        <el-select v-model="filterStatus" placeholder="Status" clearable class="w-full">
          <el-option label="Pending" value="pending" />
          <el-option label="Ready" value="ready" />
          <el-option label="Cancelled" value="cancelled" />
          <el-option label="Completed" value="completed" />
        </el-select>
        <el-button @click="resetFilters" class="ml-auto">Reset</el-button>
      </div>
    </el-card>

    <!-- Order Table -->
    <el-card class="p-0">
      <el-table :data="filteredOrders" stripe class="w-full" height="auto">
        <el-table-column prop="orderCode" label="Order Code" width="140">
          <template #default="{ row }">
            <span class="font-medium text-gray-900">{{ row.orderCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tableId" label="Table" width="100" align="center">
          <template #default="{ row }">
            <span>{{ row.tableId || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Items" min-width="250">
          <template #default="{ row }">
            <div>
              <div v-for="item in row.displayItems" :key="item._id" style="display: flex; align-items: center; gap: 8px;">
                <span style="font-weight: 500;">{{ item.foodId?.foodName || 'Unknown Item' }}</span>
                <el-tag size="small" type="info" effect="plain" round>x{{ item.quantity }}</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="Total" width="120" align="right">
          <template #default="{ row }">
            <span class="font-medium text-gray-900">${{ row.totalPrice.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="120" align="center">
          <template #default="{ row }">
            <el-tag size="small" :type="row.displayType === 'pending' ? 'warning' : row.displayType === 'ready' ? 'primary' : 'info'" effect="plain">
              {{ row.displayType.charAt(0).toUpperCase() + row.displayType.slice(1) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="paymentStatus" label="Payment" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getPaymentStatusType(row.paymentStatus)" effect="plain">
              {{ row.paymentStatus.charAt(0).toUpperCase() + row.paymentStatus.slice(1) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Date" width="180" align="center">
          <template #default="{ row }">
            <span class="text-sm text-gray-600">{{ new Date(row.createdAt).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="120" align="center">
          <template #default="{ row }">
            <div class="flex items-center justify-center gap-2">
              <el-button size="small" @click="viewOrder(row)" circle><el-icon><View /></el-icon></el-button>
              <el-button size="small" type="primary" @click="editOrder(row)" circle><el-icon><Edit /></el-icon></el-button>
            </div>
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
          <div class="space-y-4">
            <!-- Pending Items -->
            <div v-if="selectedOrder.pendingItems?.length > 0">
              <h4 class="text-sm font-medium text-gray-500 mb-2">Pending Items</h4>
              <div class="space-y-2">
                <div v-for="item in selectedOrder.pendingItems" :key="item._id" class="flex justify-between items-center">
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

            <!-- Ready Items -->
            <div v-if="selectedOrder.readyItems?.length > 0">
              <h4 class="text-sm font-medium text-gray-500 mb-2">Ready Items</h4>
              <div class="space-y-2">
                <div v-for="item in selectedOrder.readyItems" :key="item._id" class="flex justify-between items-center">
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

            <!-- Regular Items -->
            <div v-if="!selectedOrder.pendingItems?.length && !selectedOrder.readyItems?.length">
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

    <!-- Update Order Dialog -->
    <el-dialog v-model="updateDialogVisible" title="Update Order" width="400px">
      <el-form :model="editingOrder" v-if="editingOrder">
        <el-form-item label="Status">
          <el-select v-model="dialogStatus">
            <el-option label="Pending" value="pending" />
            <el-option label="Ready" value="ready" />
            <el-option label="Cancelled" value="cancelled" />
            <el-option label="Completed" value="completed" />
          </el-select>
        </el-form-item>
        <el-form-item label="Payment Status">
          <el-select v-model="editingOrder.paymentStatus">
            <el-option label="Pending" value="pending" />
            <el-option label="Paid" value="paid" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="updateDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onUpdateOrder">Update</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Edit, View, Filter } from '@element-plus/icons-vue';
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
const showFilter = ref(false);

const resetFilters = () => {
  filterStatus.value = '';
};

// Computed property for dialog status
const dialogStatus = computed({
  get: () => {
    if (editingOrder.value) {
      const order = editingOrder.value as DisplayOrder;
      return order.displayStatus || order.status;
    }
    return '';
  },
  set: (value: string) => {
    if (editingOrder.value) {
      const order = editingOrder.value as DisplayOrder;
      order.displayStatus = value;
      order.status = value as 'pending' | 'ready' | 'completed' | 'cancelled';
    }
  }
});

interface OrderItem {
  _id: string;
  foodId: {
    _id: string;
    foodName: string;
    price: number;
  } | null;
  quantity: number;
  totalPrice?: number;
}

interface Order {
  _id: string;
  orderCode: string;
  webID: string;
  tableId: string | null;
  items: OrderItem[];
  pendingItems: OrderItem[];
  readyItems: OrderItem[];
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalPrice: number;
  createdAt: string;
  __v: number;
}

interface DisplayOrder extends Order {
  displayItems: OrderItem[];
  displayStatus: string;
  displayType: 'pending' | 'ready' | 'regular';
  itemIds: string[];
  tableId: string;
}

const filteredOrders = computed(() => {
  const orderList = orders.value;
  const expandedOrders: DisplayOrder[] = [];

  orderList.forEach((order: Order) => {
    const matchesSearch = order.orderCode.toLowerCase().includes(search.value.toLowerCase());
    const matchesStatus = !filterStatus.value || order.status === filterStatus.value;

    if (matchesSearch && matchesStatus) {
      const tableIdStr = order.tableId ? String(order.tableId) : '-';

      if (order.pendingItems && order.pendingItems.length > 0) {
        const displayItems = order.pendingItems;
        const totalPrice = displayItems.reduce((sum, item) => sum + (item.totalPrice || ((item.foodId?.price || 0) * item.quantity)), 0);
        expandedOrders.push({
          ...order,
          tableId: tableIdStr,
          displayItems,
          displayStatus: order.status,
          displayType: 'pending',
          itemIds: displayItems.map(item => item._id),
          totalPrice
        });
      }

      if (order.readyItems && order.readyItems.length > 0) {
        const displayItems = order.readyItems;
        const totalPrice = displayItems.reduce((sum, item) => sum + (item.totalPrice || ((item.foodId?.price || 0) * item.quantity)), 0);
        expandedOrders.push({
          ...order,
          tableId: tableIdStr,
          displayItems,
          displayStatus: order.status,
          displayType: 'ready',
          itemIds: displayItems.map(item => item._id),
          totalPrice
        });
      }

      if ((!order.pendingItems || order.pendingItems.length === 0) &&
          (!order.readyItems || order.readyItems.length === 0)) {
        const displayItems = order.items;
        const totalPrice = displayItems.reduce((sum, item) => sum + (item.totalPrice || ((item.foodId?.price || 0) * item.quantity)), 0);
        expandedOrders.push({
          ...order,
          tableId: tableIdStr,
          displayItems,
          displayStatus: order.status,
          displayType: 'regular',
          itemIds: displayItems.map(item => item._id),
          totalPrice
        });
      }
    }
  });

  return expandedOrders;
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

:deep(.el-button) {
  box-shadow: none !important;
  transform: none !important;
}

:deep(.el-button:hover) {
  box-shadow: none !important;
  transform: none !important;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
  border: 1px solid #e5e7eb !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(var(--el-color-primary-rgb), 0.2) !important;
  border-color: var(--el-color-primary) !important;
}

:deep(.el-select .el-input__wrapper) {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
  border: 1px solid #e5e7eb !important;
}
</style>
