import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getDashboardData } from './apiCalling';

// Define a basic structure for the dashboard data
// You should update this to match your actual API response
export interface DashboardData {
  totalSales: {
    value: number;
    change: string;
  };
  totalOrders: {
    value: number;
    change: string;
  };
  totalVisitors: number;
  revenueAnalytics: Record<string, number>;
  monthlyTarget: {
    achieved: number;
    target: number;
  };
  activeUsers: { country: string; percent: number }[];
  conversionSteps: { label: string; value: string; percent: number; change: number }[];
}

export function useDashboard() {
  const dashboardData = ref<DashboardData | null>(null);
  const isLoading = ref(true);

  const fetchDashboardData = async () => {
    isLoading.value = true;
    try {
      const webID = localStorage.getItem('webID');
      if (!webID) {
        throw new Error('webID not found in localStorage');
      }
      const params = { webID };
      const response = await getDashboardData(params);

      if (response && response.data) {
        dashboardData.value = response.data;
      } else {
        throw new Error("Invalid data structure received from API");
      }

    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      ElMessage.error('Failed to load dashboard data. The endpoint may be unavailable or returned invalid data.');
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchDashboardData();
  });

  return {
    dashboardData,
    isLoading,
    fetchDashboardData,
  };
}
