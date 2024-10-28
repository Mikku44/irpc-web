"use client";
import Image from "next/image";
import { Input, Select, Upload } from "antd";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message } from "antd";
import type { GetProp, UploadProps } from "antd";
import Link from "next/link";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const { Option } = Select;
const selectBefore = (
  <Select defaultValue="66">
    <Option value="66">66</Option>
    <Option value="67">65</Option>
  </Select>
);
export default function Login() {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button className="" style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <div className="">
        {/* <Image
          src="/images/Contentbackground.svg"
          alt={""}
          width={758}
          height={758}
          className="absolute left-[26%] w-full max-w-[758px] h-auto "
        ></Image> */}
        <div className="flex flex-col items-center justify-center relative z-[1] pt-5 pb-5 ">
          <div className="text-center mb-6">
            <h2 className="text-[30px] font-bold mb-2"> การแนะนำติชม</h2>
            <p className="text-gray-600 text-[16px]">กรอกข้อมูล</p>
          </div>
          <div className="p-8 rounded-lg w-full max-w-md">
            <form>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 mb-2">
                  ชื่อและนามสกุล
                </label>
                <Input
                  className="p-3 w-full"
                  placeholder="กรอกชื่อและนามสกุล"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <div className="flex">
                  <Input
                    addonBefore={selectBefore}
                    classNames={{ input: "w-full p-3 " }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  ประเทภการร้องเรียน
                </label>
                <Select className="w-full h-11" placeholder="เลือกประเภท">
                  <Select.Option value="sample1">แนะนำ,ติชม</Select.Option>
                  <Select.Option value="sample2">ร้องเรียน</Select.Option>
                  <Select.Option value="sample3">
                    เจ้าหน้าที่ติดต่อกลับ
                  </Select.Option>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  ข้อมูลเพิ่มเติม
                </label>
                <textarea
                  placeholder="กรอกข้อมูล"
                  className="p-1 border-2 rounded-lg textarea textarea-bordered textarea-xl w-full h-[80px]  "
                ></textarea>
              </div>
              <div className="flex mb-4">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader w-full"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton 
                  )}
                </Upload>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader w-full"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton 
                  )}
                </Upload>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader w-full"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton 
                  )}
                </Upload>
              </div>
                  {/* <p>จำกัดแค่สามรูป</p> */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                ส่งข้อมูล
              </button>
            </form>
          </div>
          <div className="text-center ">
            <Link href="/report/history">
              <p className="underline decoration-1 cursor-pointer  text-center">
                ประวัติการใช้งาน
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
