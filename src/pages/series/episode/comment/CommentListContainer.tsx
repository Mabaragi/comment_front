import { useMatch, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

import { useCommentData, type SortOption } from '@/hooks/useCommentData';
import { useCommentScroll } from '@/hooks/useCommentScroll';
import CommentHeader from '@/components/CommentHeader';
import CommentListItem from './CommentListItem';
import { useSpamFilterStore } from '@/stores/spamFilterStore';

export default function CommentListContainer() {
  const { episodeId } = useParams() as { episodeId: string };
  const [sort, setSort] = useState<SortOption>('latest');

  // 커스텀 훅으로 로직 분리
  const {
    comments: rawComments,
    commentCount,
    fetchNextPage,
    hasNextPage,
    isLoading,
    emotionMutation,
  } = useCommentData(episodeId, sort);

  // 댓글 스팸 필터링
  const { filterOption } = useSpamFilterStore();
  const comments = useMemo(() => {
    // 필터링 없음
    if (filterOption === 'all') return rawComments;
    // 스팸 필터링
    if (filterOption === 'notSpam') {
      return rawComments.filter(
        (comment) => comment.is_spam !== null && !comment.is_spam,
      );
    }
    // 스팸 보여주기
    if (filterOption === 'spam') {
      return rawComments.filter((comment) => comment.is_spam);
    }
    // 처리되지 않은 댓글
    return rawComments.filter(
      (comment) => !comment.is_ai_processed || comment.is_spam === null,
    );
  }, [filterOption, rawComments]);

  const { initialTopMostItemIndex, handleRangeChanged } =
    useCommentScroll(episodeId);

  const handleEmotionAnalysisRequest = () => {
    emotionMutation.mutate({ episodeId });
  };

  return (
    <div className="flex flex-col flex-1">
      <CommentHeader
        comments={comments} // 첫 번째 댓글을 헤더에 전달
        commentCount={commentCount}
        sort={sort}
        onSortChange={setSort}
        onEmotionAnalysisRequest={handleEmotionAnalysisRequest}
        isAnalyzing={emotionMutation.isPending}
      />

      {/* 댓글 목록 */}
      <div className="flex-1 min-h-0">
        <VirtuosoGrid
          style={{ height: '100%', width: '100%' }}
          totalCount={comments.length}
          endReached={() => {
            if (hasNextPage && !isLoading) fetchNextPage();
          }}
          listClassName="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 items-stretch gap-1 bg-zinc-100"
          itemContent={(index) => <CommentListItem comment={comments[index]} />}
          initialTopMostItemIndex={initialTopMostItemIndex}
          rangeChanged={handleRangeChanged}
        />
      </div>
    </div>
  );
}
