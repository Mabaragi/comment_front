import { useInfiniteQuery } from '@tanstack/react-query';
import type { CommentListResponse } from '@/types/comments';
import type { CommentListParams } from '@/types/comments';
import { getCommentList } from './useCrawler';
import { apiNextInfinteQuery } from '@/api/custom';

export function useCommentInfiniteList(
  productId: string,
  params?: CommentListParams,
) {
  return useInfiniteQuery<CommentListResponse>({
    queryKey: ['comments', productId, params], // params 추가
    queryFn: ({ pageParam }) => {
      if (typeof pageParam === 'string') {
        return apiNextInfinteQuery(pageParam);
      }
      return getCommentList(productId, params);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    initialPageParam: null as string | null,
  });
}
