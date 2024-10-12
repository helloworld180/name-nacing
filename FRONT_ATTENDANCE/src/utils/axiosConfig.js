// axiosConfig.js
import axios from 'axios';
import {getToken} from '@/token/auth' // 注意这里使用了解构赋值来导入getToken函数

// 创建axios实例
const service = axios.create({
  baseURL: 'http://hup3hr.natappfree.cc/api', // 配置基础URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = getToken(); // 获取token的方式取决于你的应用
    // console.log('请求拦截器的token是：' +token)
    console.log('Request Config:', config);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 设置token
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Accept'] = 'application/json';
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // ！！！注意！！！这里返回已经包含data
    const res = response.data;
    // 你可以根据实际情况在这里添加一些通用的响应处理逻辑
    // 例如，根据返回的状态码判断请求是否成功
    // if (res.code !== 200) {
      // 业务错误处理，比如弹窗提示等
      // return Promise.reject(new Error(res.message || 'Error'));
    // } else {
      return res;
    // }
  },
  error => {
    // 对响应错误做点什么
    // if (error.response) {
        // 请求已发出，但服务器响应的状态码不在2xx的范围
      //   console.error('Error status:', error.response.status);
      //   console.error('Error data:', error.response.data);
      // } else if (error.request) {
        // 请求已发出，但没有收到响应
      //   console.error('Error request:', error.request);
      // } else {
        // 在设置请求时触发错误
        console.error('响应拦截器errorMessage:', error.message);
      // }
      return Promise.reject(error);
  }
);

export default service;