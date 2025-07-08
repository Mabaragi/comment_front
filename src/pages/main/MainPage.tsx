import { Outlet } from 'react-router-dom';

export default function MainPage() {
  return (
    // 메인 컨텐츠: 시리즈 아이템 리스트
    <main className="flex flex-1 flex-col w-full bg-zinc-300 shadow rounded-md">
      <Outlet />
    </main>
  );
}
