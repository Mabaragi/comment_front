import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import EpisodeDetailContainer from './series/episode/EpisodeDetailContainer';

export default function Layout() {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Header />
      <Outlet />
    </div>
  );
}
