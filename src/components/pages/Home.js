import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContextProvider';
import EmployeeList from './EmployeeList';

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home';  
  }, []);

  const location = useLocation();
  const { handleLogout } = useAuth();

  const handleClick = (event) => {
    handleLogout();
    navigate('/login');
  };

  return (
    <div>
      <Link to="/add-employee">Add Employee</Link>
      <Link onClick={handleClick}>Logout</Link>
      { location.state && location.state.message && (
          <div>{location.state.message}</div>
      )}
      <h2>Employees</h2>
      <EmployeeList />
    </div>
  );
};

export default Home;
  
  