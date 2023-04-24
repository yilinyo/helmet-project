/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-30 23:44:43
 * @LastEditTime: 2023-04-25 02:08:55
 * @FilePath: \helmet-project\src\pages\VideoTask.tsx
 */

import { PageContainer } from '@ant-design/pro-components';
import { useState, useEffect, useRef } from 'react';
import { useModel } from '@umijs/max';
import { Card,  message,   Upload, UploadProps, Badge, Space } from 'antd';

import './style.less';
import { Player } from 'video-react';
import { Col, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import MyButton from '@/components/MyComponents/Button';
import {download, getPredictVideo} from '@/api/file';
// import myAxios from '@/plugins/myAxios';

const { Dragger } = Upload;


function getFileUrl(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
}



function VideoFrame({ src, fps }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const ws = useRef();
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(100)
  const [img, setImg] = useState()
  const [ctx,setCtx] = useState();
  const [interval, setInter] = useState()
  const [timeId, setTimeId] = useState()
  const reconnecting = useRef(true); // 标记 WebSocket 是否正在重新连接
  // websocket连接
  const connectWebSocket = () => {
    ws.current = new WebSocket('ws://127.0.0.1:8000/wb/ws');
    ws.current.onopen = () => {
      // WebSocket 连接成功时将 reconnecting 标记设为 true
      reconnecting.current = true;
    };
    ws.current.onmessage = (e) => {
      setImg(e.data);
    };
  
    ws.current.onclose = () => {
      // 当 reconnecting 标记为 true 时进行自动重连
      if (reconnecting.current) {
        setTimeout(() => {
          console.log('WebSocket 断开，尝试重新连接...');
          // 尝试重新连接时将 reconnecting 标记设为 false
          reconnecting.current = false;
          connectWebSocket()
  
        }, 600);
      }
    };
  };

// 启动
  useEffect(() => {

    connectWebSocket()
  return () => {
    ws.current?.close();
  };
}, [reconnecting]);

// 手动关闭 WebSocket
const handleCloseWebSocket = () => {
  ws.current?.close();
  // 将 reconnecting 标记设为 false，避免自动重连
  reconnecting.current = false;
  console.log("手动关闭连接")
  };
  // 自动关闭 WebSocket
  const handleOpenWebSocket = () => {
    console.log("手动开启连接")
    connectWebSocket()
  }



  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;
    const {width , height} = video.getBoundingClientRect()
    const interval = 1000 / fps;
    setWidth(width)
    setHeight(height)
    setCtx(ctx);
    setInter(interval)
  }, [videoRef, canvasRef, fps]);

  const captureFrame = async () => {
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    ctx.drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL('image/jpeg');
    // const res = await getHandelImg(data)
    // setImg(res.data)
    if(reconnecting.current)
      ws.current.send(data)
   
  };

  const clickButton = () => {
      if (videoRef.current.paused) {
        videoRef.current.play();
        if (reconnecting.current)
        {
         
          setTimeId(setInterval(captureFrame, interval));

        }
        else
          console.log("websocket断开当前")
      } else {
        videoRef.current.pause();
        clearInterval(timeId);
     
      }
    }  

  return (
    <>
      
      <Row align='middle'>
        <Col span={12} align='middle'>
        
   
      <video ref={videoRef} 
    src={src} muted loop style={{ width: "80%" }} />
      

      </Col>
      <Col span={12} align='middle'> 

     <img src={img}   style={{ width: "80%" }} />
 

  </Col>
    </Row>
          
     


      <canvas ref={canvasRef} width={width} height={height} style={{ display: "none" }} />

      <br />
      <Row align='middle'>
      <Col span={24} align='middle'>
          <MyButton context='继续/暂停' onClick={()=>{clickButton()}}></MyButton>
        </Col>
      </Row>
      
{/*       
      <button onClick={clickButton}>Start / End</button>
      <button onClick={handleCloseWebSocket}>stop</button>
      <button onClick={handleOpenWebSocket}>start</button> */}
     
    </>
  );
}




/**
 *  视频识别
 * @param param0
 * @returns
 */



const VideoTask: React.FC = () => {

  const { initialState } = useModel('@@initialState');
  const [videoUrl, setVideoUrl] = useState();
  const [isShow, setIsShow] = useState(false);
  const [targetName, setTargetName] = useState("");
  const [targetPath, setTargetPath] = useState("")



  
const clickButton =  async () => {

  message.loading('正在加载中...', 0);


  const res = await getPredictVideo(targetName)

  if (res.data === 0) {
    
 
    message.destroy()
    message.success("后台识别成功", 5)
    
    setIsShow(true)


  }
  else {
    message.destroy()
    message.error("失败")

  }

  

}  
  


  const props: UploadProps = {
    name: 'file_my',
    action: 'http://localhost:8000/api/video/upload',

    accept:'video/*',
    withCredentials: true,
    async onChange(info) {
      const { status, originFileObj } = info.file;

      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
  
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        const url: any = await getFileUrl(originFileObj);
        // console.log(url)
        setVideoUrl(url);
        
        // console.log(info.file.response.fileName)
          
        setTargetName(info.file.response.fileName)

        
        setTargetPath(info.file.response.targetPath)
        
      
       
      // await getPredictVideo(info.file.name)

      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
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
         实时检测区(延迟取决于网络、机器性能)
        </Space>
        <br />
        <br/>

        <VideoFrame src={videoUrl} fps={3}  ></VideoFrame>
        <br />


        <Space>
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
          <Badge status="warning" />
          结果 后台不掉帧识别(耗时长)
        </Space>

         <br/>
         <br/>

        <Row align='middle'>

         

        <Col span={8} align='middle'><MyButton context='后台识别' onClick={()=>{clickButton()}} ></MyButton>  </Col>

          <Col span={8} align='middle'><MyButton context='播放' onClick={() => {
            if (targetPath === "") {
              message.error("文件还没准备好~")
              return
            }
            
            setIsShow(true)
          }} ></MyButton>  </Col>

          <Col span={8} align='middle'><MyButton context='导出文件' onClick={async () => {
               if (targetPath === "") {
                message.error("文件还没准备好~")
                return
            }


            const payload = { 'filename':targetPath};

            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            };

            fetch(`http://localhost:8000/api/video/download`,requestOptions)
            .then(response => {
              // 将响应转换为 blob
              response.blob().then(blob => {
                // 创建一个链接，并为它添加 URL
                const url = window.URL.createObjectURL(blob);
                // 创建一个 <a> 元素并为其添加 URL 和 download 属性
                const a = document.createElement('a');
                a.href = url;
                a.download = targetName;
                // 点击链接并删除它
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              });
            });

            
            

            // await download(targetPath)



}}></MyButton></Col>
     
        </Row>

        <br/>

           {isShow? <Player
          
          width={100}
          height={100}
          src={`http://localhost:8000/static${targetPath}`}
        />:""}
        
 
        
        <br />
        <br/>
        
     
  

          
      
        
      </Card>
   
        
    </PageContainer>
  );
};

export default VideoTask;
