import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import {useAuth} from "../security/AuthContextProvider";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    handleLogout();
    navigate('/login', { state: { message: { text: 'Logged out', severity: 'success' }}});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Manager
          </Typography>
          {token && (
            <Button color="inherit" onClick={handleClick}>Logout</Button>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;