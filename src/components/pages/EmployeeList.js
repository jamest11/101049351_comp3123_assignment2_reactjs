import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await apiService.getEmployees();
      setEmployees(res.data);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.getEmployees();
        setEmployees(res.data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleClick = (event) => {
    if(event.target.name === 'view') {
      navigate(`view-employee/${event.target.value}`);
    }
    else if (event.target.name === 'edit') {
      navigate(`edit-employee/${event.target.value}`);
    }
    else if (event.target.name === 'delete') {
      apiService.deleteEmployee(event.target.value)
        .then(() => fetchData())
        .catch(err => console.log(err));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td>{employee.email}</td>
            <td>
              <button type="button" onClick={handleClick} name="view" value={employee.eid}>View</button>
              <button type="button" onClick={handleClick} name="edit" value={employee.eid}>Edit</button>
              <button type="button" onClick={handleClick} name="delete" value={employee.eid}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;