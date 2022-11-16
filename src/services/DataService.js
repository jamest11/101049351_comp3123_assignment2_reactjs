import axios from 'axios';

const getEmployees = async () => {
  const res = axios.get('emp/employees');
  return res;
}

const exports = { getEmployees };
export default exports;

/*
<br/>
      <Link onClick={ DataService.getEmployees() }>Get Employees</Link>

*/