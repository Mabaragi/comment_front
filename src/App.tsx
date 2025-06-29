import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Layout from './pages/Layout';
import MainPage from './pages/main/MainPage';
import SeriesListContainer from './pages/series/SeriesListContainer';
import SeriesDetailContainer from './pages/series/SeriesDetailContainer';
import EpisodeDetailContainer from './pages/series/episode/EpisodeDetailContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 데이터가 신선하다고 간주되는 시간 (30초)
      gcTime: 3 * 1000, // 가비지 컬렉션 시간 (24시간)
      // gcTime: 24 * 60 * 60 * 1000, // 가비지 컬렉션 시간 (24시간)

      // 에러 발생 시 재시도 횟수
      retry: 1,
    },
  },
});
persistQueryClient({
  queryClient,
  persister: createSyncStoragePersister({
    storage: window.localStorage,
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Layout />}>
            <Route path="main" element={<MainPage />}>
              <Route index element={<SeriesListContainer />} />
              <Route
                path="series/:seriesId"
                element={<SeriesDetailContainer />}
              />
              <Route
                path="series/:seriesId/episode/:episodeId"
                element={<EpisodeDetailContainer />}
              />
            </Route>
            {/* 시리즈 상세 페이지 */}
            {/* 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
