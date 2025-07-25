import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeries } from '@/hooks/useCrawler';
import { useEpisodeInfiniteList } from '@/hooks/useEpisode';

export function useSeriesData(seriesId: string) {
  const navigate = useNavigate();

  // 시리즈 데이터 쿼리
  const seriesQuery = useSeries(seriesId);

  // 에피소드 데이터 쿼리
  const episodeQuery = useEpisodeInfiniteList(seriesId);

  

  // 에피소드 목록 계산
  const episodes = useMemo(
    () => episodeQuery.data?.pages.flatMap((page) => page.results) || [],
    [episodeQuery.data?.pages],
  );

  return {
    // 시리즈 데이터
    series: seriesQuery.data,
    isSeriesLoading: seriesQuery.isLoading,
    isSeriesError: seriesQuery.isError,
    seriesError: seriesQuery.error,

    // 에피소드 데이터
    episodes,
    fetchNextPage: episodeQuery.fetchNextPage,
    hasNextPage: episodeQuery.hasNextPage,
    isEpisodeLoading: episodeQuery.isLoading,
    isEpisodeError: episodeQuery.isError,

    // 전체 에러 상태
    hasError: seriesQuery.isError || episodeQuery.isError,

    // 네비게이션 함수
    navigate,
  };
}
