import { Box, Container, ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import NavBar from '../common/NavBar';

const appTheme = createTheme({
  palette: {
    mode: 'dark',
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
          '&.FlexColumn': { display: 'flex', flexDirection: 'column', alignItems: 'center' }
        }
      }
    }
  }
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box>
        <NavBar />
        <Container component="main">
          { children }
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;