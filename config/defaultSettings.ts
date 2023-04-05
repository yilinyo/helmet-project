/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-30 21:30:30
 * @LastEditTime: 2023-03-31 15:55:50
 * @FilePath: \helmet-project\config\defaultSettings.ts
 */
import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  "title": 'Helmet System',
  "navTheme": "realDark",
  "colorPrimary": "#722ED1",
  "layout": "mix",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "pwa": true,
  "logo": "https://yilin-1307688338.cos.ap-nanjing.myqcloud.com/blog/helmet.svg",
  "token": {}
 
};

export default Settings;

// {
//   navTheme: 'light',
//   // 拂晓蓝
//   colorPrimary: '#1890ff',
//   layout: 'mix',
//   contentWidth: 'Fluid',
//   fixedHeader: false,
//   fixSiderbar: true,
//   colorWeak: false,
//   title: 'Helmet System',
//   pwa: true,
//   logo: 'https://yilin-1307688338.cos.ap-nanjing.myqcloud.com/blog/helmet.svg',
//   iconfontUrl: '',
//   token: {
//     // 参见ts声明，demo 见文档，通过token 修改样式
//     //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
//   },
// }

