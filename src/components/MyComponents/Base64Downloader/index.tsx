/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-04-22 18:04:08
 * @LastEditTime: 2023-04-22 18:04:18
 * @FilePath: \helmet-project\src\components\MyComponents\Base64Downloader\index.tsx
 */
import React, { useState } from 'react';

interface Props {
  base64: string;
}

const Base64ImageDownloader: React.FC<Props> = ({ base64 }) => {
  const [url, setUrl] = useState<string | null>(null);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = url!;
    link.download = 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToBlob = () => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeString });
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };

  return (
    <>
      <button onClick={convertToBlob}>Convert to Image</button>
      {url && <button onClick={downloadImage}>Download Image</button>}
      {url && <img src={url} alt="Downloaded Image" />}
    </>
  );
};

export default Base64ImageDownloader;
