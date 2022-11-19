import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import ProtectedRoute from './components/security/ProtectedRoute';
import AuthProvider from './components/security/AuthProvider';
import EmployeeForm from './components/pages/EmployeeForm';
import EmployeeView from './components/pages/EmployeeView';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute><Home /></ProtectedRoute>
            } />
          <Route
            path="add-employee"
            element={
              <ProtectedRoute><EmployeeForm /></ProtectedRoute>
            } />
          <Route
            path="edit-employee/:eid"
            element={
              <ProtectedRoute><EmployeeForm /></ProtectedRoute>
            } />
          <Route
            path="view-employee/:eid"
            element={
              <ProtectedRoute><EmployeeView /></ProtectedRoute>
            } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
