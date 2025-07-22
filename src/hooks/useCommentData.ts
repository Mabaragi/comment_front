import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommentInfiniteList } from '@/hooks/useComment';
import {
  useCrawlComment,
  useEmotionAnalysisPartialUpdate,
} from '@/hooks/useCrawler';

type SortOption = 'latest' | 'oldest' | 'popularity';

// 정렬 옵션 상수
const SORT_OPTIONS = {
  latest: {
    value: '-created_at',
    label: '최신순',
  },
  oldest: {
    value: 'created_at',
    label: '등록순',
  },
  popularity: {
    value: '-like_count',
    label: '인기순',
  },
} as const;

export function useCommentData(episodeId: string, sort: SortOption) {
  const navigate = useNavigate();

  // 댓글 데이터 쿼리
  const commentQuery = useCommentInfiniteList(episodeId, {
    ordering: SORT_OPTIONS[sort].value,
    include_count: true,
  });

  // 크롤링 뮤테이션
  const crawlMutation = useCrawlComment({
    mutation: {
      onSuccess: () => commentQuery.refetch(),
      onError: () => navigate('/notfound', { replace: true }),
    },
  });

  // 감정 분석 뮤테이션
  const emotionMutation = useEmotionAnalysisPartialUpdate({
    mutation: {
      onSuccess: () => commentQuery.refetch(),
    },
  });

  // 계산된 값들
  const commentCount = useMemo(
    () => commentQuery.data?.pages[0]?.count || 0,
    [commentQuery.data?.pages],
  );

  const comments = useMemo(
    () => commentQuery.data?.pages.flatMap((page) => page.results) || [],
    [commentQuery.data?.pages],
  );

  // 초기 크롤링 로직
  useEffect(() => {
    if (!commentQuery.isLoading && comments.length === 0) {
      crawlMutation.mutate({ productId: episodeId });
    }
  }, [commentQuery.isLoading, comments.length, episodeId]);

  return {
    ...commentQuery,
    crawlMutation,
    emotionMutation,
    commentCount,
    comments,
  };
}

export { SORT_OPTIONS };
export type { SortOption };
