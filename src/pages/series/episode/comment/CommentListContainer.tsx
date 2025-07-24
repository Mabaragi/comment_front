import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

import { useCommentData, type SortOption } from '@/hooks/useCommentData';
import { useCommentScroll } from '@/hooks/useCommentScroll';
import CommentHeader from '@/components/CommentHeader';
import CommentListItem from './CommentListItem';

export default function CommentListContainer() {
  const { episodeId } = useParams() as { episodeId: string };
  const [sort, setSort] = useState<SortOption>('latest');

  // 커스텀 훅으로 로직 분리
  const {
    comments,
    commentCount,
    fetchNextPage,
    hasNextPage,
    isLoading,
    emotionMutation,
  } = useCommentData(episodeId, sort);

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
