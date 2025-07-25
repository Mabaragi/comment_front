import { useSeriesList, useCrawlSeries } from '@/hooks/useCrawler';
import SeriesList from './SeriesList';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ErrorResponse } from '@/api/schemas/errorResponse';

function SeriesListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="w-full h-48 mb-4" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}

export default function SeriesListContainer() {
  const {
    data: seriesQueryResponse,
    isLoading,
    isError,
    error,
    refetch: refetchSeriesList,
  } = useSeriesList({ page_size: 100 });

  const mutateCrawlSeries = useCrawlSeries<ErrorResponse>({
    mutation: {
      onSuccess: () => refetchSeriesList(),
      onError: (err) => console.error('Crawl series failed:', err),
    },
  });

  const series = seriesQueryResponse?.results;

  if (isLoading) {
    return <SeriesListSkeleton />;
  }
  if (isError) {
    return <ErrorState message={(error as Error).message} />;
  }
  return (
    <SeriesList series={series ?? []} mutateCrawlSeries={mutateCrawlSeries} />
  );
}
