import React from 'react';
import type { Series } from '../../types/series';
import type { Episode } from '../../types/episode';
import { Link } from 'react-router-dom';
import EpisodeSelectorContainer from './episode/EpisodeSelectorContainer';

type Props = {
  series: Series;
  episodes: Episode[];
  observerRef: React.RefObject<HTMLDivElement | null>;
};

export default function SeriesDetail({ series, episodes, observerRef }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <>
        <div className="flex items-center gap-8 mb-8">
          <img
            src={series.image_src}
            alt={series.title}
            className="w-40 h-40 object-cover rounded-lg shadow"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{series.title}</h1>
          </div>
        </div>
        <EpisodeSelectorContainer seriesId={series.id} />
        <h2 className="text-2xl font-semibold mb-4">에피소드 목록</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep) => (
            <Link
              to={`/main/series/${series.id}/episode/${ep.id}`}
              key={ep.id}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
            >
              <img
                src={ep.image_src}
                alt={ep.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-bold">{ep.name}</h3>
              </div>
            </Link>
          ))}
        </ul>
        <div ref={observerRef} className="h-8" />
      </>
    </div>
  );
}
