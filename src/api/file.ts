/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-04-19 18:13:42
 * @LastEditTime: 2023-04-24 21:34:38
 * @FilePath: \helmet-project\src\api\file.ts
 */
import axios from "@/plugins/myAxios"
// async function getHandelImg(sendData) {

  
//     const res = await axios.post('/wb/image', {

//    'imageData':sendData
  
//    })
  
//    return res
  

// }

async function getPredictVideo(filename) {

  
  const res = await axios.post('/api/video/predict', {

 'filename':filename

 })

 return res


}


async function getMyrRecords() {

  
  const res = await axios.get('/api/admin/me')

 return res


}

async function getAllRecords() {

  
  const res = await axios.get('/api/admin/all')

  return res


  
}

async function download(filename) {

  
  const res = await axios.post('api/video/download', {

    'filename':filename
   
    })

  return res

}
  
  export {getPredictVideo,getMyrRecords,getAllRecords,download} 

  

