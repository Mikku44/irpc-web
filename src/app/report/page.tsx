"use client";
import Image from "next/image";
import { Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message } from "antd";
import type { GetProp, UploadProps } from "antd";
import Link from "next/link";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";
import { getLocation } from "../ultilities/Geolocation";
import { postData } from "../ultilities/api";

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







export default function Page() {

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>('0');

  const [imageUrl, setImageUrl] = useState<string>();
  const [images, setImages] = useState<any>();
  const [Info, setInfo] = useState("");
  const [Comment, setComment] = useState("");
  const [messageApi, contextHolder] = message.useMessage();


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

      setImages(info.file.originFileObj as File)
    }
  };
  const uploadButton = (
    <button className="" style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  const onSubmit = async () => {
    const userData = getArrayFromLocalStorage('user_data')
    const location : any = await getLocation();

    const data: any = {
      userUUID: userData?.user_id || "",
      userName: userData?.fullname || "",
      userTel: userData?.tel || "",
      userAddress: userData?.address || "",
      userLatLng: location?.LatLng || "",
      complainType: parseInt(type),
      complainTopic: Info,
      complainDetail: Comment,
      image: images || null
    }


    console.log(data);


    const formData = new FormData();

    for (var key in data) {
      formData.append(key, data[key]);
    }

    console.log("________ Form Data ________")

    const entries : any = formData.entries();
    for (let entry of entries) {
      const key = entry[0];
      const val = entry[1];
      console.log(key," : ", val);
    }
    console.log("__________ END ____________")


    await createData(formData);
  }

  const createData = async (formData:FormData) => {
    const result = await postData('/forWeb/postComplain.php',formData,true);
    console.log(result);
    if(result?.status == "error"){
      error(result?.message); 
    }else{
      success();
    }
  }


  const error = (msg?: any) => {
    messageApi.open({
        type: 'error',
        content: msg || 'เกิดปัญหาบางอย่าง โปรดลองใหม่ภายหลังหรือติดต่อเจ้าหน้าที่ช่องทางอื่น',
    });
};

const success = (msg?: any) => {
    messageApi.open({
        type: 'success',
        content: msg || 'ส่งข้อมูลให้เจ้าหน้าที่เรียบร้อยแล้ว',
    });
};



  return (
    <>
      {contextHolder}
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
            <form action={onSubmit}>
              {/* <div className="mb-4">
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
              </div> */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  ประเทภการร้องเรียน
                </label>
                <Select value={type} onChange={e => {
                  setType(e);
                  setInfo('');
                  setComment('');
                  setImageUrl('');
                }} className="w-full h-11" placeholder="เลือกประเภท">
                  <Select.Option value="0">แนะนำ,ติชม</Select.Option>
                  <Select.Option value="1">ร้องเรียน</Select.Option>
                  <Select.Option value="2">
                    เจ้าหน้าที่ติดต่อกลับ
                  </Select.Option>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  ข้อมูลเพิ่มเติม
                </label>
                <textarea
                  onChange={e => setInfo(e.target.value)}
                  placeholder="กรอกข้อมูล"
                  className="p-1 border-2 rounded-lg textarea textarea-bordered textarea-xl w-full h-[80px]  "
                ></textarea>
              </div>
              {type == "0" &&
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    ความคิดเห็น
                  </label>
                  <textarea
                    onChange={e => setComment(e.target.value)}
                    placeholder="ความคิดเห็น"
                    className="p-1 border-2 rounded-lg textarea textarea-bordered textarea-xl w-full h-[80px]  "
                  ></textarea>
                </div>
              }
              {type == "1" && <div className="flex mb-4">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader w-full"
                  showUploadList={false}
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
              </div>}
              {/* <p>จำกัดแค่สามรูป</p> */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                ส่งข้อมูลให้เจ้าหน้าที่
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
