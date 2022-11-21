import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import PrivateRoute from './components/security/PrivateRoute';
import AuthContextProvider from './components/security/AuthContextProvider';
import EmployeeForm from './components/pages/EmployeeForm';
import EmployeeView from './components/pages/EmployeeView';
import Register from './components/pages/Register';
import Layout from './components/pages/Layout';

const App = () => {
  return (
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute><Layout><Home /></Layout></PrivateRoute>
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
            element={
              <Layout><Login /></Layout>
            } />
          <Route 
            path="/register" 
            element={
              <Layout><Register /></Layout>
            } />
        </Routes>
      </AuthContextProvider>
  );
};

export default App;
