import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from '../security/AuthContextProvider';

const EmployeeForm = () => {

  useEffect(() => {
    document.title = 'Employee Form';  
  }, []);

  const { eid } = useParams();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiService.getEmployee(eid);
      setFormData({ 
        first_name: res.data.first_name, 
        last_name: res.data.last_name,
        email: res.data.email
      });
    };
    if(eid){
      fetchData()
        .catch(checkAuth)  
        .catch(console.error);
    }
  }, [eid, checkAuth]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if(eid) {
      apiService.updateEmployee(eid, formData)
        .then(() => navigate('/', { state: { message: 'Updated employee' } }))
        .catch(console.error);

    } 
    else {
      apiService.addEmployee(formData)
        .then(() => navigate('/', { state: { message: 'Added new employee' } }))
        .catch(console.error);
    }
    
  };

  const handleChange = (event) => {
    setFormData(oldValues => ({
      ...oldValues, 
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name= "first_name"
          type= "text"
          onChange={handleChange}
          defaultValue={formData.first_name}
          placeholder= "Enter First Name" required />

        <input
          name="last_name"
          type="text"
          onChange={handleChange}
          defaultValue={formData.last_name}
          placeholder="Enter Last Name" required />

        <input
          name="email"
          type="text"
          onChange={handleChange}
          defaultValue={formData.email}
          placeholder="Enter Email" required />

        <input 
          name="submit"
          type="submit"
          value={eid ? "Update Employee" : "Add Employee"} />
      </form>
    </div>
  );

};

export default EmployeeForm;