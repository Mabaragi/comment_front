import api from '.';
import type { Series } from '../types/series'; // 시리즈 타입을 가져옵니다.

export const apiGetSeries = async (): Promise<Series[]> => {
  const response = await api.get<Series[]>('/crawler/series/');
  return response.data;
};

export const apiGetSeriesById = async (seriesId: number): Promise<Series> => {
  const response = await api.get<Series>(`/crawler/series/${seriesId}/`);
  return response.data;
};

export const apiAddSeries = async (seriesId: number) => {
  const response = await api.post('/crawler/series/', { id: seriesId });
  return response.data;
};

export const apiDeleteSeries = async (seriesId: number) => {
  const response = await api.delete(`/crawler/series/${seriesId}/`);
  return response.data;
};
