import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { format, parseISO } from 'date-fns';
import { Heart } from 'lucide-react';
import type { Comment } from '@/types/comments';

interface props {
  comments: Comment[];
}

export default function CommentsList({ comments }: props) {
  // const comments = [
  //   {
  //     id: 166108787,
  //     content:
  //       '그래, 에르노.. 진짜 너 얼굴 볼 때마다 설레서 어떻게 할 수가 없다..ㅠㅠ 나보고 욕해도 좋으니까 에르노 시녀 시켜줘ㅠㅠ',
  //     created_at: '2025-05-31T17:12:10Z',
  //     is_best: true,
  //     like_count: 1232,
  //     emoticon: null,
  //     user_name: '나도_빙의_시켜줘요',
  //     user_thumbnail_url:
  //       'http://dn-img-page.kakao.com/download/resource?kid=cnwDVf/hAJjI7wGpl/8fQYoT2tQ5Qeh4JIlLjKEk&filename=o1',
  //     user_uid: 30567247,
  //     series: 61822163,
  //     episode: 61823562,
  //   },
  //   {
  //     id: 165990377,
  //     content: '(이모티콘)응원합니다',
  //     created_at: '2025-05-26T08:44:11Z',
  //     is_best: false,
  //     like_count: 0,
  //     emoticon: {
  //       itemId: '4412207',
  //       itemVer: 1,
  //       resourceId: 1,
  //       itemSubType: 4,
  //     },
  //     user_name: '아산온천',
  //     user_thumbnail_url:
  //       'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
  //     user_uid: 30791239,
  //     series: 61822163,
  //     episode: 61823562,
  //   },
  // ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
      {comments.map((comment) => (
        <div>
          <div className="h-full" key={comment.id}>
            <div className="p-5">
              <div className="flex">
                <Avatar>
                  <AvatarImage
                    className="w-11 h-11 rounded-full"
                    src={comment.user_thumbnail_url}
                  />
                  <AvatarFallback className="w-11 h-11 bg-gray-200 text-gray-500 text-[46px] rounded-full">
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
                  <span className="text-sm mt-2.5">
                    {comment.content.replace('(이모티콘)', '')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-18 h-[1px] bg-zinc-300" />
        </div>
      ))}
    </div>
  );
}
