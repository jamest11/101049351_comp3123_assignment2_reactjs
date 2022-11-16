import axios from 'axios';

axios.defaults.baseURL = 'https://comp3123-a2-api-43405.herokuapp.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const login = async (username, password) => {
  const res = await axios
    .post('user/login', { username: username, password: password });
  return res.data;
};

const register = async (username, email, password) => {
  const res = await axios
    .post('user/signup', { username, email, password });
  return res.data;
};

const exports = { login, register };
export default exports;
