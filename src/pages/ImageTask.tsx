/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-30 23:44:43
 * @LastEditTime: 2023-03-31 02:39:22
 * @FilePath: \helmet-project\src\pages\ImageTask.tsx
 */

import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Col, Divider, message, Row, theme, Upload, UploadProps,Image, Button, Statistic } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import React, { useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, DownloadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './style.less';
import MyButton from '@/components/MyComponents/Button';
/**
 *  图像识别
 * @param param0
 * @returns
 */

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


const ImageTask: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
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


          
      
        <Row>
      <Col span={4}></Col>
          <Col span={4}><MyButton context='识别'></MyButton></Col>
          <Col span={7}></Col>
      <Col span={4}><MyButton context='导出'></MyButton></Col>
      <Col span={1}></Col>
       </Row>

        {/* <Upload
        name="avatar"
        listType="picture-card"
        className={styles.co1}
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange} 
          
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200%'}} /> : uploadButton}
        </Upload> */}

        <Card style={{ width: "100%" }}>
        <Row>
      <Col span={12}>原图：<Image
            width={'95%'}
            height={'100%'}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          </Col>
          <Col span={12}  >
          识别：<Image
            width={'95%'}
            height={'100%'}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
     
      </Col>
    </Row>
        </Card>
        

   
       
      </Card>
      <br/>
      <br/>
      
      <Row gutter={16}>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
        
    </PageContainer>
  );
};

export default ImageTask;
