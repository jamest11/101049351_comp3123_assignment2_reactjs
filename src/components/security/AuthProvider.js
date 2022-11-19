import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if(token){
    apiService.setAuthHeader(token);
  }

  const navigate = useNavigate();

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    apiService.setAuthHeader(token);
    navigate('/');
  };

  const handleLogout = (msg) => {
    setToken(null);
    localStorage.removeItem('token');
    apiService.setAuthHeader();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
export { useAuth };