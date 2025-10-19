import axios from 'axios';

// Tạo một instance Axios để đặt baseUrl và có thể thêm interceptor sau này
const request = axios.create({
  baseURL: 'http://localhost:3000', // API Mock server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;