'use client'
import { Avatar, Card as AntCard } from 'antd';
import Meta from 'antd/es/card/Meta';
import { AArrowDown, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Badge from './Badge';
import { getArrayFromLocalStorage, isObjectEqual, isObjectInArray, saveArrayToLocalStorage } from '../ultilities/localStorageManager';

export default function Card({ data, className }: any) {
    return <>
        <AntCard
            className={`lg:min-w-[400px] rounded-3xl overflow-hidden shadow-md  h-fit  max-w-[410.5px] ${className}`}
            cover={
                <div className="relative h-[280px]">
                    {data?.image_url && <img
                        alt="Station"
                        src={`${data && data?.image_url || "/images/irpc-logo.png"}`} // Replace with your image source
                        className="object-cover w-full h-full relative z-0"
                    />}
                    <button className='' onClick={e => {
                        e.preventDefault()
                        const tempData = getArrayFromLocalStorage("favData")
                        if (isObjectInArray(tempData || [], data)) {
                            // Remove 'data' if it already exists in 'tempData'
                            saveArrayToLocalStorage("favData", tempData ? tempData.filter((item: any) => !isObjectEqual(item, data)) : []);
                        } else {
                            // Add 'data' if it does not exist in 'tempData'
                            saveArrayToLocalStorage("favData", [...(tempData || []), { ...data, type: "air" }]);
                        }


                    }}>

                        <div className="absolute top-4 right-4 p-2 duration-150 hover:border-[--primary] hover:bg-[--primary] bg-white/20 glass border-[1px] border-white/80  rounded-full">
                            <Bookmark className="text-white size-4 text-lg" />
                        </div>
                    </button>

                    <div className="bg-black/20 backdrop-blur-md border-t-[1px] border-white/30 absolute flex w-full justify-between bottom-0 px-4 py-6 items-center z-1">

                        <div className=" text-white ">
                            <span className="text-4xl font-bold">{data?.LastUpdate?.AQI?.aqi}</span>
                            <span className="text-lg pl-2">AQI</span>
                        </div>
                        <div className=" text-white">
                            <p className="text-sm">ความเร็วลม</p>
                            <p className="text-sm font-semibold flex gap-2 items-center"><span><Image src="/icons/wind.svg" width={15} height={15} alt="wind icon"></Image></span>
                                {data?.LastUpdate?.WS?.value} ms</p>
                        </div>

                    </div>
                </div>
            }
        >
            <div className="grid">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[24px] font-semibold text-ellipsis line-clamp-1" >{data?.nameTH}</h3>
                    <Badge className=" basis-[150px]" status={data?.LastUpdate?.AQI?.color_id || "N/A"}></Badge>
                </div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>PM2.5 เฉลี่ย 24 ชม</p>
                    <p className="font-bold">{data?.LastUpdate?.PM25?.value} มคก./ลบ.ม.</p>
                </div>
                <div className="bg-[#EAECF0] h-[1px] w-full"></div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467] mt-1">
                    <p>PM10 เฉลี่ย 24 ชม</p>
                    <p className="font-bold">{data?.LastUpdate?.PM10?.value} มคก./ลบ.ม.</p>
                </div>
            </div>
        </AntCard>
    </>
}