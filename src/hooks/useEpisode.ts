import { useInfiniteQuery } from '@tanstack/react-query';
import type { EpisodeListResponse } from '@/types/episode';
import { getEpisodeList } from './useCrawler';
import type { EpisodeListParams } from '@/types/episode';
import { apiNextInfinteQuery } from '@/api/custom';

export function useEpisodeInfiniteList(
  seriesId: string,
  params?: EpisodeListParams,
) {
  return useInfiniteQuery<EpisodeListResponse>({
    queryKey: ['episodes', seriesId],
    queryFn: ({ pageParam }) => {
      if (typeof pageParam === 'string') {
        return apiNextInfinteQuery(pageParam);
      }
      return getEpisodeList(seriesId, params);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    initialPageParam: null as string | null, // ✅ 필수
  });
}
