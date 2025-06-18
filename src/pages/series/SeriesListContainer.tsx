import { useSeriesList } from '../../hooks/useSeries';
import SeriesList from './SeriesList';
export default function SeriesListContainer() {
  const { data: series, isLoading, isError, error } = useSeriesList();
  console.log(import.meta.env.VITE_BACKEND_URL);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  if (isError) {
    return <p>에러 발생: {(error as Error).message}</p>; // 타입 단언(type assertion)을 통해 error를 Error 타입으로 변환
  }
  return <SeriesList series={series ?? []} />;
}
