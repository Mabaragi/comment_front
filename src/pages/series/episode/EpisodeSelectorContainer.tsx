import EpisodeSelector from '../../../components/EpisodeSelector';
// import { useCrawlerSeriesEpisodeList } from '@/api/generated';
import { useSeriesEpisodeList } from '@/hooks/useCrawler';

type Props = {
  seriesId: number;
};

export default function EpisodeSelectorContainer({ seriesId }: Props) {
  const { data } = useSeriesEpisodeList(seriesId.toString(), {
    page: 9999,
  });
  const episodeNums =
    data?.results.map((episode) => ({ id: episode.id, name: episode.name })) ||
    [];
  if (!episodeNums) {
    return <p>에피소드가 없습니다.</p>;
  }
  return <EpisodeSelector episodeNums={episodeNums} seriesId={seriesId} />;
}
