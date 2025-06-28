import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/api/axiosInstance';
import type { CrawlerSeriesEpisodeList200 } from '@/api/schemas';
import { crawlerSeriesEpisodeList } from '@/api/endpoints';
import type { CrawlerSeriesListParams } from '@/api/schemas';

export function useEpisodeInfiniteList(
  seriesId: string,
  params?: CrawlerSeriesListParams,
) {
  return useInfiniteQuery<CrawlerSeriesEpisodeList200>({
    queryKey: ['episodes', seriesId],
    queryFn: ({ pageParam }) => {
      if (typeof pageParam === 'string') {
        return axiosInstance<CrawlerSeriesEpisodeList200>({
          method: 'GET',
          url: pageParam,
        });
      }
      return crawlerSeriesEpisodeList(seriesId, params);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    initialPageParam: null as string | null, // ✅ 필수
  });
}
