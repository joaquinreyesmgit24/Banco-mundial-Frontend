import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:'https://k3rk3g93-3000.brs.devtunnels.ms',
    headers:{
        'Content-Type':'application/json'
    }
})
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default axiosInstance