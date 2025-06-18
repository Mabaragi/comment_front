import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Layout() {
  return (
    <div className="bg-gray-100 min-h-screen bg-yellow-100 flex flex-col items-center">
      <Header />
      <Outlet />
    </div>
  );
}
