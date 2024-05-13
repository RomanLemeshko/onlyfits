import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_URL}/auth`,
  withCredentials: true
});

type QueueEntry = {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError | null) => void;
};

let isRefreshing = false;
let failedQueue: QueueEntry[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return axios(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      axios.post(`${import.meta.env.VITE_HOST_URL}/auth/refresh`, {
        refreshToken: localStorage.getItem('refreshToken')
      }).then(response => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
          processQueue(null, response.data.accessToken);
          resolve(axios(originalRequest));
        }
      }).catch(err => {
        processQueue(err, null);
        reject(err);
      }).finally(() => {
        isRefreshing = false;
      });
    });
  }

  return Promise.reject(error);
});

export default axiosInstance;
