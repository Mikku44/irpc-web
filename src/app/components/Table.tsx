'use client'
import React from 'react';
import { Table as AntTable, Button } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

// interface DataType {
//   key: React.Key;
//   name: string;
//   chinese: number;
//   math: number;
//   english: number;
// }

// const columns: TableColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Chinese Score',
//     dataIndex: 'chinese',
//     sorter: {
//       compare: (a, b) => a.chinese - b.chinese,
//       multiple: 3,
//     },
//   },
//   {
//     title: 'Math Score',
//     dataIndex: 'math',
//     sorter: {
//       compare: (a, b) => a.math - b.math,
//       multiple: 2,
//     },
//   },
//   {
//     title: 'English Score',
//     dataIndex: 'english',
//     sorter: {
//       compare: (a, b) => a.english - b.english,
//       multiple: 1,
//     },
//   },
// ];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     chinese: 98,
//     math: 60,
//     english: 70,
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     chinese: 98,
//     math: 66,
//     english: 89,
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     chinese: 98,
//     math: 90,
//     english: 70,
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     chinese: 88,
//     math: 99,
//     english: 89,
//   },
// ];

const onChange: TableProps['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default function Table({columns,data,className}:any){
    return   <div className=" border w-full  border-1 rounded-xl overflow-hidden shadow-md ">
    <AntTable className={`${className} w-fit min-w-full `} columns={columns} dataSource={data} pagination={false}  virtual onChange={onChange} />
    <div className="bg-[#fafafa] flex justify-between p-3">
      <div className="text-sm">{`หน้าที่ 1 จาก 10`}</div>
      <div className="text-sm"><Button>ถัดไป</Button></div>
      </div>
    </div>
}