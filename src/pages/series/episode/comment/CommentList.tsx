import type { Comment } from '@/types/comments';
import CommentListItem from './CommentListItem';

interface props {
  comments: Comment[];
}

export default function CommentsList({ comments }: props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
      {comments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
