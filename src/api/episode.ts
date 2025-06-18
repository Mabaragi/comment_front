import api from '.';
import type { EpisodeListResponse } from '../types/episode'; // 시리즈 타입을 가져옵니다.
import type { EpisodeQueryParams } from '../types/api'; // 에피소드 쿼리 파라미터 타입을 가져옵니다.

export const apiGetEpisodes = async ({
  seriesId,
  limit,
  offset,
  fields,
}: EpisodeQueryParams) => {
  const { data } = await api.get<EpisodeListResponse>(
    `crawler/series/${seriesId}/episode/`,
    {
      params: {
        limit,
        offset,
        fields: fields?.join(',') || undefined, // 필드가 있을 경우에만 쿼리 파라미터로 추가
      },
    },
  );
  return data;
};

export const apiGetEpisodesByUrl = async (url: string) => {
  const { data } = await api.get<EpisodeListResponse>(url);
  return data;
};
