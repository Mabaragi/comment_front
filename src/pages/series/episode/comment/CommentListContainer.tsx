import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { useCommentInfiniteList } from '@/hooks/useComment';
import { useCrawlComment } from '@/hooks/useCrawler';
import CommentListItem from './CommentListItem';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'latest' | 'oldest' | 'popularity';

// 상수 정의
const SORT_MAP = {
  latest: '-created_at',
  popularity: '-like_count',
  oldest: 'created_at',
} as const;

const SORT_DISPLAY_MAP = {
  latest: '최신순',
  oldest: '등록순',
  popularity: '인기순',
} as const;

export default function CommentListContainer() {
  const navigate = useNavigate();
  const { episodeId: productIdString } = useParams() as { episodeId: string };

  // 상태 관리
  const [sort, setSort] = useState<SortOption>('latest');

  // 스크롤 관리
  const scrollIndexRef = useRef(0);
  const scrollStateKey = `comment-scroll-position-${productIdString}`;

  const handleSortChange = (value: SortOption) => {
    setSort(value);
  };

  // React Query 훅
  const {
    data: commentQueryResponse,
    fetchNextPage,
    hasNextPage,
    isLoading: isEpisodeLoading,
    refetch,
  } = useCommentInfiniteList(productIdString, {
    ordering: SORT_MAP[sort],
    include_count: true,
  });

  // 계산된 값들
  const commentCount = useMemo(
    () => commentQueryResponse?.pages[0]?.count || 0,
    [commentQueryResponse?.pages],
  );
  const comments = useMemo(
    () => commentQueryResponse?.pages.flatMap((page) => page.results) || [],
    [commentQueryResponse?.pages],
  );

  // 크롤링 뮤테이션
  const crawlCommentMutation = useCrawlComment({
    mutation: {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        navigate('/notfound', { replace: true });
      },
    },
  });

  // 초기 크롤링 시도
  useEffect(() => {
    if (!isEpisodeLoading && comments.length === 0) {
      crawlCommentMutation.mutate({
        productId: productIdString,
      });
    }
  }, [isEpisodeLoading, comments.length, productIdString]);

  // 스크롤 위치 관리
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

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between mx-2 flex-shrink-0">
        <div>댓글 개수: {commentCount}</div>
        <Select
          value={sort}
          onValueChange={(value) =>
            handleSortChange(value as 'latest' | 'popularity' | 'oldest')
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>{SORT_DISPLAY_MAP[sort]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="oldest">등록순</SelectItem>
            <SelectItem value="popularity">인기순</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-h-0">
        <VirtuosoGrid
          style={{ height: '100%', width: '100%' }}
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
      </div>
    </div>
  );
}
