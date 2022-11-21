import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiService from '../../services/apiService';
import { Button, Box, TextField, Typography, Avatar, FormGroup, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Div from '../common/Div';

const Register = () => {
  const { register, handleSubmit, setError, getValues, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    apiService.register(data)
      .then(() => navigate('/login'))
      .catch(err => {
        setError('username', { type: 'server', message: 'Username in use' });
      });
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Div className="FlexColumn" sx={{ mt: 2 }}>
      <Avatar sx={{ backgroundColor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h4" component="h4" sx={{ my: 1 }}>Register</Typography>
      <Paper>
        <Box
          sx={{ px: 3, py: 1 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          maxWidth="sm"
        >
          <FormGroup row sx={{ gap: 2, my: 2 }}>
            <TextField
              error={!!errors.email}
              variant="outlined"
              label="Email Address"
              helperText={errors.email?.message}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required'
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email format'
                },
                maxLength:{
                  value: 50,
                  message: 'Max email length is 50 characters'
                }
              })} />
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
          </FormGroup>
          <FormGroup row sx={{ gap: 2, my: 2 }}>
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
            <TextField
              error={!!errors.passwordConfirm}
              variant="outlined"
              type="password"
              label="Confirm Password"
              helperText={errors.passwordConfirm?.message}
              {...register('passwordConfirm', {
                required: {
                  value: true,
                  message: 'Confirm password'
                },
                validate: value => value === getValues('password') || 'Passwords do not match'
              })}
            />
          </FormGroup>
          <FormGroup row sx={{ gap: 2, my: 2 }}>
            <Button type="submit" variant="contained" color="primary">Register</Button>
            <Button onClick={handleClick} variant="contained" color="secondary">Cancel</Button>
          </FormGroup>
        </Box>
      </Paper>
    </Div>
  );
};

export default Register;

/*
            <Input
              placeholder="Email Address" 
              {...register('email', { 
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email format'
                },
                maxLength:{
                  value: 50,
                  message: 'Max email length is 50 characters'
                } 
            })} />
*/