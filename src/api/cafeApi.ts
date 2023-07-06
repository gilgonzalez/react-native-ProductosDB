import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const urlLocal = 'http://192.168.100.2:8080/api';
const url = 'https://cafe-gil-2d22c848d561.herokuapp.com/api';


const apiCafe = axios.create({
  baseURL: urlLocal,
});

apiCafe.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  }

);



export default apiCafe;
