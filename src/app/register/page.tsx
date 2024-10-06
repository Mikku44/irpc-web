"use client"
import Image from "next/image";
import { Checkbox, Input, Select } from 'antd';

const { Option } = Select;
const selectBefore = (
    <Select defaultValue="66">
        <Option value="66">66</Option>
        <Option value="67">65</Option>
    </Select>
);
export default function Login() {
    return (
        <>
            <div className="bg-gray-50 flex flex-col items-center justify-center pt-20 pb-10">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">ลงทะเบียน</h2>
                    <p className="text-gray-600">กรุณาใส่ข้อมูลเพื่อลงทะเบียนเข้าใช้งาน</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 mb-2">ชื่อและนามสกุล</label>
                            <input type="text" id="fullName" placeholder="กรอกชื่อและนามสกุล" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                            <div className="flex">
                                <Input addonBefore={selectBefore}  classNames={{input:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"}}/>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                            <input type="email" id="email" placeholder="กรอกอีเมลของคุณ" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                            <input type="password" id="password" placeholder="รหัสผ่าน" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">ลงทะเบียน</button>
                    </form>
                </div>
                <div className=" text-center mt-6">
                    <p className="text-gray-600">มีบัญชีผู้ใช้แล้ว? <a href="#" className="text-blue-500">เข้าสู่ระบบ</a></p>
                </div>
            </div>

        </>
    );
}
