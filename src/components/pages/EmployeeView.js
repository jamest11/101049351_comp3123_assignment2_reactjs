import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import apiService from '../../services/apiService';
import { useAuth } from "../security/AuthContextProvider";
import Div from "../common/Div";
import {Button, Paper, Typography} from "@mui/material";

const EmployeeView = () => {
  const { eid } = useParams();
  const [employee, setEmployee] = useState();
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

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
    <Div className="FlexColumn" sx={{ alignItems: 'center', width: 'fit-content', mx: 'auto' }}>
      <Typography variant="h4" component="h4" sx={{ my: 1 }}>Employee Profile</Typography>
      {employee && (
        <Paper sx={{ padding: 3 }}>
          <Div className="FlexColumn" sx={{ alignItems: 'flex-start', gap: 2}}>
            <span><strong>Name</strong>: {employee.first_name} {employee.last_name}</span>
            <span><strong>Email</strong>: {employee.email}</span>
            <span><strong>Gender</strong>: {employee.gender}</span>
            <span><strong>Salary</strong>: ${employee.salary}</span>
            <Button onClick={() => navigate('/')} variant="contained">Back</Button>
          </Div>
        </Paper>
      )}
    </Div>
  );
};

export default EmployeeView;