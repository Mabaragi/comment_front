import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import { useEpisodeCommentList } from '@/hooks/useCrawler';

export default function CommentListContainer() {
  const { episodeId: productIdString } = useParams() as { episodeId: string };

  const { data, isLoading, isError } = useEpisodeCommentList(productIdString, {
    limit: 9999,
  });
  const comments = data?.results || [];
  return (
    <>
      {/* {data?.results} */}
      <CommentList comments={comments} />
    </>
  );
}
