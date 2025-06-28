// 예시: EpisodeCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Episode } from '@/types/episode';

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={episode.image_src}
          alt={episode.name}
          className="w-24 h-24 object-cover rounded"
        />
        <CardTitle className="text-lg font-bold">{episode.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
