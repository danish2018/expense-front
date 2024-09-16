import axios from 'axios'

import { requestMiddleWare, responseMiddleWare } from '../../utils/httpInterSeptur/HttpInterSeptur'

const axiosInstance = axios.create({
  // baseURL: 'https://medipassport.vercel.app/api',
  baseURL: 'https://apiexpense.vercel.app/api/',
  timeout: 50000 // Set timeout to 10 seconds (adjust as needed)
})

// Add request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const modifiedConfig = requestMiddleWare(config)

    return modifiedConfig
  },
  error => {
    return Promise.reject(error)
  }
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Apply response middleware logic
    const modifiedResponse = responseMiddleWare(response)

    return modifiedResponse
  },
  error => {
    // Handle response errors
    return Promise.reject(error)
  }
)

export default axiosInstance
