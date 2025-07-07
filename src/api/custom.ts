import { axiosInstance } from './axiosInstance';

export const apiNextInfinteQuery = (url: string) => {
  // include_count=true를 include_count=false로 대체
  const newUrl = url.replace(/include_count=true/, 'include_count=false');
  return axiosInstance({
    method: 'GET',
    url: newUrl,
  });
};
