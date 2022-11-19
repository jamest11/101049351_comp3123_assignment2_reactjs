import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from '../../services/apiService';

const EmployeeView = () => {
  const { eid } = useParams();
  const [employee, setEmployee] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.getEmployee(eid);
        setEmployee(res.data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();
  }, [eid]);

  return (
    <>
      <h2>Employee Profile</h2>
      {employee && (
        <>
          <p>Name: {employee.first_name} {employee.last_name}</p>
          <p>Email: {employee.email}</p>
          <p>Gender: {employee.gender}</p>
          <p>Salary: {employee.salary}</p>
        </>
      )}
    </> 
  );
};

export default EmployeeView;