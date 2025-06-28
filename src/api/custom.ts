import { axiosInstance } from '.';

export const apiGetEpisodesByUrl = (url: string) => {
  return axiosInstance({
    method: 'GET',
    url: url,
  });
};
