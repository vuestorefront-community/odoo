import axios from 'axios';
const axiosInstance =  axios.create()


// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    console.log(response.headers);
    
    response.headers['Cache-Control'] = ['123'];
    response.headers['cr']
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const client = axiosInstance;