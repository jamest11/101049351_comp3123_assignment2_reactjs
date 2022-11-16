import axios from 'axios';

const getEmployees = async () => {
  const res = await axios.get('emp/employees');
  return res.data;
};

const exports = { getEmployees };
export default exports;
