import React from 'react';
import type { Series } from '../../types/series';
import type { Episode } from '../../types/episode';
import EpisodeSelectorContainer from './episode/EpisodeSelectorContainer';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import EpisodeCard from '@/components/EpisodeCard';

type Props = {
  series: Series;
  episodes: Episode[];
  observerRef: React.RefObject<HTMLDivElement | null>;
  isEpisodeLoading: boolean;
};

export default function SeriesDetail({
  series,
  episodes,
  observerRef,
  isEpisodeLoading,
}: Props) {
  return (
    <div className="flex flex-1 w-full lg:max-w-350 flex-col p-6 bg-zinc-50 mx-auto">
      <div className="flex flex-col justify-center sm:flex-row sm:items-center gap-8 mb-8">
        <img
          src={series.image_src}
          alt={series.title}
          className="w-[384px] h-[549px] object-cover rounded-lg shadow-md mx-auto sm:mx-0"
        />
        <div className="w-full sm:w-auto sm:text-left flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 whitespace-normal break-words">
            {series.title}
          </h1>
          {/* 추가적인 시리즈 정보 (작가, 장르 등)가 있다면 여기에 표시 */}
        </div>
      </div>
      <EpisodeSelectorContainer seriesId={series.id} />
      <h2 className="text-2xl font-semibold mb-4 mt-6">에피소드 목록</h2>
      {/* Refactored Episode Grid:
          - The complex JavaScript rounding logic has been removed.
          - We apply rounding and overflow-hidden to the container for a clean look.
          - Each card gets borders on the bottom and right to create a grid line effect.
        */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l rounded-lg overflow-hidden">
        {episodes.map((ep) => {
          return <EpisodeCard episode={ep} seriesId={series.id} />;
        })}
        {isEpisodeLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="flex flex-row items-center gap-4 p-3 border-b rounded-none"
            >
              <div className="flex-shrink-0">
                <Skeleton className="w-[56px] h-[84px] rounded" />
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </Card>
          ))}
      </div>
      <div ref={observerRef} className="h-8" />
    </div>
  );
}
