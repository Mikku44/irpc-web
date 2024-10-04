import { Avatar, Card as AntCard } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Bookmark } from 'lucide-react';
import Image from 'next/image';

export default function Card() {
    return <>
        <AntCard
            className="rounded-3xl overflow-hidden shadow-md  h-[441px] w-[410.5px]"
            cover={
                <div className="relative h-[280px]">
                    <img
                        alt="Station"
                        src="https://www.prachachat.net/wp-content/uploads/2017/10/inv04231060p1.jpeg" // Replace with your image source
                        className="object-cover w-full h-full relative z-0"
                    />
                    <div className="absolute top-4 right-4 p-2 bg-white/20 glass border-[1px] border-white/80  rounded-full">
                        <Bookmark className="text-white size-4 fill-white text-lg" />
                    </div>

                    <div className="bg-black/20 backdrop-blur-md border-t-[1px] border-white/30 absolute flex w-full justify-between bottom-0 px-4 py-6 items-center z-1">
                    
                        <div className=" text-white ">
                            <span className="text-4xl font-bold">208</span>
                            <span className="text-lg pl-2">AQI</span>
                        </div>
                        <div className=" text-white">
                            <p className="text-sm">ความเร็วลม</p>
                            <p className="text-sm font-semibold flex gap-2 items-center"><span><Image src="/icons/wind.svg" width={15} height={15} alt="wind icon"></Image></span>1.9 ms</p>
                        </div>

                    </div>
                </div>
            }
        >
            <div className="grid">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[24px] font-semibold">วัดปลวกเกตุ</h3>
                    <span className="text-red-500 bg-red-100 px-2 py-1 rounded-full">มีผลกระทบ</span>
                </div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>PM2.5 เฉลี่ย 24 ชม</p>
                    <p className="font-bold">6.0 มคก./ลบ.ม.</p>
                </div>
                <div className="bg-[#EAECF0] h-[1px] w-full"></div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467] mt-1">
                    <p>PM10 เฉลี่ย 24 ชม</p>
                    <p className="font-bold">9 มคก./ลบ.ม.</p>
                </div>
            </div>
        </AntCard>
    </>
}