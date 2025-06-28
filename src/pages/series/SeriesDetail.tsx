import React from 'react';
import type { Series } from '../../types/series';
import type { Episode } from '../../types/episode';
import { Link } from 'react-router-dom';
import EpisodeSelectorContainer from './episode/EpisodeSelectorContainer';
import { EpisodeCard } from '@/components/EpisodeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { EpisodeCardSkeleton } from '@/components/EpisodeCardSkeleton';

type Props = {
  series: Series;
  isSeriesLoading: boolean;
  isEpisodeLoading: boolean;
  episodes: Episode[];
  observerRef: React.RefObject<HTMLDivElement | null>;
};

export default function SeriesDetail({
  series,
  episodes,
  observerRef,
  isSeriesLoading,
  isEpisodeLoading,
}: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-8 mb-8">
        {isSeriesLoading ? (
          <>
            <Skeleton className="w-40 h-40 rounded-lg shadow" />
            <Skeleton className="w-[400px] h-10 rounded-lg" />
          </>
        ) : (
          <>
            <img
              src={series.image_src}
              alt={series.title}
              className="w-40 h-40 object-cover rounded-lg shadow"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{series.title}</h1>
            </div>
          </>
        )}
      </div>
      <EpisodeSelectorContainer seriesId={series.id} />
      <h2 className="text-2xl font-semibold mb-4">에피소드 목록</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((ep) => (
          <li key={ep.id}>
            <Link to={`/main/series/${series.id}/episode/${ep.id}`}>
              {isEpisodeLoading ? (
                <EpisodeCardSkeleton />
              ) : (
                <EpisodeCard episode={ep} />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div ref={observerRef} className="h-8" />
    </div>
  );
}
