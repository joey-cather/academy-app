'use client';

import { useMutation } from '@tanstack/react-query';
import { ContactRequest, ContactResponse } from '../types/type';
import { api } from '@/src/shared/lib/axios';
import { ErrorResponse } from '@/src/shared/types/type';
import { AxiosError } from 'axios';

const contactApi = async (data: ContactRequest): Promise<ContactResponse> => {
  const response = await api.post('/contact', data);
  return response.data;
};

export const useContactMutation = () => {
  return useMutation<
    ContactResponse,
    AxiosError<ErrorResponse>,
    ContactRequest
  >({ mutationFn: contactApi });
};
