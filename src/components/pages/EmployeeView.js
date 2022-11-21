import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from '../../services/apiService';
import { useAuth } from "../security/AuthContextProvider";

const EmployeeView = () => {
  const { eid } = useParams();
  const [employee, setEmployee] = useState();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiService.getEmployee(eid);
      setEmployee(res.data);
    };
    fetchData()
      .catch(checkAuth)
      .catch(console.error);
  }, [eid, checkAuth]);

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