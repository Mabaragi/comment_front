import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Skeleton } from './ui/skeleton';

export function EpisodeCardSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="w-24 h-24 rounded" />
        <Skeleton className="w-[200px] h-20" />
      </CardHeader>
      <CardContent />
    </Card>
  );
}
