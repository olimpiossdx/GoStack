import axios from 'axios';

//config para utilizar o localhost com emulador android
const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});

export default api;
