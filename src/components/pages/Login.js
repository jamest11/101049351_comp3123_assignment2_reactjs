import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuth } from "../security/AuthProvider";

const Login = () => {

  const { token, onLogin } = useAuth();

  const [message, setMessage] = useState();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    AuthService.login(formData.username, formData.password)
      .then(data => onLogin(data.jwt_token))
      .catch(err => setMessage(err.response.data.message))
  };

  const handleChange = (event) => {
    setFormData(oldValues => ({
      ...oldValues, 
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    document.title = 'Login';  
  }, []);
  

  if(token) {
    return <Navigate to="/home" replace />
  }

  return (
    <div>
      <Link to="/home">Home</Link>
      <form onSubmit={handleSubmit}>
        <input
          name= "username"
          type= "text"
          onChange={handleChange}
          placeholder= "Enter Username"/>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Enter Password"/>

        <input 
          name="submit"
          type="submit"
          value="Login" />
      </form>

      {message && (
        <div>Error: {message}</div>
      )}  
      
    </div>
  );
}

export default Login