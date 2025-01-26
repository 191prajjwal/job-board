import api from '../utils/api';

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('company', JSON.stringify(response.data.company));
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('company');
  },

  verifyAccount: async (token) => {
    const response = await api.get(`/auth/verify/${token}`);
    return response.data;
  },

  getCurrentCompany: () => {
    return JSON.parse(localStorage.getItem('company'));
  }
};

export default authService;