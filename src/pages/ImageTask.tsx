/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-30 23:44:43
 * @LastEditTime: 2023-04-24 22:41:44
 * @FilePath: \helmet-project\src\pages\ImageTask.tsx
 */
/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-30 23:44:43
 * @LastEditTime: 2023-04-24 02:12:36
 * @FilePath: \helmet-project\src\pages\ImageTask.tsx
 */

import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Col,message, Row, Upload, UploadProps,Image, Button, Statistic } from 'antd';
import { RcFile,  } from 'antd/es/upload';
import React, { useState } from 'react';
import { Table } from 'antd';
import MyButton from '@/components/MyComponents/Button';
import { ColumnsType } from 'antd/es/table';

/**
 *  图像识别
 * @param param0
 * @returns
 */

interface DataType {
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
  confidence: number,
 class: number,
  name: string
  
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Confidence',
    dataIndex: 'confidence',
    key: 'confidence',
  },
  {
    title: 'Xmin',
    dataIndex: 'xmin',
    key: 'xmin',
  },
  {
    title: 'Ymin',
    dataIndex: 'ymin',
    key: 'ymin',
  },
  {
    title: 'Xmax',
    dataIndex: 'xmax',
    key: 'xmax',
  },
  {
    title: 'Ymax',
    dataIndex: 'ymax',
    key: 'ymax',
  },

];


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


// function removeFileExtension(name: string): string {
//   const lastIndex = name.lastIndexOf(".");
//   if (lastIndex === -1) {
//     return name;
//   }
//   return name.substring(0, lastIndex);
  
// }
  


const mergeList = (list: { [key: string]: Obj[] }) => {
  
  let mergeList:DataType[] = []

  for (const key in list) {
    if (Object.prototype.hasOwnProperty.call(list, key)) {
      
      const tmpList: DataType[] = [...list[key]]
      
      mergeList = [...mergeList,...tmpList]
    }

  }
    
  
return mergeList


}



const ImageTask: React.FC = () => {

  const { initialState } = useModel('@@initialState');

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  //base64
  const [imageTarget, setImageTarget] = useState<string>("");

  const[data,setData] = useState<DataType[]>([])

  const downloadImage = (fileName: string) => {
    

    if (imageTarget === "") {
      message.error(`请上传文件.`);
      return
    }
    const link = document.createElement('a');
    link.href = imageTarget!;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success(`${fileName} 导出成功`);
  };
  

  const props: UploadProps = {
    name: 'file_my',
    action: 'http://localhost:8000/api/file/target',
    withCredentials: true,

    accept:'image/*',
    
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj as RcFile, (url) => {
          // console.log(url)
          
          setImageUrl(url)
          console.log(info.file)
          setImageName(info.file.name)
        });
          //目标 图像
        setImageTarget(info.file.response.data)
          //目标 info
        setData(mergeList(info.file.response.list))
        
        
        message.success(`${info.file.name} 识别成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
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


        
        <br/>
      <br/>
      
        <Row align='middle'>
          {/* <Col span={4}></Col> */}
          
          
          <Col span={12} align='middle'><Upload {...props}><MyButton context='开始' onClick={()=>{console.log(1)}} ></MyButton>   </Upload></Col>

          
          {/* <Col span={7}></Col> */}
      <Col span={12} align='middle'><MyButton context='导出'onClick={()=>{downloadImage(`识别后_${imageName}`)}}></MyButton></Col>
      {/* <Col span={1}></Col> */}
        </Row>
        

        <br/>
     

    

        <Card style={{ width: "100%" }}>
        <Row align='middle'>
      <Col span={12} align='middle'>原图📤<Image
            width={'95%'}
            height={'100%'}
              src={imageUrl}
              fallback='/image/upload.svg'
              preview={false}
              
          />
          </Col>
          <Col span={12}  align='middle'>
          识别📥<Image
            width={'95%'}
            height={'100%'}
                src={imageTarget}
                preview={false}

                fallback='/image/target.svg'
              />
     
      </Col>
    </Row>
        </Card>
        

   
       
      </Card>
      <br/>
      <br/>
      
      
        <Card><Table columns={columns} dataSource={data} /></Card>


        
    </PageContainer>
  );
};

export default ImageTask;
