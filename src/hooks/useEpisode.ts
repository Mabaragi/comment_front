import { useQuery } from '@tanstack/react-query';
import { apiGetEpisodes, apiGetEpisodesByUrl } from '../api/episode';
import type { EpisodeListResponse } from '../types/episode';
import type { EpisodeQueryParams } from '../types/api'; // 에피소드 쿼리 파라미터 타입을 가져옵니다.
import { useInfiniteQuery } from '@tanstack/react-query';

export function useEpisodeList({
  seriesId,
  limit,
  offset,
  fields,
}: EpisodeQueryParams) {
  return useQuery<EpisodeListResponse, Error>({
    queryKey: ['episode', seriesId, fields], // 쿼리 키는 시리즈 ID를 포함하여 고유하게 설정합니다. fields를 포함하여 필드 변경에 따라 캐시가 업데이트되도록 합니다.
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey; // 쿼리 키에서 시리즈 ID를 추출합니다.
      const queryParams = {
        seriesId: id as number, // 시리즈 ID를 쿼리 파라미터로 설정합니다.
        limit: limit || 10, // 기본값으로 10을 사용합니다.
        offset: offset || 0, // 기본값으로 0을 사용합니다.
        fields: fields || undefined, // 필드가 있을 경우에만 쿼리 파라미터로 추가합니다.
      };
      return apiGetEpisodes(queryParams); // API 호출을 통해 에피소드 목록을 가져옵니다.
    },
  }); // 시리즈 목록 가져오기. 'series'라는 키를 사용하여 캐시된 데이터를 관리합니다.
}

export function useEpisodeInfiniteList(seriesId: number, limit = 20) {
  return useInfiniteQuery({
    queryKey: ['episodes', seriesId],
    queryFn: ({ pageParam }) => {
      if (typeof pageParam === 'string') return apiGetEpisodesByUrl(pageParam); // 페이지 파라미터가 문자열인 경우 URL로 API 호출
      return apiGetEpisodes({ seriesId, limit, offset: 0 }); // 초기 요청
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    initialPageParam: null as string | null, // ✅ 필수
  });
}
