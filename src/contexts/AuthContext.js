import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 로컬 스토리지에서 세션 ID를 불러와 초기 상태를 설정합니다.
  const initialSessionId = localStorage.getItem('sessionId');
  const [auth, setAuth] = useState({
    isLoggedIn: !!initialSessionId,  // !! 연산자로 초기 로그인 상태를 결정합니다.
    sessionId: initialSessionId
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 페이지에서 세션 ID를 가져옵니다.
    const currentSessionId = localStorage.getItem('sessionId');
    // 세션 ID가 존재하면 로그인 상태를 true로 설정합니다.
    if (currentSessionId) {
        setAuth({ isLoggedIn: true, sessionId: currentSessionId });
    }
  }, []);

  useEffect(() => {
    const sessionTimeout = setTimeout(() => {
      // 세션 만료 처리
      alert('세션 만료됨. 다시 로그인 해주세요.');
      setAuth({ isLoggedIn: false, sessionId: null });
      localStorage.removeItem('sessionId'); // 세션 ID 제거
      navigate('/login-page');
    }, 180000); // 30분 세션 만료

    return () => clearTimeout(sessionTimeout); // 컴포넌트 언마운트 시 타이머 취소
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
