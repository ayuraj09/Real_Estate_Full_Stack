import axios from 'axios'

const env = 'prod';

const origin = env === 'dev' 
  ? 'http://localhost:8800/api' 
  : 'https://realestatefrontend-nu.vercel.app/api';

const apiRequest = axios.create({
    baseURL: origin,
    withCredentials:true
})

export default apiRequest;