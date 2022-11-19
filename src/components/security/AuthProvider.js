import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if(token){
    apiService.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const navigate = useNavigate();

  const handleLogin = (jwt_token) => {
    setToken(jwt_token);
    localStorage.setItem('token', jwt_token);
    apiService.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
    navigate('/');
  };

  const handleLogout = (msg) => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
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

export default AuthProvider;
export { useAuth };

  /*useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    axios.defaults. headers.common['Authorization'] = `Bearer ${token}`
  }, []);*/