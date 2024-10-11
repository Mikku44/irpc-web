"use client"
import Image from "next/image";
import { Input, Select } from 'antd';

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
            <div className="lg:block md:block hidden">
                <Image src="/images/Contentbackground.svg" alt={""} width={758} height={758} className="absolute left-[26%] w-full max-w-[758px] h-auto "></Image>
                <div className="flex flex-col items-center justify-center relative z-[1] pt-20 pb-10 ">
                    <div className="text-center mb-6">
                        <h2 className="text-[30px] font-bold mb-2">ลงทะเบียน</h2>
                        <p className="text-gray-600 text-[16px]">กรุณาใส่ข้อมูลเพื่อลงทะเบียนเข้าใช้งาน</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 mb-2">ชื่อและนามสกุล</label>
                                <Input className="p-3 w-full" placeholder="กรอกชื่อและนามสกุล" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                                <div className="flex">
                                    <Input addonBefore={selectBefore} classNames={{ input: "w-full p-3 " }} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                <Input className="p-3 w-full " placeholder="กรอกอีเมลของคุณ" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                <Input.Password className="p-3 w-full " placeholder="รหัสผ่าน" />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">ลงทะเบียน</button>
                        </form>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-gray-600">มีบัญชีผู้ใช้แล้ว? <a href="#" className="text-blue-500 font-bold">เข้าสู่ระบบ</a></p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center relative z-[1] mt-10 pt-10  pb-10  lg:hidden md:hidden ">
                <div className="text-center mb-6">
                    <h2 className="text-[30px] font-bold mb-2">ลงทะเบียน</h2>
                    <p className="text-gray-600 text-[16px]">กรุณาใส่ข้อมูลเพื่อลงทะเบียนเข้าใช้งาน</p>
                </div>
                <div className=" w-full max-w-md">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 mb-2">ชื่อและนามสกุล</label>
                            <Input className="p-3 w-full" placeholder="กรอกชื่อและนามสกุล" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                            <div className="flex">
                                <Input addonBefore={selectBefore} classNames={{ input: "w-full p-3 " }} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                            <Input type="email" className="p-3 w-full " placeholder="กรอกอีเมลของคุณ" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                            <Input.Password className="p-3 w-full " placeholder="รหัสผ่าน" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">ลงทะเบียน</button>
                    </form>
                </div>
                <div className="text-center mt-6">
                    <p className="text-gray-600">มีบัญชีผู้ใช้แล้ว? <a href="#" className="text-blue-500 font-bold">เข้าสู่ระบบ</a></p>
                </div>
            </div>

        </>
    );
}
