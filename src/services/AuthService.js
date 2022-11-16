import axios from 'axios';

axios.defaults.baseURL = 'https://comp3123-a2-api-43405.herokuapp.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class AuthService {

    async login(username, password) {
        const res = await axios
            .post('user/login', { username: username, password: password });
        if (res.data.success === 'true') {
            localStorage.setItem('token', res.data.jwt_token);
        }
        return res.data;
    }

    logout() {
        localStorage.removeItem('token')
    }

    async register(username, email, password) {
        const res = await axios
            .post('user/signup', { username, email, password });
        return res.data;
    }
}

export default new AuthService();