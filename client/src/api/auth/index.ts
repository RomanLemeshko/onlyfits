import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";

export const login = (params: {email: string, password: string}): AxiosPromise<{accessToken: string}> => {
  return axiosInstance.post(Endpoints.AUTH.LOGIN, params);
}

export const register = (params: {username: string, email: string, password: string}): AxiosPromise<{accessToken: string}> => {
  return axiosInstance.post(Endpoints.AUTH.REGISTER, params);
}
