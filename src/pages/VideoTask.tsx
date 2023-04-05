/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-30 23:44:43
 * @LastEditTime: 2023-03-31 13:09:37
 * @FilePath: \helmet-project\src\pages\VideoTask.tsx
 */

import { PageContainer } from '@ant-design/pro-components';
import { useState, useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Card, Col, Divider, message, Row, theme, Upload, UploadProps, Badge, Space } from 'antd';
import { Line } from '@ant-design/plots';



import './style.less';
import { Player } from 'video-react';

import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
/**
 *  视频识别
 * @param param0
 * @returns
 */
const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


const VideoTask: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');

  const [data, setData] = useState([]);

  // charts data
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  useEffect(() => {
    asyncFetch();
  }, []);


  //charts config
const config = {
  data,
  xField: 'year',
  yField: 'gdp',
  seriesField: 'name',
  yAxis: {
    label: {
      formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
    },
  },
  legend: {
    position: 'top',
  },
  smooth: true,
  // @TODO 后续会换一种动画方式
  animation: {
    appear: {
      animation: 'path-in',
      duration: 5000,
    },
  },
};

 
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
  <Space>
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
          <Badge status="warning" />
          上传区
        </Space>
        <br />
        <br/>
<Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击上传视频</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
        </Dragger>

        <br />
       
        
        <Space>
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
          <Badge status="warning" />
          结果区
        </Space>
        <br />
        <br/>
   
        <Player
      playsInline
      poster="/assets/poster.png"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        />
        
        <br />
        
        <Space>
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
          <Badge status="warning" />
          分析区
        </Space>
        <br />
        <br/>
        <Line {...config} />

          
      
        
      </Card>
   
        
    </PageContainer>
  );
};

export default VideoTask;
