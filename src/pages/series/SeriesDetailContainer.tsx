import SeriesDetail from './SeriesDetail';
import { useParams } from 'react-router-dom';
import { useEpisodeInfiniteList } from '../../hooks/useEpisode';
// import { useCrawlerSeriesRead } from '@/api/generated';
import { useSeries } from '@/hooks/useCrawler';
import { useRef, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function SeriesDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-8 mb-8">
        <Skeleton className="w-40 h-40 rounded-lg" />
        <div className="flex-grow">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="w-full h-32 mb-4" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          데이터를 불러오는 중 오류가 발생했습니다.
        </AlertDescription>
      </Alert>
      <Button onClick={onRetry} className="mt-4">
        다시 시도
      </Button>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center text-gray-500">
      <p>{message}</p>
    </div>
  );
}

export default function SeriesDetailContainer() {
  const { seriesId: seriesIdString } = useParams() as { seriesId: string };

  const {
    data: series,
    isLoading: isSeriesLoading,
    isError: isSeriesError,
  } = useSeries(seriesIdString);
  const {
    data: episodeQueryResponse,
    fetchNextPage,
    hasNextPage,
    isLoading: isEpisodeLoading,
    isError: isEpisodeError,
  } = useEpisodeInfiniteList(seriesIdString);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isEpisodeLoading) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      },
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, fetchNextPage, isEpisodeLoading]);

  const episodes =
    episodeQueryResponse?.pages.flatMap((page) => page.results) || [];

  if (isSeriesLoading) {
    return <SeriesDetailSkeleton />;
  }

  if (isSeriesError || isEpisodeError) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  if (!series) {
    return <EmptyState message="시리즈를 찾을 수 없습니다." />;
  }

  return (
    <SeriesDetail
      series={series}
      episodes={episodes}
      observerRef={loadMoreRef}
      isEpisodeLoading={isEpisodeLoading}
    />
  );
}
