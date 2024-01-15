import axios from 'axios';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url !== '/login' && config.url !== '/register') {
        config.headers['Authorization'] = localStorage.getItem("AUTH-TOKEN")
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data.authorised===false){
        localStorage.removeItem("AUTH-TOKEN")
        window.location.href = "http://localhost:5173/login"
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if(error.response.status===403 || error.response.data.authorised===false){
        localStorage.removeItem("AUTH-TOKEN")
        window.location.href = "http://localhost:5173/login"
    }
    return Promise.reject(error);
});

export default axios;

