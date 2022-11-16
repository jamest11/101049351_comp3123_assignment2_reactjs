import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import ProtectedRoute from './components/security/ProtectedRoute';
import AuthProvider from './components/security/AuthProvider';
import './App.css';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login  replace />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } replace />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
