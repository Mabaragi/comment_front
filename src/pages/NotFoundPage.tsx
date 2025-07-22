import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 숫자 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* 메시지 */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            URL을 다시 확인해 주세요.
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <Link to="/main">
            <Button className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              홈으로 돌아가기
            </Button>
          </Link>

          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-2 underline-offset-4 transition-colors"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>

        {/* 장식적 요소 */}
        <div className="mt-12 opacity-60">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-indigo-300 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            문제가 지속되면 관리자에게 문의해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
