import { axiosInstance } from './axiosInstance';

export const apiGetEpisodesByUrl = (url: string) => {
  return axiosInstance({
    method: 'GET',
    url: url,
  });
};
