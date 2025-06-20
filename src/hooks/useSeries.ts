import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { CrawlerService } from '../api/services/CrawlerService';
import type { SeriesCreate } from '../api/models/SeriesCreate';
import type { Series } from '../api/models/Series';

export function useSeriesList() {
  return useQuery<Series[], Error>({
    queryKey: ['series'],
    queryFn: CrawlerService.crawlerSeriesList,
  }); // 시리즈 목록 가져오기. 'series'라는 키를 사용하여 캐시된 데이터를 관리합니다.
}

export function useSeries(seriesId: string) {
  return useQuery<Series, Error>({
    queryKey: ['series', seriesId],
    queryFn: ({ queryKey }) => {
      const [, seriesId] = queryKey;
      return CrawlerService.crawlerSeriesRead(seriesId as string); // API 호출을 통해 시리즈 정보를 가져옵니다.
    },
  });
}

export function useAddSeries() {
  const qc = useQueryClient(); // QueryClient 인스턴스를 가져옵니다. QueryClient는 React Query의 캐시를 관리하는 객체입니다. 전역 캐시 저장소.
  return useMutation({
    mutationFn: (data: SeriesCreate) =>
      CrawlerService.crawlerSeriesCreate(data), // api를 호출 하기 위한 함수, mutation은 데이터를 변경하는 쿼리를 뜻함.
    onSuccess: () => {
      // 성공적으로 추가된 후 실행되는 콜백 함수입니다.
      console.log('시리즈 추가 성공');
      qc.invalidateQueries({ queryKey: ['series'] }); // 시리즈 목록을 다시 가져옵니다.
    },
    onError: (error: any) => {
      // 에러 발생 시 실행되는 콜백 함수입니다.
      console.error('시리즈 추가 실패:', error);
    },
  });
}
