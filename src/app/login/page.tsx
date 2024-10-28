"use client"
import Image from "next/image"
import Link from "next/link";
import { Checkbox, Input, message } from 'antd';
import { postData } from "../ultilities/api";
import { useEffect, useState } from "react";
;
import { saveArrayToLocalStorage } from "../ultilities/localStorageManager";


export default function Login() {

    const [type, setType] = useState('');
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setType(params.get('type') || '');
    }, []);

    const fetchData = async () => {
        if (type === "user") {
            if (validateEmail(email)) {
                const result = await postData('/forWeb/login.php', {
                    "email": email,
                    "password": password,
                    "role": "client"
                })
                // console.log(result);
                if (result?.status === "ok") {
                    success();
                    const userData = result.user_data
                    saveArrayToLocalStorage("user_data", {
                        fullname: userData.fullname,
                        role: userData.role,
                        user_id: userData.user_id,
                        email: userData.email,
                    }
                    )
                    saveArrayToLocalStorage("token", result.token)

                    if (remind) {
                        localStorage.setItem('email', email)
                        localStorage.setItem('password', password)
                    }

                    return window.location.replace("/")
                }
                return error("อีเมล์หรือรหัสผ่านไม่ถูกต้อง")
            }
        } else if (type === "admin") {
            const result = await postData('/forWeb/login.php', {
                "email": email,
                "password": password,
                "role": "admin"
            })
            if (result?.status === "ok") {
                success();
                const userData = result.user_data
                saveArrayToLocalStorage("user_data", {
                    fullname: userData.fullname,
                    role: userData.role,
                    user_id: userData.user_id,
                    email: userData.email,
                }
                )
                saveArrayToLocalStorage("token", result.token)

                if (remind) {
                    localStorage.setItem('email', email)
                    localStorage.setItem('password', password)
                }

                return window.location.replace("/")
            }

        }
        error()
    }

    const [remind, setRemind] = useState(false);

    const [email, setEmail] = useState("")
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const [password, setPassword] = useState("")
    const [messageApi, contextHolder] = message.useMessage();
    const error = (msg?: any) => {
        messageApi.open({
            type: 'error',
            content: msg || 'รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบว่ามี “@” และโดเมน เช่น .com หรือ .co.th',
        });
    };

    const success = (msg?: any) => {
        messageApi.open({
            type: 'success',
            content: msg || 'เข้าสู่ระบบสำเร็จ',
        });
    };

    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        setEmail(email || "");
        setPassword(password || "");
    }, [])



    return (
        <>
            {contextHolder}
            {type == "user" && <>

                <div className="lg:block md:block hidden">
                    <Image src="/images/Contentbackground.svg" alt={""} width={758} height={758} className="absolute lg:left-[26vw]"></Image>
                    <div className="flex flex-col items-center justify-center h-[80vh] pt-10 relative z-[1]">
                        <div className="text-center mb-6">
                            <h2 className="text-[30px] font-bold mb-2">ยินดีต้อนรับ!</h2>
                            <p className="text-gray-600 text-[16px]">กรุณาใส่อีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                            <form action={fetchData}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="p-3" placeholder="กรอกอีเมลของคุณ" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                    <Input.Password value={password} onChange={e => setPassword(e.target.value)} className="p-3" placeholder="รหัสผ่าน" minLength={8} />
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
                        <div className="lg:p-8 rounded-lg w-full p-1">
                            <form action={fetchData}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="p-3" placeholder="กรอกอีเมลของคุณ" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                    <Input.Password value={password} onChange={e => setPassword(e.target.value)} className="p-3" placeholder="รหัสผ่าน" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <Checkbox value={remind} onChange={e => setRemind((prev: boolean) => !prev)}>จดจำรหัสผ่าน</Checkbox>
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
            }


            {type == "admin" && <>

                <div className="">
                    <Image src="/images/Contentbackground.svg" alt={""} width={758} height={758} className="absolute lg:left-[26vw] lg:block hidden"></Image>
                    <div className="flex flex-col items-center justify-center h-[80vh] pt-10 relative z-[1]">
                        <div className="text-center mb-6">
                            <h2 className="text-[30px] font-bold mb-2">ยินดีต้อนรับ!</h2>
                            <p className="text-gray-600 text-[16px]">กรุณาใส่ชื่อผู้ใช้งานและรหัสผ่านเพื่อเข้าใช้งานระบบ</p>
                        </div>
                        <div className="lg:bg-white p-8 rounded-lg lg:shadow-md w-full max-w-md">
                            <form action={fetchData}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-gray-700 mb-2">ผู้ใช้งาน</label>
                                    <Input type="username" value={email} onChange={e => setEmail(e.target.value)} className="p-3" placeholder="กรอกผู้ใช้งานของคุณ" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                    <Input.Password value={password} onChange={e => setPassword(e.target.value)} className="p-3" placeholder="รหัสผ่าน" minLength={8} />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <Checkbox onChange={e => console.log('add')}>จดจำรหัสผ่าน</Checkbox>
                                    </div>

                                </div>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">เข้าสู่ระบบ</button>
                            </form>

                        </div>
                    </div>
                </div>


            </>
            }
        </>
    );
}
