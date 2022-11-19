import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://comp3123-a2-api-43405.herokuapp.com/api/',
  headers: { post: { 'Content-Type': 'application/json' } }
});

const login = async (username, password) => {
  const res = await axiosInstance.post('user/login', { username: username, password: password });
  return res;
};

const register = async (username, email, password) => {
  const res = await axiosInstance.post('user/signup', { username, email, password });
  return res;
};

const getEmployees = async () => {
  const res = await axiosInstance.get('emp/employees');
  return res;
};

const getEmployee = async (eid) => {
  const res = await axiosInstance.get(`emp/employees/${eid}`);
  return res;
};

const addEmployee = async (data) => {
  const res = await axiosInstance.post('emp/employees', { 
    first_name: data.first_name, 
    last_name: data.last_name, 
    email: data.email,
    gender: 'Male',
    salary: 10000
  });
  return res;
};

const updateEmployee = async (eid, data) => {
  const res = await axiosInstance.put(`emp/employees/${eid}`, data);
  return res;
};

const deleteEmployee = async (eid) => {
  const res = await axiosInstance.delete(`emp/employees/${eid}`)
  return res
}

const exports = { axiosInstance, login, register, getEmployees, addEmployee, getEmployee, updateEmployee, deleteEmployee };
export default exports;
