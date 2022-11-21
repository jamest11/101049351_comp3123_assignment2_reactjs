import { createContext, useContext, useState } from 'react';
import apiService from '../../services/apiService';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if(token){
    apiService.setAuthHeader(token);
  }
  // create token service class w/ export

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    apiService.setAuthHeader(token);
  };

  const handleLogout = (msg) => {
    setToken(null);
    localStorage.removeItem('token');
    apiService.setAuthHeader();
  };

  const checkAuth = (err) => {
    if(err.response.status === 401) {
      handleLogout();
    }
    else{
      return Promise.reject(err);
    }
  };

  const value = {
    token, 
    handleLogin, 
    handleLogout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
export { useAuth };