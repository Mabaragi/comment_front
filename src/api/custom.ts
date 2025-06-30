import { axiosInstance } from './axiosInstance';

export const apiNextInfinteQuery = (url: string) => {
  return axiosInstance({
    method: 'GET',
    url: url,
  });
};
