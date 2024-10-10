"use client"
import Image from "next/image"
import { Checkbox } from 'antd';;
export default function Login() {
    return (
        <>
            <div className="lg:block md:block hidden">
                <Image src="/images/Contentbackground.svg" alt={""} width={758} height={758} className="absolute left-[26%] "></Image>
                <div className="flex flex-col items-center justify-center h-[80vh] mt-10 relative z-[1]">
                    <div className="text-center mb-6">
                        <h2 className="text-[30px] font-bold mb-2">ยินดีต้อนรับ!</h2>
                        <p className="text-gray-600 text-[16px]">กรุณาใส่อีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                <input type="email" id="email" placeholder="กรอกอีเมลของคุณ" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                <input type="password" id="password" placeholder="รหัสผ่าน" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Checkbox onChange={e => console.log('add')}>จดจำรหัสผ่าน</Checkbox>
                                </div>
                                <a href="#" className="text-blue-500">ลืมรหัสผ่าน?</a>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">เข้าสู่ระบบ</button>
                        </form>
                        <div className="text-center mt-6 ">
                            <p className="text-gray-600"> ยังไม่มีบัญชีผู้ใช้? <a href="#" className="text-blue-500">ลงทะเบียน</a></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col items-center justify-center h-[80vh] mt-10 relative z-[1] lg:hidden md:hidden ">
                    <div className="text-center mb-6">
                        <h2 className="text-[30px] font-bold mb-2">ยินดีต้อนรับ!</h2>
                        <p className="text-gray-600 text-[16px]">กรุณาใส่อีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                <input type="email" id="email" placeholder="กรอกอีเมลของคุณ" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                <input type="password" id="password" placeholder="รหัสผ่าน" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Checkbox onChange={e => console.log('add')}>จดจำรหัสผ่าน</Checkbox>
                                </div>
                                <a href="#" className="text-blue-500">ลืมรหัสผ่าน?</a>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">เข้าสู่ระบบ</button>
                        </form>
                        <div className="text-center mt-6 ">
                            <p className="text-gray-600"> ยังไม่มีบัญชีผู้ใช้? <a href="#" className="text-blue-500">ลงทะเบียน</a></p>
                        </div>
                    </div>
                </div>
        </>
    );
}
