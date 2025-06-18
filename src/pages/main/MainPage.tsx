import { Outlet } from 'react-router-dom';

export default function MainPage() {
  return (
    <>
      {/* 메인 컨텐츠: 시리즈 아이템 리스트 */}
      <main className="w-full mx-auto px-6 py-8 shadow rounded-md">
        <Outlet />
      </main>
    </>
  );
}
