import axios from 'axios'

const env = 'prod';

const apiRequest = axios.create({
    baseURL: env === "dev"
    ? "http://localhost:8800/api"
    : "https://realestatebackend-48m5.onrender.com/api",
    withCredentials:true
})

export default apiRequest;