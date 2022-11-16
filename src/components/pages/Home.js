import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../security/AuthProvider';
import DataService from '../../services/DataService';

const Home = () => {
  const { token, onLogout } = useAuth();

  const handleClick = (event) => {
    DataService.getEmployees()
      .then(data => console.log(data))
      .catch(() => onLogout())
  }

  useEffect(() => {
    document.title = 'Home';  
  }, []);

  return (
    <div>
      Token: {token}
      <br/>
      <Link to="/">Login</Link>
      <br/>
      <Link onClick={onLogout}>Logout</Link>
      <br/>
      <Link onClick={ handleClick }>Get Employees</Link>
    </div>
  );
};

export default Home;
  
  