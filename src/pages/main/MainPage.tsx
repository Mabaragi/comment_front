import { Outlet } from 'react-router-dom';

export default function MainPage() {
  return (
    <>
      {/* 메인 컨텐츠: 시리즈 아이템 리스트 */}
      <main className="flex flex-1 flex-col w-full mx-auto bg-zinc-300 pt-8 shadow rounded-md">
        {/* <div className="container mx-auto"> */}
        <div className="flex flex-1 flex-col w-full sm:max-w-7xl  mx-auto bg-zinc-100 rounded-lg overflow-hidden shadow-md">
          <Outlet />
        </div>
        {/* </div> */}
      </main>
    </>
  );
}
