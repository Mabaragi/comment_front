import EpisodeSelector from './EpisodeSelector';
import { useEpisodeList } from '../../../hooks/useEpisode';

type Props = {
  seriesId: string;
};

export default function EpisodeSelectorContainer({ seriesId }: Props) {
  const { data } = useEpisodeList({
    seriesId,
    limit: 9999,
    fields: 'id,name',
  });
  const episodeNums =
    data?.results.map((episode) => ({ id: episode.id, name: episode.name })) ||
    [];
  if (!episodeNums) {
    return <p>에피소드가 없습니다.</p>;
  }
  return <EpisodeSelector episodeNums={episodeNums} seriesId={seriesId} />; // 예시 데이터
}
