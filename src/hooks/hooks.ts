import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}

export function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isLoading,
}: UseInfiniteScrollProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
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
  }, [hasNextPage, fetchNextPage, isLoading]);

  return loadMoreRef;
}
