import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initialSessionId = Cookies.get('sessionId');
  const [auth, setAuth] = useState({
    isLoggedIn: !!initialSessionId,
    sessionId: initialSessionId
  });
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setAuth({ isLoggedIn: false, sessionId: null });
    Cookies.remove('sessionId'); // 쿠키에서 세션 ID 제거
    navigate('/landing-page');
  };

  useEffect(() => {
    if (location.pathname === "/landing-page") {
      return;
    }

    const sessionTimeout = setTimeout(() => {
      alert('세션 만료됨. 다시 로그인 해주세요.');
      logout(); // 로그아웃 함수 호출
    }, 1800000); // 30분

    return () => clearTimeout(sessionTimeout);
  }, [navigate, location.pathname, logout]); // logout 의존성 추가

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
