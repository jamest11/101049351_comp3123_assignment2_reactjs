import axios from 'axios';

axios.defaults.baseURL = 'https://comp3123-a2-api-43405.herokuapp.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const login = async (username, password) => {
  const res = await axios
    .post('user/login', { username: username, password: password });
  if (res.data.success === 'true') {
    const token = res.data.jwt_token
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return res.data;
}

const logout = () => {
  localStorage.removeItem('token')
}

const register = async (username, email, password) => {
  const res = await axios
    .post('user/signup', { username, email, password });
  return res.data;
}

const exports = { login, logout, register }
export default exports;
