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
  return axiosInstance.post('user/login', data);
};

const register = async (data) => {
  return axiosInstance.post('user/signup', data);
};

const getEmployees = async () => {
  return axiosInstance.get('emp/employees');
};

const getEmployee = async (eid) => {
  return axiosInstance.get(`emp/employees/${eid}`);
};

const addEmployee = async (data) => {
  return axiosInstance.post('emp/employees', data);
};

const updateEmployee = async (eid, data) => {
  return axiosInstance.put(`emp/employees/${eid}`, data);
};

const deleteEmployee = async (eid) => {
  return axiosInstance.delete(`emp/employees/${eid}`);
};

const exports = { setAuthHeader, login, register, getEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee };
export default exports;
