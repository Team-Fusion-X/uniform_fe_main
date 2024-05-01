import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext.js';

const useAuthCheck = (refMain) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 스크롤을 최상단으로 이동
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (refMain && refMain.current) {
      refMain.current.scrollTop = 0;
    }

    // 로그인 상태가 아닐 때 로그인 페이지로 리디렉트
    if (!auth.isLoggedIn) {
      alert("세션이 만료되었습니다.");
      navigate('/login-page');
    }
  }, [auth.isLoggedIn, navigate, refMain]);
}

export default useAuthCheck;
