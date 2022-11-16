import React, { useState, useEffect} from 'react';
import DataService from '../../services/DataService';

const EmployeeList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DataService.getEmployees();
        setEmployees(data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [employees, setEmployees] = useState([]);

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee._id}>
          Email: {employee.email}
          Name: {employee.first_name + ' ' + employee.last_name}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;

/*
  {employees.map((employee) => (
        <li key={employee._id}>
          Email: {employee.email}
        </li>
      ))}

  const handleClick = (event) => {
    DataService.getEmployees()
      .then(data => console.log(data))
      .catch(() => onLogout())
  }
*/