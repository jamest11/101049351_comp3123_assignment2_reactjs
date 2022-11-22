import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import PrivateRoute from './components/security/PrivateRoute';
import AuthContextProvider from './components/security/AuthContextProvider';
import EmployeeForm from './components/pages/EmployeeForm';
import EmployeeView from './components/pages/EmployeeView';
import Register from './components/pages/Register';
import Layout, {appTheme} from './components/pages/Layout';
import {CssBaseline, ThemeProvider} from "@mui/material";

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute><Home /></PrivateRoute>
              } />
            <Route
              path="add-employee"
              element={
                <PrivateRoute><EmployeeForm /></PrivateRoute>
              } />
            <Route
              path="update-employee/:eid"
              element={
                <PrivateRoute><EmployeeForm /></PrivateRoute>
              } />
            <Route
              path="view-employee/:eid"
              element={
                <PrivateRoute><EmployeeView /></PrivateRoute>
              } />
            <Route
              path="/login"
              element={<Login />} />
            <Route
              path="/register"
              element={<Register />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
