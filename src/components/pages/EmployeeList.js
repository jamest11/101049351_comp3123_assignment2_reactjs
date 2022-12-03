import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  FormGroup,
  LinearProgress
} from '@mui/material';
import apiService from '../../services/apiService';
import { useAuth } from '../security/AuthContextProvider';
import DelEmpModal from "../common/DelEmpModal";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [modalData, setModalData] = useState({});

  const fetchData = async () => {
    const res = await apiService.getEmployees();
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData()
      .catch(checkAuth)
      .catch(console.error);
  }, [checkAuth]);

  const handleClick = (event) => {
    if(event.target.name === 'view') {
      navigate(`view-employee/${event.target.value}`);
    }
    else if (event.target.name === 'update') {
      navigate(`update-employee/${event.target.value}`);
    }
    else if (event.target.name === 'delete') {
      employees.forEach(emp => {
        if(event.target.value === emp.eid.toString()) {
          setModalData(emp);
          return;
        }
      });
      setShowDelete(true);
    }
  };

  const handleDelete = id => {
    setShowDelete(false);
    setLoading(true);
    apiService.deleteEmployee(id)
      .then(fetchData)
      .catch(console.error);
  };

  return (
    <>
      <DelEmpModal open={showDelete} setOpen={setShowDelete} employee={modalData} callback={handleDelete} />
      <TableContainer component={Paper}>
        {loading ? (
          <LinearProgress />
        ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.eid}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <FormGroup row sx={{ gap: 1 }}>
                    <Button onClick={handleClick} name="view" value={employee.eid} variant="contained" size="small">View</Button>
                    <Button onClick={handleClick} name="update" value={employee.eid} variant="contained" size="small">Update</Button>
                    <Button onClick={handleClick} name="delete" value={employee.eid} variant="contained" size="small" color="secondary">Delete</Button>
                  </FormGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </TableContainer>
    </>
  );
};

export default EmployeeList;