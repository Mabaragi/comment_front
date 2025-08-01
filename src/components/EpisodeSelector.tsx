import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  seriesId: number;
  episodeNums: { id: number; name: string }[];
};

export default function EpisodeSelector({ seriesId, episodeNums }: Props) {
  const navigate = useNavigate();
  const handleSelectChange = (episodeId: string) => {
    navigate(`/main/series/${seriesId}/episode/${episodeId}`);
  };
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="에피소드 선택" />
      </SelectTrigger>
      <SelectContent>
        {episodeNums.map((episode) => (
          <SelectItem
            className="cursor-pointer"
            key={episode.id}
            value={episode.id.toString()}
          >
            {episode.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
