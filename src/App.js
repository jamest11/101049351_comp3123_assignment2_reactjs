import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import ProtectedRoute from './components/security/ProtectedRoute';
import AuthProvider from './components/security/AuthProvider';
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
          <Route path="/login" element={<Login  replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
