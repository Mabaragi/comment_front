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

interface CommentHeaderProps {
  commentCount: number;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  onEmotionAnalysisRequest: () => void;
  isAnalyzing: boolean;
}

export default function CommentHeader({
  commentCount,
  sort,
  onSortChange,
  onEmotionAnalysisRequest,
  isAnalyzing,
}: CommentHeaderProps) {
  return (
    <div className="flex items-center justify-between mx-2 flex-shrink-0">
      <div>댓글 개수: {commentCount}</div>

      <Button
        variant="outline"
        onClick={onEmotionAnalysisRequest}
        disabled={isAnalyzing}
        className="cursor-pointer"
      >
        {isAnalyzing ? (
          <>
            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
            분석 중...
          </>
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
