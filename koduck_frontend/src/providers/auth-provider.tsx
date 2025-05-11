import React, { createContext, useState, useEffect } from 'react';
import { validateTokenPost } from '../service/api'

const USER_ID_KEY = 'userId';
const TOKEN = 'token';
const ACCESS_TOKEN_KEY = 'accessToken';

interface AuthContextType {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: () => boolean;
  logout: () => void;
  login: (credentials?: any) => Promise<void> | void;
  validateToken?: (token: string) => Promise<boolean>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem(USER_ID_KEY) || null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem(ACCESS_TOKEN_KEY) || null);

  // const validateToken = async (token) => {
  //   try {
  //     const response = await validateTokenPost();
  //     const { data } = response;

  //     if (response.status === 200 && data.msg === 'Token is valid') {
  //       // Token is valid, do nothing
  //       return true;
  //     } else {
  //       // Token is invalid or expired
  //       localStorage.removeItem(ACCESS_TOKEN_KEY);
  //       setAccessToken(null);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error validating token:', error);
  //     localStorage.removeItem(ACCESS_TOKEN_KEY);
  //     setAccessToken(null);
  //     return false;
  //   }
  // };

  const isLoggedIn = () => {
    return !!localStorage.getItem(TOKEN);
    // return userId !== null && accessToken !== null;
  };

  const logout = () => {
    setUserId(null);
    setAccessToken(null);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  const login = () => {

  }

  useEffect(() => {
    userId && localStorage.setItem('userId', userId);
  }, [userId]);

  useEffect(() => {
    accessToken && localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        userId,
        setUserId,
        accessToken,
        setAccessToken,
        isLoggedIn,
        logout,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

