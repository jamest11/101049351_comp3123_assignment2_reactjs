import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Typography, FormGroup, Button, Box } from "@mui/material";
import { useAuth } from '../security/AuthContextProvider';
import EmployeeList from './EmployeeList';
import Div from "../common/Div";

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home';  
  }, []);

  const location = useLocation();
  const { handleLogout } = useAuth();

  const handleClick = (event) => {
    handleLogout();
    navigate('/login');
  };

  return (
    <Div className="FlexColumn">
      <Link onClick={handleClick}>Logout</Link>
      { location.state && location.state.message && (
          <div>{location.state.message}</div>
      )}
      <Typography variant="h4" component="h4" sx={{ my: 1 }}>Employees</Typography>
      <div>
        <EmployeeList />
        <Button sx={{ mt: 2 }} component={Link} to="/add-employee" variant="contained" color="primary">Add Employee</Button>
      </div>
    </Div>
  );
};

export default Home;
  
  