import axios from 'axios';

// Создание экземпляра axios с базовыми настройками
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/auth', // Базовый URL для всех запросов
  withCredentials: true // Отправлять куки с запросами на другие домены
});

let isRefreshing = false; // Флаг, показывающий, идет ли в данный момент обновление токена
let failedQueue = []; // Очередь запросов, которые необходимо повторить после обновления токена

// Функция для обработки очереди запросов после обновления токена
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error); // Отклоняем промис, если была ошибка
    } else {
      prom.resolve(token); // Разрешаем промис с новым токеном
    }
  });
  failedQueue = []; // Очищаем очередь после обработки
};

// Добавление перехватчика запросов
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken'); // Получение токена из localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Добавление токена в заголовки
  }
  return config;
}, error => Promise.reject(error)); // Возвращаем ошибку, если она произошла

// Добавление перехватчика ответов
axiosInstance.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  // Проверка на ошибку авторизации и наличие флага повторного запроса
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      // Если токен уже обновляется, добавляем запрос в очередь
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return axios(originalRequest); // Повторный запрос с новым токеном
      }).catch(err => Promise.reject(err));
    }

    originalRequest._retry = true; // Устанавливаем флаг повторного запроса
    isRefreshing = true; // Устанавливаем флаг обновления токена

    // Обновление токена
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken') // Отправляем refresh токен на сервер
      }).then(response => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken); // Обновляем access токен в localStorage
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
          processQueue(null, response.data.accessToken); // Обработка всех ожидаемых запросов с новым токеном
          resolve(axios(originalRequest)); // Повторный запрос с новым токеном
        }
      }).catch(err => {
        processQueue(err, null); // Обработка ошибок для ожидающих запросов
        reject(err);
      }).finally(() => {
        isRefreshing = false; // Снимаем флаг обновления токена
      });
    });
  }

  return Promise.reject(error); // Возвращаем ошибку, если условие не выполнено
});

export default axiosInstance;