import { AxiosError } from 'axios';
import { axiosInstance } from './axios';
import { ApiErrorResponse, ApiResponse } from '../types/type';

export const apiGet = async <T, P = unknown>(
  url: string,
  params?: P
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (axiosError.response) {
      throw new Error(
        axiosError.response.data?.message ??
          `API Error: ${axiosError.response.status}`,
        { cause: axiosError.response.status }
      );
    }

    throw new Error('Network error');
  }
};

export const apiPost = async <TResponse, TBody>(
  url: string,
  body: TBody
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<TResponse>>(
      url,
      body
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (axiosError.response) {
      throw new Error(
        axiosError.response.data?.message ??
          `API Error: ${axiosError.response.status}`
      );
    }

    throw new Error('Network error');
  }
};
