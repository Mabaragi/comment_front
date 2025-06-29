import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';

export default function Header() {
  return (
    <header className="w-full bg-zinc-100">
      <div className="flex justify-between items-center w-full px-6">
        <div>
          <Link to="/main">
            <div className="p-4">
              <h1 className="text-4xl font-bold text-center text-gray-900 tracking-tight">
                나의 서비스 이름
              </h1>
            </div>
          </Link>
        </div>
        <AuthButtons />
      </div>
    </header>
  );
}
