import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../security/AuthProvider';
import EmployeeList from './EmployeeList';

const Home = () => {

  useEffect(() => {
    document.title = 'Home';  
  }, []);

  const { onLogout } = useAuth();

  return (
    <div>
      <Link onClick={onLogout}>Logout</Link>
      <h2>Employees</h2>
      <EmployeeList />
    </div>
  );
};

export default Home;
  
  