import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

let isRefreshing = false; 
let failedQueue = []; 

const processQueue = (error, token = null) => {
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
        failedQueue.push({resolve, reject});
      }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return axios(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/refresh', {
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
