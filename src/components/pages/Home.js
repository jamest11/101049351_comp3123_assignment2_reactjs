import { useEffect } from 'react';
import { useAuth } from '../security/AuthProvider';
import { Link } from 'react-router-dom';

const Home = () => {
  const { token, onLogout } = useAuth();

  useEffect(() => {
    document.title = 'Home';  
  });

  return (
    <div>
      Token: {token}
      <br/>
      <Link to="/">Login</Link>
      <br/>
      <Link onClick={onLogout}>Logout</Link>
    </div>
  );
};

export default Home;
  
  