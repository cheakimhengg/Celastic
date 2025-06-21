import { ref, onMounted, onUnmounted, watch } from 'vue';
import { getPendingOrderCount } from './apiCalling';

export function usePendingOrderCount() {
  const pendingCount = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  let refreshIntervalId: number | null = null;
  let soundIntervalId: number | null = null;
  let notificationSound: HTMLAudioElement | null = null;
  const canPlaySound = ref(false);

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

  const playNotificationSound = () => {
    if (notificationSound) {
      notificationSound.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const stopSoundInterval = () => {
    if (soundIntervalId) {
      clearInterval(soundIntervalId);
      soundIntervalId = null;
    }
  };

  const startSoundInterval = () => {
    stopSoundInterval();
    if (canPlaySound.value && pendingCount.value > 0) {
      playNotificationSound();
      soundIntervalId = setInterval(playNotificationSound, 20000); // Play every 20 seconds
    }
  };

  watch(pendingCount, (newCount) => {
    if (newCount > 0) {
      if (canPlaySound.value) {
        startSoundInterval();
      }
    } else {
      stopSoundInterval();
    }
  });

  const handleFirstInteraction = () => {
    if (!canPlaySound.value) {
      canPlaySound.value = true;
      if (pendingCount.value > 0) {
        startSoundInterval();
      }
    }
  };

  const startAutoRefresh = () => {
    stopAutoRefresh();
    refreshIntervalId = setInterval(fetchPendingCount, 600000); // Refresh every 10 minutes
  };

  const stopAutoRefresh = () => {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      refreshIntervalId = null;
    }
  };

  onMounted(() => {
    notificationSound = new Audio('https://www.orangefreesounds.com/wp-content/uploads/2020/04/Alert-notification.mp3');
    notificationSound.load();

    fetchPendingCount();
    startAutoRefresh();

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
  });

  onUnmounted(() => {
    stopAutoRefresh();
    stopSoundInterval();
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
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
