import { Box, Container } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import NavBar from '../common/NavBar';

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00897f',
    },
    secondary: {
      main: '#f4511e',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiDiv: {
      styleOverrides: {
        root: {
          '&.FlexColumn': { display: 'flex', flexDirection: 'column' }
        }
      }
    }
  }
});

const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Container component="main">
        { children }
      </Container>
    </Box>
  );
};

export default Layout;
export { appTheme };