import {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Typography, Button, Alert} from "@mui/material";
import EmployeeList from './EmployeeList';
import Div from "../common/Div";

const Home = () => {

  const location = useLocation();
  const [message, setMessage] = useState();

  useEffect(() => {
    setMessage(location.state?.message);
  },[location.state]);

  return (
    <Div className="FlexColumn" sx={{ alignItems: 'flex-start', width: 'fit-content', mx: 'auto' }}>
      {message && (
        <Alert onClose={() => setMessage(undefined)} severity={message.severity} sx={{ my: 2 }}>{message.text}</Alert>
      )}
      <Typography variant="h4" component="h4" sx={{ my: 1 }}>Employees</Typography>
      <Div sx={{ minWidth: { md: 800 } }}>
        <EmployeeList />
        <Button sx={{ mt: 2 }} component={Link} to="/add-employee" variant="contained" color="primary">Add Employee</Button>
      </Div>
    </Div>
  );
};

export default Home;
  
  