import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;