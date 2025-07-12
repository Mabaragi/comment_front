import { useParams } from 'react-router-dom';
import CommentListItem from './CommentListItem';
import { useCommentInfiniteList } from '@/hooks/useComment';
import { VirtuosoGrid } from 'react-virtuoso';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useCrawlComment } from '@/hooks/useCrawler';
import { useNavigate } from 'react-router-dom';

// select ui components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CommentListContainer() {
  const [sort, setSort] = useState<'latest' | 'oldest' | 'popularity'>(
    'latest',
  );

  const { episodeId: productIdString } = useParams() as { episodeId: string };
  const scrollIndexRef = useRef(0);
  const scrollStateKey = `comment-scroll-position-${productIdString}`;

  const handleSortChange = (value: 'latest' | 'oldest' | 'popularity') => {
    setSort(value);
  };

  const sortMap = {
    latest: '-created_at',
    popularity: '-like_count',
    oldest: 'created_at',
  } as const;

  const sortDisplayMap = {
    latest: '최신순',
    oldest: '등록순',
    popularity: '인기순',
  };

  const {
    data: commentQueryResponse,
    fetchNextPage,
    hasNextPage,
    isLoading: isEpisodeLoading,
    isError: isEpisodeError,
    refetch,
  } = useCommentInfiniteList(productIdString, {
    ordering: sortMap[sort],
    include_count: true,
  });

  const commentCount = useMemo(
    () => commentQueryResponse?.pages[0]?.count || 0,
    [],
  );
  const comments =
    commentQueryResponse?.pages.flatMap((page) => page.results) || [];

  // const [crawlFailed, setCrawlFailed] = useState(false);

  const crawlCommentMutation = useCrawlComment({
    mutation: {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        console.log('크롤링 실패');

        navigate('/notfound', { replace: true });
      },
    },
  });

  useEffect(() => {
    if (!isEpisodeLoading && comments.length === 0) {
      crawlCommentMutation.mutate({
        productId: productIdString,
      });
    }
  }, []);

  // 에피소드가 없을경우 리다이렉트
  const navigate = useNavigate();
  useEffect(() => {
    if (isEpisodeError) {
      navigate('/notfound', { replace: true });
    }
  }, [isEpisodeError, navigate]);

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 스크롤 위치 저장
    return () => {
      sessionStorage.setItem(scrollStateKey, String(scrollIndexRef.current));
    };
  }, [scrollStateKey]);

  const initialTopMostItemIndex =
    Number(sessionStorage.getItem(scrollStateKey)) || 0;

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
            <SelectValue>{sortDisplayMap[sort]}</SelectValue>
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
