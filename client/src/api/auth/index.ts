// Импортируем тип AxiosPromise для работы с промисами axios
import { AxiosPromise } from "axios";
// Импортируем объект Endpoints, который содержит URL-адреса API
import Endpoints from "../endpoints";
// Импортируем настроенный экземпляр axios для выполнения HTTP-запросов
import { axiosInstance } from "../instance";

// Функция для аутентификации пользователя
export const login = (params: {email: string, password: string}): AxiosPromise<{accessToken: string}> => {
  // Отправляем POST-запрос на URL для входа, передаем email и password
  return axiosInstance.post(Endpoints.AUTH.LOGIN, params);
}

// Функция для регистрации нового пользователя
export const register = (params: {username: string, email: string, password: string}): AxiosPromise<{accessToken: string}> => {
  // Отправляем POST-запрос на URL для регистрации, передаем username, email и password
  return axiosInstance.post(Endpoints.AUTH.REGISTER, params);
}