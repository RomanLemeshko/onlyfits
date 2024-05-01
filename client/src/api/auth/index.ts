
import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { LoginRequest, LoginResponse } from "./types";


export const login = (params: LoginRequest): AxiosPromise<LoginResponse> => axiosInstance.post(Endpoints.AUTH.LOGIN, params)