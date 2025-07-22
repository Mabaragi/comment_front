import { useEffect, useRef, useMemo } from 'react';

export function useCommentScroll(episodeId: string) {
  const scrollIndexRef = useRef(0);
  const scrollStateKey = `comment-scroll-position-${episodeId}`;

  // 스크롤 위치 저장
  useEffect(() => {
    return () => {
      sessionStorage.setItem(scrollStateKey, String(scrollIndexRef.current));
    };
  }, [scrollStateKey]);

  // 스크롤 복원
  const initialTopMostItemIndex = useMemo(
    () => Number(sessionStorage.getItem(scrollStateKey)) || 0,
    [scrollStateKey],
  );

  const handleRangeChanged = ({ startIndex }: { startIndex: number }) => {
    console.log('rangeChanged', startIndex);
    scrollIndexRef.current = startIndex;
  };

  return {
    initialTopMostItemIndex,
    handleRangeChanged,
  };
}
