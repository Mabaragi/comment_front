import { useParams } from 'react-router-dom';
import CommentListItem from './CommentListItem';
import { useCommentInfiniteList } from '@/hooks/useComment';
import { VirtuosoGrid } from 'react-virtuoso';
import { useEffect, useRef } from 'react';
import { useCrawlComment } from '@/hooks/useCrawler';

export default function CommentListContainer() {
  const { episodeId: productIdString } = useParams() as { episodeId: string };
  const scrollIndexRef = useRef(0);
  const scrollStateKey = `comment-scroll-position-${productIdString}`;

  const {
    data: commentQueryResponse,
    fetchNextPage,
    hasNextPage,
    isLoading: isEpisodeLoading,
    isError: isEpisodeError,
    refetch,
  } = useCommentInfiniteList(productIdString);

  const comments =
    commentQueryResponse?.pages.flatMap((page) => page.results) || [];

  if (!comments) {
    const crawlCommentMutation = useCrawlComment({
      mutation: {
        onSuccess: () => {
          refetch();
        },
      },
    });
    crawlCommentMutation.mutate({
      productId: productIdString,
    });
  }

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 스크롤 위치 저장
    return () => {
      sessionStorage.setItem(scrollStateKey, String(scrollIndexRef.current));
    };
  }, [scrollStateKey]);

  const initialTopMostItemIndex =
    Number(sessionStorage.getItem(scrollStateKey)) || 0;

  return (
    <VirtuosoGrid
      style={{ height: '89vh', width: '100%' }}
      totalCount={comments.length}
      endReached={() => {
        if (hasNextPage && !isEpisodeLoading) fetchNextPage();
      }}
      listClassName="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 items-stretch gap-1 bg-zinc-100"
      itemContent={(index) => <CommentListItem comment={comments[index]} />}
      initialTopMostItemIndex={initialTopMostItemIndex}
      rangeChanged={({ startIndex }) => {
        console.log('rangeChanged', startIndex);
        scrollIndexRef.current = startIndex;
      }}
    />
  );
}
