import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dist.nd.ru',
  headers: {
    accept: 'application/json',
  },
});

export default instance;