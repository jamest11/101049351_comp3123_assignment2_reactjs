import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import {useAuth} from "../security/AuthContextProvider";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (event) => {
    if(event.target.name === 'logout') {
      handleLogout();
      navigate('/login', {state: {message: {text: 'Logged out', severity: 'success'}}});
    }
    else if(event.target.name === 'employee-list') {
      navigate('/');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Manager
          </Typography>
          {token && (
            <>
              <Button color="inherit" onClick={handleClick} name="employee-list">Employees</Button>
              <Button color="inherit" onClick={handleClick} name="logout">Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;