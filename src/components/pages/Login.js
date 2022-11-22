import {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from "../security/AuthContextProvider";
import { useForm } from "react-hook-form";
import {Button, Box, Paper, TextField, Typography, FormGroup, Avatar, Alert} from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Div from "../common/Div";

const Login = () => {

  useEffect(() => {
    document.title = 'Login';  
  }, []);
  
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { token, handleLogin } = useAuth();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMessage(location.state?.message);
  },[location.state]);

  if(token) {
    return (<Navigate to="/" replace />);
  }

  const onSubmit = (data) => {
    apiService.login(data)
      .then(res => {
        handleLogin(res.data.jwt_token);
        navigate('/');
      })
      .catch(console.error);
  };

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <Div className="FlexColumn" sx={{ mt: 2, alignItems: 'center'}}>
      <Avatar sx={{ backgroundColor: 'primary.main' }}>
        <LoginOutlinedIcon />
      </Avatar>
      <Typography variant="h4" component="h4" sx={{ my: 1 }}>Login</Typography>

      {message && (
        <Alert onClose={() => setMessage(undefined)} severity={message.severity} sx={{ mb: 2 }}>{message.text}</Alert>
      )}

      <Paper>
        <Box
          sx={{ px: 3, py: 1 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <FormGroup row sx={{gap: 2, my: 2}}>
            <TextField
              error={!!errors.username}
              variant="outlined"
              label="Username"
              helperText={errors.username?.message}
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required'
                }
              })}
            />
            <TextField
              error={!!errors.password}
              variant="outlined"
              type="password"
              label="Password"
              helperText={errors.password?.message}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required'
                }
              })}
            />
          </FormGroup>
          <FormGroup row sx={{ gap: 2, my: 2 }}>
            <Button type="submit" variant="contained" color="primary">Login</Button>
            <Button variant="contained" onClick={handleClick} color="secondary">Register</Button>
          </FormGroup>
        </Box>
      </Paper>
    </Div>
  );
};

export default Login;