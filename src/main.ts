import './assets/styles/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';

// Register Chart.js components for vue-chartjs
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const app = createApp(App);

app.use(ElementPlus);
app.use(router);

app.mount('#app');
