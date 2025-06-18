import api from '.';
import type { LoginCredentials } from '../types/auth';

export const apiLogin = async ({ username, password }: LoginCredentials) => {
  const response = await api.post('/token/', {
    username,
    password,
  });
  return response.data;
};
