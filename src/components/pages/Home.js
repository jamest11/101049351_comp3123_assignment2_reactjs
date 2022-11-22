import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography, Button } from "@mui/material";
import EmployeeList from './EmployeeList';
import Div from "../common/Div";

const Home = () => {

  useEffect(() => {
    document.title = 'Home';  
  }, []);

  const location = useLocation();

  return (
    <Div className="FlexColumn" sx={{ alignItems: 'flex-start', width: 'fit-content', mx: 'auto' }}>
      { location.state && location.state.message && (
          <div>{location.state.message}</div>
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
  
  