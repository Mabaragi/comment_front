import { Link } from 'react-router-dom';
import type { Episode } from '@/types/episode';
import { Card, CardTitle } from '@/components/ui/card';

type Props = {
  episode: Episode;
  seriesId: string | number;
  className?: string;
};

/**
 * Renders a single clickable card for an episode.
 */
export default function EpisodeCard({ episode, seriesId, className }: Props) {
  return (
    <Link to={`/main/series/${seriesId}/episode/${episode.id}`}>
      <Card
        className={`flex flex-row items-center gap-4 p-3 rounded-none transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] hover:shadow-md cursor-pointer ${className}`}
      >
        <div className="flex-shrink-0">
          <img
            src={episode.image_src}
            alt={episode.name}
            className="w-[56px] h-[84px] object-cover rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base font-semibold mb-1 break-words">
            {episode.name}
          </CardTitle>
          {/* You can place additional information like description or date here */}
        </div>
      </Card>
    </Link>
  );
}
