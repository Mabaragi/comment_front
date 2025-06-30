import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Layout() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Header />
      <Outlet />
    </div>
  );
}
