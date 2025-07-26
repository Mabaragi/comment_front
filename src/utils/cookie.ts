import Cookies from 'js-cookie';

const getRefreshTokenFromCookie = () => {
  // 쿠키에서 리프레시 토큰을 가져오는 함수
  return Cookies.get('refreshToken') || null;
};

// 쿠키에 리프레시 토큰을 저장하는 함수
const setRefreshTokenToCookie = (token: string) => {
  Cookies.set('refreshToken', token, {
    expires: 7, // 7일 후 만료
    httpOnly: false, // 클라이언트에서 접근 가능
    // secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송 (프로덕션)
    sameSite: 'strict', // CSRF 보호
  });
};

// 쿠키에서 리프레시 토큰을 제거하는 함수
const removeRefreshTokenFromCookie = () => {
  Cookies.remove('refreshToken');
};

export {
  getRefreshTokenFromCookie,
  setRefreshTokenToCookie,
  removeRefreshTokenFromCookie,
};
