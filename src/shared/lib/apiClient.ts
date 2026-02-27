import { AxiosError } from 'axios';
import { axiosInstance } from './axios';
import { ApiErrorResponse, ApiResponse } from '../types/type';

export const apiGet = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(url);
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

export const apiGetWithParams = async <TResponse, TParams>(
  url: string,
  params: TParams
): Promise<ApiResponse<TResponse>> => {
  const response = await axiosInstance.get<ApiResponse<TResponse>>(url, {
    params,
  });

  return response.data;
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
