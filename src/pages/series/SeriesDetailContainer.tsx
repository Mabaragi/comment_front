import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useSeriesData } from '@/hooks/useSeriesData';
import { useInfiniteScroll } from '@/hooks/hooks';
import {
  EmptyState,
  SeriesDetailSkeleton,
  ErrorState,
} from '@/components/SeriesStates';
import SeriesDetail from './SeriesDetail';

export default function SeriesDetailContainer() {
  const { seriesId: seriesIdString } = useParams() as { seriesId: string };

  // 커스텀 훅으로 로직 분리
  const {
    series,
    isSeriesLoading,
    isSeriesError,
    seriesError,
    episodes,
    fetchNextPage,
    hasNextPage,
    isEpisodeLoading,
    hasError,
    navigate,
  } = useSeriesData(seriesIdString);

  // 무한 스크롤 관리
  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isEpisodeLoading,
  });

  // 404 에러 처리
  useEffect(() => {
    if (isSeriesError && seriesError && (seriesError as any).status === 404) {
      navigate('/notfound', { replace: true });
    }
  }, [isSeriesError, seriesError, navigate]);

  // 로딩 상태
  if (isSeriesLoading) {
    return <SeriesDetailSkeleton />;
  }

  // 에러 상태
  if (hasError) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  // 빈 상태
  if (!series) {
    return <EmptyState message="시리즈를 찾을 수 없습니다." />;
  }

  // 정상 렌더링
  return (
    <SeriesDetail
      series={series}
      episodes={episodes}
      observerRef={loadMoreRef}
      isEpisodeLoading={isEpisodeLoading}
    />
  );
}
