import SeriesDetail from './SeriesDetail';
import { useParams } from 'react-router-dom';
import { useEpisodeInfiniteList } from '../../hooks/useEpisode';
// import { useCrawlerSeriesRead } from '@/api/generated';
import { useSeries } from '@/hooks/useCrawler';
import { useRef, useEffect } from 'react';

export default function SeriesDetailContainer() {
  const { seriesId: seriesIdString } = useParams() as { seriesId: string };
  // const seriesId = parseInt(seriesIdString);

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

  const loadMoreRef = useRef<HTMLDivElement | null>(null); // ✅ DOM 요소를 위한 ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
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
  }, [hasNextPage, fetchNextPage]);

  const episodes =
    episodeQueryResponse?.pages.flatMap((page) => page.results) || [];

  if (isEpisodeLoading || isSeriesLoading) {
    return <p>로딩 중...</p>;
  }
  if (isEpisodeError || isSeriesError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }
  if (!series) {
    return <p>시리즈를 찾을 수 없습니다.</p>;
  }
  if (!episodes) {
    return <p>에피소드를 찾을 수 없습니다.</p>;
  }
  return (
    <SeriesDetail
      series={series}
      episodes={episodes}
      observerRef={loadMoreRef}
    />
  );
}
