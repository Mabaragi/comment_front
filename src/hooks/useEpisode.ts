import { useQuery } from '@tanstack/react-query';
import type { EpisodeListResponse } from '../types/episode';
import type { EpisodeQueryParams } from '../types/api'; // 에피소드 쿼리 파라미터 타입을 가져옵니다.
import { useInfiniteQuery } from '@tanstack/react-query';
import { CrawlerService } from '../api/services/CrawlerService';
import { apiGetEpisodesByUrl } from '@/api/custom';

export function useEpisodeList({
  seriesId,
  limit = 10,
  offset = 0,
  fields,
}: EpisodeQueryParams) {
  return useQuery<EpisodeListResponse, Error>({
    queryKey: ['episode', { seriesId, limit, offset, fields }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, EpisodeQueryParams];
      return CrawlerService.crawlerSeriesEpisodeList(
        params.seriesId,
        params.limit ?? 10,
        params.offset ?? 0,
        params.fields,
      );
    },
  });
}

export function useEpisodeInfiniteList(seriesId: string, limit = 20) {
  return useInfiniteQuery<EpisodeListResponse>({
    queryKey: ['episodes', seriesId],
    queryFn: ({ pageParam }) => {
      if (typeof pageParam === 'string') {
        return apiGetEpisodesByUrl(pageParam);
      }
      return CrawlerService.crawlerSeriesEpisodeList(seriesId, limit, 0);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    initialPageParam: null as string | null, // ✅ 필수
  });
}
