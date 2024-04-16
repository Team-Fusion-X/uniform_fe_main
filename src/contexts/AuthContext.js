import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initialSessionId = localStorage.getItem('sessionId');
  const [auth, setAuth] = useState({
    isLoggedIn: !!initialSessionId,
    sessionId: initialSessionId
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/landing-page") { // 메인 페이지에서만 세션 만료 타이머 비활성화
      return;
    }

    const sessionTimeout = setTimeout(() => {
      alert('세션 만료됨. 다시 로그인 해주세요.');
      setAuth({ isLoggedIn: false, sessionId: null });
      localStorage.removeItem('sessionId');
      navigate('/login-page');
    }, 1800000); // 30분

    return () => clearTimeout(sessionTimeout);
  }, [navigate, location.pathname]); // location.pathname 의존성 추가

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
