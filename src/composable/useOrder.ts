import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getOrders, updateOrder as apiUpdateOrder } from './apiCalling';
import jsPDF from 'jspdf';

export interface OrderItem {
  foodId: {
    _id: string;
    foodName: string;
    price: number;
  } | null;
  quantity: number;
  _id: string;
}

export interface Order {
  _id: string;
  orderCode: string;
  webID: string;
  tableId: string | null;
  items: OrderItem[];
  pendingItems: OrderItem[];
  readyItems: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'ready' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid';
  paymentMethod: string;
  createdAt: string;
  __v: number;
}

export const useOrder = () => {
  const isLoading = ref(false);
  const orders = ref<Order[]>([]);
  const dialogVisible = ref(false);
  const selectedOrder = ref<Order | null>(null);
  const updateDialogVisible = ref(false);
  const editingOrder = ref<Order | null>(null);

  const fetchOrders = async () => {
    isLoading.value = true;
    try {
      const webID = localStorage.getItem('webID');
      const params = { webID };
      const response = await getOrders(params);
      if (response.statusCode === 200 && Array.isArray(response.orders)) {
        orders.value = response.orders;
      } else {
        ElMessage.error(response.message || 'Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      ElMessage.error('Failed to fetch orders.');
    } finally {
      isLoading.value = false;
    }
  };

  const updateOrder = async (order: Order & { itemIds?: string[] }) => {
    isLoading.value = true;
    try {
      const payload: Record<string, unknown> = {
        orderCode: order.orderCode,
        status: order.status,
        paymentStatus: order.paymentStatus,
      };
      if (order.itemIds) {
        payload.itemIds = order.itemIds;
      }
      const response = await apiUpdateOrder(payload);
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Order updated successfully!');
        await fetchOrders();
      } else {
        ElMessage.error(response.message || 'Failed to update order.');
      }
    } catch {
      ElMessage.error('Failed to update order.');
    } finally {
      isLoading.value = false;
    }
  };

  function getStatusType(status: string) {
    switch (status) {
      case 'pending': return 'warning';
      case 'ready': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return '';
    }
  }

  function getPaymentStatusType(status: string) {
    switch (status) {
      case 'pending': return 'warning';
      case 'paid': return 'success';
      default: return '';
    }
  }

  function viewOrder(order: Order) {
    const allItems = [
      ...(order.pendingItems || []),
      ...(order.readyItems || []),
      ...(order.items || [])
    ];
    selectedOrder.value = {
      ...order,
      items: allItems
    };
    dialogVisible.value = true;
  }

  function editOrder(order: Order) {
    editingOrder.value = { ...order };
    updateDialogVisible.value = true;
  }

  async function onUpdateOrder() {
    if (editingOrder.value) {
      await updateOrder(editingOrder.value as Order & { itemIds?: string[] });
      updateDialogVisible.value = false;
    }
  }

  // Assume you have a username variable (replace with your actual username source)
  const username = localStorage.getItem('username') || 'Restaurant';

  async function printOrder(dialogTotalPrice?: number) {
    if (!selectedOrder.value) return;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(username, 105, 32, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    // Display order code, date, table, and status in one block
    doc.text(`Order Code: ${selectedOrder.value.orderCode}`, 15, 42);
    doc.text(`Date: ${new Date(selectedOrder.value.createdAt).toLocaleString()}`, 15, 50);
    doc.text(`Table: ${selectedOrder.value.tableId ?? '-'}`, 15, 58);
    doc.text(`Status: ${selectedOrder.value.status.charAt(0).toUpperCase() + selectedOrder.value.status.slice(1)}`, 15, 66);

    // Separator
    doc.setLineWidth(0.5);
    doc.line(15, 72, 195, 72);

    // Table headers
    let y = 80;
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 15, y);
    doc.text('Qty', 90, y, { align: 'right' });
    doc.text('Unit', 120, y, { align: 'right' });
    doc.text('Subtotal', 195, y, { align: 'right' });

    y += 6;
    doc.setLineWidth(0.1);
    doc.line(15, y, 195, y);

    // Items
    doc.setFont('helvetica', 'normal');
    (selectedOrder.value.items || []).forEach(item => {
      y += 8;
      doc.text(item.foodId?.foodName || 'Unknown', 15, y);
      doc.text(String(item.quantity), 90, y, { align: 'right' });
      doc.text(`$${(item.foodId?.price ?? 0).toFixed(2)}`, 120, y, { align: 'right' });
      doc.text(`$${((item.foodId?.price ?? 0) * item.quantity).toFixed(2)}`, 195, y, { align: 'right' });
    });

    // Total
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Total:', 120, y, { align: 'right' });
    const total = dialogTotalPrice !== undefined ? dialogTotalPrice : selectedOrder.value.totalPrice ?? 0;
    doc.text(`$${(total).toFixed(2)}`, 195, y, { align: 'right' });

    // Footer
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Thank you for your order!', 105, y, { align: 'center' });
    y += 8;
    doc.setFontSize(10);
    doc.text('Contact: 012 345 678 | example@email.com', 105, y, { align: 'center' });

    doc.save(`Receipt-${selectedOrder.value.orderCode}.pdf`);
  }

  async function markItemAsReady(order: Order, item: OrderItem) {
    try {
      const payload = {
        orderCode: order.orderCode,
        itemId: item._id,
        status: 'ready'
      };
      const response = await apiUpdateOrder(payload);
      if (response.statusCode === 200) {
        ElMessage.success('Item marked as ready');
        await fetchOrders();
      } else {
        ElMessage.error(response.message || 'Failed to update item status');
      }
    } catch (error) {
      console.error('Update item status error:', error);
      ElMessage.error('Failed to update item status');
    }
  }

  async function markItemsAsReady(order: Order, items: OrderItem[]) {
    try {
      const payload = {
        orderCode: order.orderCode,
        itemIds: items.map(item => item._id),
        status: 'ready'
      };
      const response = await apiUpdateOrder(payload);
      if (response.statusCode === 200) {
        ElMessage.success('Items marked as ready');
        await fetchOrders();
      } else {
        ElMessage.error(response.message || 'Failed to update items status');
      }
    } catch (error) {
      console.error('Update items status error:', error);
      ElMessage.error('Failed to update items status');
    }
  }

  async function markItemAsCompleted(order: Order, item: OrderItem) {
    try {
      const payload = {
        orderCode: order.orderCode,
        itemId: item._id,
        status: 'completed'
      };
      const response = await apiUpdateOrder(payload);
      if (response.statusCode === 200) {
        ElMessage.success('Item marked as completed');
        await fetchOrders();
      } else {
        ElMessage.error(response.message || 'Failed to update item status');
      }
    } catch (error) {
      console.error('Update item status error:', error);
      ElMessage.error('Failed to update item status');
    }
  }

  async function markItemsAsCompleted(order: Order, items: OrderItem[]) {
    try {
      const payload = {
        orderCode: order.orderCode,
        itemIds: items.map(item => item._id),
        status: 'completed'
      };
      const response = await apiUpdateOrder(payload);
      if (response.statusCode === 200) {
        ElMessage.success('Items marked as completed');
        await fetchOrders();
      } else {
        ElMessage.error(response.message || 'Failed to update items status');
      }
    } catch (error) {
      console.error('Update items status error:', error);
      ElMessage.error('Failed to update items status');
    }
  }

  return {
    orders,
    fetchOrders,
    isLoading,
    updateOrder,
    getStatusType,
    getPaymentStatusType,
    dialogVisible,
    selectedOrder,
    updateDialogVisible,
    editingOrder,
    viewOrder,
    editOrder,
    onUpdateOrder,
    printOrder,
    markItemAsReady,
    markItemsAsReady,
    markItemAsCompleted,
    markItemsAsCompleted
  };
};
