import type { Comment } from '@/types/comments';
import { format, parseISO } from 'date-fns';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  comment: Comment;
}

export default function CommentListItem({ comment }: Props) {
  return (
    <div>
      <div className="h-full" key={comment.id}>
        <div className="p-5">
          <div className="flex">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment.user_thumbnail_url} />
              <AvatarFallback className="w-10 h-10 bg-gray-200 text-gray-500 text-[46px] rounded-full">
                {comment.user_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full ml-3">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <span className="text-[13px]">{comment.user_name}</span>
                  {comment.is_best && <Badge variant="destructive">BEST</Badge>}

                  <Badge variant="outline">
                    <Heart className="w-4 h-4 text-gray-600" />
                    {comment.like_count?.toLocaleString()}개
                  </Badge>
                  {/* 감정점수 표시 */}
                  {comment.ai_emotion_score !== undefined &&
                  comment.ai_emotion_score !== null ? (
                    (() => {
                      const score = comment.ai_emotion_score;
                      let badgeClass = '';
                      if (score < 30) {
                        badgeClass =
                          'bg-red-100 text-red-700 border border-red-300';
                      } else if (score < 70) {
                        badgeClass =
                          'bg-yellow-100 text-yellow-700 border border-yellow-300';
                      } else {
                        badgeClass =
                          'bg-green-100 text-green-700 border border-green-300';
                      }
                      return (
                        <Tooltip>
                          <TooltipTrigger asChild={true}>
                            <Badge variant="outline" className={badgeClass}>
                              감정점수: {score}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="border border-gray-300 bg-white text-gray-800 p-2 rounded-md shadow-md max-w-xs sm:max-w-full text-sm">
                            <p>{comment.ai_reason}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })()
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-600 border border-gray-300"
                    >
                      감정점수 없음
                    </Badge>
                  )}
                </div>
                <span className="text-xs">
                  {format(parseISO(comment.created_at), 'yy.MM.dd')}
                </span>
              </div>
              {/* 댓글 내용: 두 줄까지 보이고, 높이도 두 줄 기준으로 고정 */}
              <span className="text-sm mt-2.5 line-clamp-2 break-all min-h-10">
                {comment.content.replace('(이모티콘)', '')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-18 h-[1px] bg-zinc-300" />
    </div>
  );
}
