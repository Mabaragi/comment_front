import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SORT_OPTIONS, type SortOption } from '@/hooks/useCommentData';
import type { Comment } from '@/types/comments';
import { useSpamFilterStore } from '@/stores/spamFilterStore';

interface CommentHeaderProps {
  comments: Comment[];
  commentCount: number;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  onEmotionAnalysisRequest: () => void;
  isAnalyzing: boolean;
}

export default function CommentHeader({
  comments,
  commentCount,
  sort,
  onSortChange,
  onEmotionAnalysisRequest,
  isAnalyzing,
}: CommentHeaderProps) {
  const allProcessed =
    comments.length > 0 &&
    comments.every((c) => c.is_ai_processed && c.is_spam !== null);

  const { filterOption, setFilterOption } = useSpamFilterStore();
  const onFilterChange = (
    value: 'all' | 'notSpam' | 'spam' | 'unprocessed',
  ) => {
    setFilterOption(value);
  };

  return (
    <div className="flex items-center justify-between mx-2 flex-shrink-0">
      <div>댓글 개수: {commentCount}</div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onEmotionAnalysisRequest}
          disabled={isAnalyzing || allProcessed}
          className="cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
              분석 중...
            </>
          ) : allProcessed ? (
            '분석 완료'
          ) : (
            '감정 분석 요청'
          )}
        </Button>
        <Select
          value={filterOption}
          onValueChange={(value) =>
            onFilterChange(value as 'all' | 'notSpam' | 'spam' | 'unprocessed')
          }
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue>스팸 필터</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전부</SelectItem>
            <SelectItem value="notSpam">비스팸</SelectItem>
            <SelectItem value="spam">스팸</SelectItem>
            <SelectItem value="unprocessed">처리되지 않음</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue>{SORT_OPTIONS[sort].label}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="oldest">등록순</SelectItem>
            <SelectItem value="popularity">인기순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
