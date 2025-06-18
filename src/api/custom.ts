import axiosInstance from '@/lib/axiosInstance';
import type { EpisodeListResponse } from '@/types/episode';

export async function apiGetEpisodesByUrl(url: string) {
  const response = await axiosInstance.get<EpisodeListResponse>(url);
  return response.data;
}
