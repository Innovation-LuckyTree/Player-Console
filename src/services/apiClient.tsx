import axios from 'axios';
import { useAuthStore } from '../shared/hooks/useAuthStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept request and inject token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    const token = user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
