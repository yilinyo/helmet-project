/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2022-09-19 18:48:20
 * @LastEditTime: 2023-04-25 00:19:45
 * @FilePath: \helmet-project\src\pages\Admin.tsx
 */

import React, { useRef } from 'react';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';


import { Image } from 'antd';
import { isNull } from 'lodash';
import { getAllRecords, } from '@/api/file';
import { isUrl } from '@ant-design/pro-components';

function isPath(str): boolean {
  // 定义匹配路径的正则表达式
  const reg = /^\/?[A-Za-z0-9]+\/[A-Za-z0-9]+(\/[A-Za-z0-9]+)*(\.[A-Za-z0-9]+)?$/;

  // 匹配字符串并返回结果
  return reg.test(str);
}

interface Record {
  id: number;
  fileName: string;
  userAccount: string;
  recordType: number;
  recordInfo?: string;
  sourceUrl?: string;
  targetUrl?: string;
  createTime: string;
  updateTime: string;
}

const columns: ProColumns<Record>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
  
    ellipsis: true,
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '源文件',
    dataIndex: 'avatarUrl',
    search: false,
    render: (_, record) => (
      <div>
      { 
        record.recordType === 1?
          
          <a href={`http://localhost:8000${record.sourceUrl.slice(1)}`}>{record.sourceUrl.slice(1)}</a>
          :
          <Image
          src={isNull(record.targetUrl) ? 'error' : record.targetUrl}
          width={100}
          height={100}
          fallback="https://yilin-1307688338.cos.ap-nanjing.myqcloud.com/blog/helmet.svg"
          />

          
      
      }
    </div>
    ),
  },
  {
    title: '目标文件',
    dataIndex: 'targetUrl',
    search: false,
    render: (_, record) => (
      <div>
        { 
          record.recordType === 1?
            
            <a href={`http://localhost:8000${record.targetUrl.slice(1)}`}>{record.targetUrl.slice(1)}</a>
            :
            <Image
            src={isNull(record.targetUrl) ? 'error' : record.targetUrl}
            width={100}
            height={100}
            fallback="https://yilin-1307688338.cos.ap-nanjing.myqcloud.com/blog/helmet.svg"
            />

            
        
        }
      </div>
    ),
  },
  {
    title: '类别',
    dataIndex: 'recordType',

    valueType: 'select',
    valueEnum: {
      0: { text: '图片', status: 'Default' },
      1: { text: '视频', status: 'Default' },
    },
  },
  {
    title: '信息',
    dataIndex: 'recordInfo',
    copyable: true,
    ellipsis: true,
  },
 
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },


];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<Record>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}) => {
        console.log(params);

      

        const res = await getAllRecords()

        return {
          data: res.data,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search ={false}
     
      // form={{
      //   // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
      //   syncToUrl: (values, type) => {
      //     if (type === 'get') {
      //       return {
      //         ...values,
      //         created_at: [values.startTime, values.endTime],
      //       };
      //     }
      //     return values;
      //   },
      // }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
