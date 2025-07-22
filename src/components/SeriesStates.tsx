import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// 빈 상태 컴포넌트
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center text-gray-500">
      <p>{message}</p>
    </div>
  );
}

// 스켈레톤 컴포넌트
export function SeriesDetailSkeleton() {
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

// 에러 상태 컴포넌트
export function ErrorState({ onRetry }: { onRetry: () => void }) {
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
