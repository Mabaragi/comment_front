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
    comments.length > 0 && comments.every((c) => c.is_ai_processed);
  return (
    <div className="flex items-center justify-between mx-2 flex-shrink-0">
      <div>댓글 개수: {commentCount}</div>

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
        value={sort}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>{SORT_OPTIONS[sort].label}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">최신순</SelectItem>
          <SelectItem value="oldest">등록순</SelectItem>
          <SelectItem value="popularity">인기순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
