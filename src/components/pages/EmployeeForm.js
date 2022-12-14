import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from '../security/AuthContextProvider';
import Div from "../common/Div";
import {
  Button,
  Box,
  TextField,
  Typography,
  FormGroup,
  Paper,
  FormControl,
  InputLabel, NativeSelect
} from '@mui/material';
import {useForm} from "react-hook-form";

const EmployeeForm = () => {

  const { eid } = useParams();
  const { checkAuth } = useAuth();
  const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiService.getEmployee(eid);
      setValue("first_name", res.data.first_name);
      setValue("last_name", res.data.last_name);
      setValue("email", res.data.email);
      setValue("salary", res.data.salary);
      setValue("gender", res.data.gender);
      setGender('Other');
    };
    if(eid){
      fetchData()
        .catch(checkAuth)
        .catch(console.error);
    }
  }, [eid, checkAuth, setValue]);

  const onSubmit = (data) => {
    if(eid) {
      apiService.updateEmployee(eid, data)
        .then(() => navigate('/', { state: { message: { text: 'Updated employee', severity: 'success' }}}))
        .catch(err =>  setError('email', { type: 'server', message: 'Email already in use' }));
    } 
    else {
      apiService.addEmployee(data)
        .then(() => navigate('/', { state: { message: { text: 'Added new Employee', severity: 'success' }}}))
        .catch(err =>  setError('email', { type: 'server', message: 'Email already in use' }))
        .catch(console.error);
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Div className="FlexColumn" sx={{ mt: 2, alignItems: 'center' }}>
      <Typography variant="h4" component="h4" sx={{ my: 1 }}>{eid ? 'Update Employee' : 'Add Employee'}</Typography>
      <Paper>
        <Box
          sx={{ px: 3, py: 1 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <FormGroup row sx={{ gap: 2, my: 2 }}>
            <TextField
              error={!!errors.first_name}
              variant="outlined"
              label="First Name"
              InputLabelProps={(eid ? { shrink: !!eid  } : {})}
              helperText={errors.first_name?.message}
              {...register('first_name', {
                required: {
                  value: true,
                  message: 'First name is required'
                },
              })}
            />
            <TextField
              error={!!errors.last_name}
              variant="outlined"
              label="Last Name"
              InputLabelProps={(eid ? { shrink: !!eid  } : {})}
              helperText={errors.last_name?.message}
              {...register('last_name', {
                required: {
                  value: true,
                  message: 'Last name is required'
                },
              })}
            />
          </FormGroup>
          <FormGroup row sx={{ gap: 2, my: 2 }}>
            <TextField
              error={!!errors.email}
              variant="outlined"
              label="Email Address"
              sx={{ flex: 2 }}
              InputLabelProps={(eid ? { shrink: !!eid  } : {})}
              helperText={errors.email?.message}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required'
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email format'
                }
              })}
            />
          </FormGroup>
          <FormGroup row sx={{ gap: 2, my: 2 }}>
            <TextField
              error={!!errors.salary}
              variant="outlined"
              label="Salary ($)"
              sx={{ flex: 2 }}
              InputLabelProps={(eid ? { shrink: !!eid  } : {})}
              helperText={errors.salary?.message}
              {...register('salary', {
                required: {
                  value: true,
                  message: 'Salary is required'
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'Invalid salary'
                },
                min: 10
              })}
            />
          </FormGroup>
          <FormGroup row sx={{ gap: 2, my: 2 }}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="gender-select">Gender</InputLabel>
              <NativeSelect
                defaultValue={gender}
                sx={{ width: 150 }}
                inputProps={{
                  name:'gender',
                  id:'gender-select'
                }}
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </NativeSelect>
            </FormControl>
          </FormGroup>
          <FormGroup row sx={{ gap: 2, my: 2, justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
            >
              {eid ? "Update Employee" : "Add Employee"}
            </Button>
            <Button variant="contained" onClick={handleClick}>Cancel</Button>
          </FormGroup>
        </Box>
      </Paper>
    </Div>
  );

};

export default EmployeeForm;