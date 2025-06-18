import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getOrders, updateOrder as apiUpdateOrder } from './apiCalling';

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
    selectedOrder.value = order;
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

  function printOrder() {
    if (!selectedOrder.value) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      ElMessage.error('Please allow popups to print receipts');
      return;
    }
    const receipt = `
      <html>
        <head>
          <title>Order Receipt - ${selectedOrder.value.orderCode}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; color: #222; margin: 0; padding: 0; }
            .receipt-container { max-width: 400px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); padding: 32px 24px; }
            .header { text-align: center; margin-bottom: 24px; }
            .header h2 { margin: 0 0 8px 0; font-size: 1.6rem; letter-spacing: 1px; }
            .header .order-code { font-size: 1rem; color: #888; margin-bottom: 4px; }
            .header .date { font-size: 0.95rem; color: #888; }
            .divider { border-bottom: 1px solid #e5e7eb; margin: 18px 0; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
            th, td { padding: 8px 4px; text-align: left; }
            th { border-bottom: 1.5px solid #e5e7eb; font-size: 1rem; color: #555; }
            td { font-size: 1rem; }
            .item-qty, .item-price, .item-subtotal { text-align: right; }
            .total-row td { font-weight: bold; font-size: 1.15rem; border-top: 2px solid #e5e7eb; padding-top: 10px; }
            .footer { text-align: center; margin-top: 28px; color: #666; font-size: 1rem; }
            .footer .thanks { font-size: 1.1rem; font-weight: 500; margin-bottom: 6px; }
            .footer .pay-method { color: #222; font-weight: 500; }
            @media print {
              body { background: #fff; }
              .receipt-container { box-shadow: none; margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <h2>Nhamey Restaurant</h2>
              <div class="order-code">Order Code: <b>${selectedOrder.value.orderCode}</b></div>
              <div class="date">${new Date(selectedOrder.value.createdAt).toLocaleString()}</div>
            </div>
            <div class="divider"></div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="item-qty">Qty</th>
                  <th class="item-price">Unit</th>
                  <th class="item-subtotal">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${selectedOrder.value.items.map(item => `
                  <tr>
                    <td>${item.foodId?.foodName || 'Unknown Item'}</td>
                    <td class="item-qty">${item.quantity}</td>
                    <td class="item-price">$${(item.foodId?.price || 0).toFixed(2)}</td>
                    <td class="item-subtotal">$${((item.foodId?.price || 0) * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr class="total-row">
                  <td colspan="3">Total</td>
                  <td class="item-subtotal">$${selectedOrder.value.totalPrice.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <div class="divider"></div>
            <div class="footer">
              <div class="thanks">Thank you for your order!</div>
              <div class="pay-method">Payment Method: ${selectedOrder.value.paymentMethod.replace('_', ' ')}</div>
            </div>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
              <button onclick="window.print()" style="padding: 8px 24px; border-radius: 6px; border: none; background: #409eff; color: #fff; font-size: 1rem; cursor: pointer;">Print Receipt</button>
            </div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(receipt);
    printWindow.document.close();
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
