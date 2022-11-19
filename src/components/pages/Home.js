import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../security/AuthProvider';
import EmployeeList from './EmployeeList';

const Home = () => {
  let location = useLocation();

  useEffect(() => {
    document.title = 'Home';  
  }, []);

  const { handleLogout } = useAuth();

  return (
    <div>
      <Link to="add-employee">Add Employee</Link>
      <Link onClick={() => handleLogout('Logged out')}>Logout</Link>
      { location.state && location.state.message && (
          <div>{location.state.message}</div>
      )}
      <h2>Employees</h2>
      <EmployeeList />
    </div>
  );
};

export default Home;
  
  