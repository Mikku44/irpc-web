"use client"
import Image from "next/image"
import Link from "next/link";
import { Checkbox, Input, message } from 'antd';
import { postData } from "../ultilities/api";
import { useState } from "react";

export default function Login() {

    const fetchData = async () => {
        if (validateEmail(email)) {
            const result = await postData('/forWeb/login.php', {
                "email": email,
                "password": password
            })
        }
        error()
    }

    const [email, setEmail] = useState("")
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const [password, setPassword] = useState("")
    const [messageApi, contextHolder] = message.useMessage();
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบว่ามี “@” และโดเมน เช่น .com หรือ .co.th',
        });
    };

    return (
        <>
            {contextHolder}
            <div className="lg:block md:block hidden">
                <Image src="/images/Contentbackground.svg" alt={""} width={758} height={758} className="absolute left-[26vw]"></Image>
                <div className="flex flex-col items-center justify-center h-[80vh] pt-10 relative z-[1]">
                    <div className="text-center mb-6">
                        <h2 className="text-[30px] font-bold mb-2">ยินดีต้อนรับ!</h2>
                        <p className="text-gray-600 text-[16px]">กรุณาใส่อีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <form action={fetchData}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                <Input type="email" onChange={e => setEmail(e.target.value)} className="p-3" placeholder="กรอกอีเมลของคุณ" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                <Input.Password onChange={e => setPassword(e.target.value)} className="p-3" placeholder="รหัสผ่าน" minLength={8} />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Checkbox onChange={e => console.log('add')}>จดจำรหัสผ่าน</Checkbox>
                                </div>
                                <a href="#" className="text-blue-500">ลืมรหัสผ่าน?</a>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">เข้าสู่ระบบ</button>
                        </form>
                        <div className="text-center mt-6 ">
                            <p className="text-gray-600"> ยังไม่มีบัญชีผู้ใช้? <Link href="/register" className="text-blue-500 font-bold">ลงทะเบียน</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center h-[80vh] mt-10 relative z-[1] lg:hidden md:hidden ">
                <div className="flex flex-col items-center justify-center h-[80vh] pt-10 relative z-[1]">
                    <div className="text-center mb-6">
                        <h2 className="text-[30px] font-bold mb-2">ยินดีต้อนรับ!</h2>
                        <p className="text-gray-600 text-[16px]">กรุณาใส่อีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ</p>
                    </div>
                    <div className="p-8 rounded-lg w-full">
                        <form action={fetchData}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                <Input onChange={e => setEmail(e.target.value)} className="p-3" placeholder="กรอกอีเมลของคุณ" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                <Input.Password onChange={e => setPassword(e.target.value)} className="p-3" placeholder="รหัสผ่าน" />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Checkbox onChange={e => console.log('add')}>จดจำรหัสผ่าน</Checkbox>
                                </div>
                                <a href="#" className="text-blue-500">ลืมรหัสผ่าน?</a>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" >เข้าสู่ระบบ</button>
                        </form>
                        <div className="text-center mt-6 ">
                            <p className="text-gray-600"> ยังไม่มีบัญชีผู้ใช้? <Link href="/register" className="text-blue-500 font-bold">ลงทะเบียน</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
