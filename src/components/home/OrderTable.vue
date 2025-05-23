<template>
    <div>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <el-input v-model="search" placeholder="Search by customer or order ID" class="w-full md:w-72" clearable>
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
                        <el-tag :type="statusType(row.status)">{{ row.status.charAt(0).toUpperCase() +
                            row.status.slice(1) }}</el-tag>
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
                        <el-button size="small" @click="$emit('view-order', row)">View</el-button>
                        <el-button size="small" type="success" @click="$emit('print-receipt', row)">Print</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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

const props = defineProps<{
    orders: Order[];
    isLoading: boolean;
}>();

defineEmits(['view-order', 'print-receipt']);

const search = ref('');
const filterStatus = ref('');

const filteredOrders = computed(() => {
    return props.orders.filter((order: Order) => {
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
</script>

<style scoped>
.el-table th,
.el-table td {
    vertical-align: middle;
}
</style>
