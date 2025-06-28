import EpisodeSelector from './EpisodeSelector';
import { useCrawlerSeriesEpisodeList } from '@/api/generated';

type Props = {
  seriesId: number;
};

export default function EpisodeSelectorContainer({ seriesId }: Props) {
  const { data } = useCrawlerSeriesEpisodeList(seriesId.toString(), {
    limit: 9999,
  });
  const episodeNums =
    data?.results.map((episode) => ({ id: episode.id, name: episode.name })) ||
    [];
  if (!episodeNums) {
    return <p>에피소드가 없습니다.</p>;
  }
  return <EpisodeSelector episodeNums={episodeNums} seriesId={seriesId} />;
}
