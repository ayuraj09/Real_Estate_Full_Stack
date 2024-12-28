import axios from 'axios'

const apiRequest = axios.create({
    baseURL:"https://realestatebackend-48m5.onrender.com/api",
    withCredentials:true
})

export default apiRequest;