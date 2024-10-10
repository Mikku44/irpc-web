"use client";  // เพิ่มบรรทัดนี้เพื่อบอกว่าไฟล์นี้เป็น Client Component

import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Select, Space } from 'antd';


export default function Report() {

  type FieldType = {
    username?: string;
    number?: string;
    remember?: string;
  };

  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">+66</Option>
      <Option value="https://">+55</Option>
    </Select>
  );

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }

  const options: Option[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      // children: [
      //   {
      //     value: 'hangzhou',
      //     label: 'Hangzhou',
      //     children: [
      //       {
      //         value: 'xihu',
      //         label: 'West Lake',
      //       },
      //     ],
      //   },
      // ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      // children: [
      //   {
      //     value: 'nanjing',
      //     label: 'Nanjing',
      //     children: [
      //       {
      //         value: 'zhonghuamen',
      //         label: 'Zhong Hua Men',
      //       },
      //     ],
      //   },
      // ],
    },
  ];


  return (
    <>
      <div className="pt-10 ">
        <p className="text-center truncate h-10 text-2xl font-extrabold">การแนะนำติชม</p>
        <p className="text-center truncate p-7">กรอกข้อมูล</p>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <p className="relative top-0 left-[574px]">ชื่อและนามสกุล</p>
        <div className='relative top-0 left-[574px]'>
          <Form.Item<FieldType >
            name="username"
            rules={[{ required: true, message: 'กรุณากรอกชื่อและนามสกุล!' }]}
            style={{ width: '100%', maxWidth: '600px' }}
          >
            <Input placeholder="กรอกชื่อและนามสกุล" className="w-full" />
          </Form.Item>
        </div>

        <p className="relative top-0 left-[574px]">เบอร์โทรศัพท์</p>
        <div className='relative top-0 left-[574px] pb-7 w-[400px]'>
        
            <Input addonBefore={selectBefore} classNames={{input : "w-[full] "} }
              
              defaultValue="" placeholder='000-000-0000' />
        </div>

        <p className="relative top-0 left-[574px] text-sm">ประเทภการร้องเรียน</p>
        <div className="relative top-0 left-[574px]">
          <Cascader options={options}  style={{ width: 400 }} placeholder="เลือกประเภท" />
        </div>

        <p className="relative top-0 left-[574px] text-sm pt-7">ข้อมูลเพิ่มเติม</p>
        <textarea placeholder=""
          className="textarea textarea-bordered textarea-xl w-[400px] h-[80px]  relative top-0 left-[574px]"></textarea>
       
        <div className='relative top-0 left-[375px] pt-3'>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%', maxWidth: '600px' }}>
              ส่งข้อมูล
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
