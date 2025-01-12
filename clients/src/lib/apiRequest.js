import axios from 'axios'

const env = 'prod';

const apiRequest = axios.create({
    baseURL: nv === "dev"
    ? "http://localhost:8800/api"
    : "https://realestatefrontend-nu.vercel.app/api",
    withCredentials:true
})

export default apiRequest;