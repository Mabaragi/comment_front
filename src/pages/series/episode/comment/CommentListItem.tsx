import React from 'react';
import type { Comment } from '@/types/comments';
import { format, parseISO } from 'date-fns';
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
                  {comment.is_best && (
                    <div className="bg-red-500 rounded-sm flex items-center h-5 px-1">
                      <span className="text-[11px] font-bold text-white leading-none">
                        BEST
                      </span>
                    </div>
                  )}
                  <span className="text-[13px]">{comment.user_name}</span>
                  <div className="bg-zinc-300 rounded-sm flex items-center h-5 pl-1 pr-1.5 gap-[3px]">
                    <Heart className="w-4 h-4 text-gray-600" />
                    <span className="text-[12px] text-gray-600 leading-none">
                      {comment.like_count?.toLocaleString()}개
                    </span>
                  </div>
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
