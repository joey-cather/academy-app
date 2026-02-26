'use client';

import { useMutation } from '@tanstack/react-query';
import { RegisterRequest, RegisterResponse } from '../types/type';
import { api } from '@/src/shared/lib/axios';
import { ErrorResponse } from '@/src/shared/types/type';
import { AxiosError } from 'axios';

const registerApi = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post('/register', data);
  return response.data;
};

export const useRegisterMutation = () => {
  return useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    RegisterRequest
  >({ mutationFn: registerApi });
};
