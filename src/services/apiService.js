import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://comp3123-a2-api-43405.herokuapp.com/api/',
  headers: { post: { 'Content-Type': 'application/json' } }
});

const setAuthHeader = (token) => {
  if(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const login = async (data) => {
  return await axiosInstance.post('user/login', data);
};

const register = async (data) => {
  return await axiosInstance.post('user/signup', data);
};

const getEmployees = async () => {
  return await axiosInstance.get('emp/employees');
};

const getEmployee = async (eid) => {
  return await axiosInstance.get(`emp/employees/${eid}`);
};

const addEmployee = async (data) => {
  return await axiosInstance.post('emp/employees', {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    gender: 'Male',
    salary: 10000
  });
};

const updateEmployee = async (eid, data) => {
  return await axiosInstance.put(`emp/employees/${eid}`, data);
};

const deleteEmployee = async (eid) => {
  return await axiosInstance.delete(`emp/employees/${eid}`);
};

const exports = { setAuthHeader, login, register, getEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee };
export default exports;
