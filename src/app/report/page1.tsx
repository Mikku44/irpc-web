"use client"; // เพิ่มบรรทัดนี้เพื่อบอกว่าไฟล์นี้เป็น Client Component

import React, { useState } from "react";
import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";
import type { CascaderProps } from "antd";
import { Cascader } from "antd";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { Select, Space } from "antd";

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

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }

  const options: Option[] = [
    {
      value: "zhejiang",
      label: "Zhejiang",
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
      value: "jiangsu",
      label: "Jiangsu",
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
        <p className="text-center truncate h-10 text-2xl font-extrabold">
          การแนะนำติชม
        </p>
        <p className="text-center truncate p-7">กรอกข้อมูล</p>
      </div>

      <Form
        className=" w-full flex flex-col items-center"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <p className="">ชื่อและนามสกุล</p>
        <div className="">
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "กรุณากรอกชื่อและนามสกุล!" }]}
          >
            <Input placeholder="กรอกชื่อและนามสกุล" className="w-full" />
          </Form.Item>
        </div>

        <p className="">เบอร์โทรศัพท์</p>
        <div className=" pb-7 w-[400px]">
          <Input
            addonBefore={selectBefore}
            classNames={{ input: "w-[full] " }}
            defaultValue=""
            placeholder="000-000-0000"
          />
        </div>

        <p className=" text-sm">ประเทภการร้องเรียน</p>
        <div className="">
          <Select className="w-[400px] " placeholder="เลือกประเภท">
            <Select.Option value="sample1">sffss</Select.Option>
            <Select.Option value="sample2">Sample</Select.Option>
            <Select.Option value="sample3">Sample</Select.Option>
          </Select>
        </div>
        <div>
          <p className=" text-sm pt-7">ข้อมูลเพิ่มเติม</p>
          <textarea
            placeholder=""
            className="textarea textarea-bordered textarea-xl w-[400px] h-[80px]  "
          ></textarea>
        </div>
        <div className="relative top-0 left-[375px] pt-3">
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", maxWidth: "600px" }}
            >
              ส่งข้อมูล
            </Button>
            <p className="underline decoration-1 cursor-pointer m-5 text-center">
              ประวัติการใช้งาน
            </p>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
