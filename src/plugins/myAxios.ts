/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-04-21 20:51:28
 * @LastEditTime: 2023-04-21 20:51:48
 * @FilePath: \helmet-project\src\plugins\myAxios.js
 */
/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2022-12-28 23:21:07
 * @LastEditTime: 2022-12-28 23:25:50
 * @FilePath: \yiyue-frontend\src\plugins\myAxios.js
 */
// Set config defaults when creating the instance
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8000'
});

//携带cookie
myAxios.defaults.withCredentials = true

// 添加请求拦截器
myAxios.interceptors.request.use(function(config) {

    console.log('发请求咯')
        // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response.data;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default myAxios;