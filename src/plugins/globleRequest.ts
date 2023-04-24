/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-31 14:20:20
 * @LastEditTime: 2023-04-24 01:09:46
 * @FilePath: \helmet-project\src\plugins\globleRequest.ts
 */


/** 全局响应拦截请求器
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';

import { history } from '@@/core/history';
import { stringify } from 'querystring';
import { message } from 'antd';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
/**
 * 请求前缀
 */
  prefix:
    process.env.NODE_ENV === 'production' ? 'http://demo.yctor.icu' : 'http://localhost:8000',
  
});

/**np
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`);

  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();

  if (res.code === 0) {
   
    return res.data;
  }

  if (res.code === 40001) {
    message.error('请先登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
    return res.data;
  } else if (res.data === null) {
    message.error(res.description);
    return res.data;
    // message.error('??');
  }
  
  return res;
});

export default request;
