import { ref, onMounted, onUnmounted } from 'vue';
import { getPendingOrderCount } from './apiCalling';

export function usePendingOrderCount() {
  const pendingCount = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  let intervalId: number | null = null;

  const fetchPendingCount = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const webID = localStorage.getItem('webID');
      const params = { webID };
      const response = await getPendingOrderCount(params);
      pendingCount.value = response.pendingOrderCount || 0;
    } catch (err) {
      console.error('Error fetching pending order count:', err);
      error.value = 'Failed to fetch pending orders';
      pendingCount.value = 0;
    } finally {
      isLoading.value = false;
    }
  };

  const startAutoRefresh = () => {
    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Set interval to refresh every 10 minutes (600,000 ms)
    intervalId = setInterval(fetchPendingCount, 600000);
  };

  const stopAutoRefresh = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  onMounted(() => {
    // Fetch once on mount
    fetchPendingCount();
    // Start auto-refresh
    startAutoRefresh();
  });

  onUnmounted(() => {
    stopAutoRefresh();
  });

  return {
    pendingCount,
    isLoading,
    error,
    fetchPendingCount,
    startAutoRefresh,
    stopAutoRefresh
  };
}
