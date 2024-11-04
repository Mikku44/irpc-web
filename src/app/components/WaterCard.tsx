import { Avatar, Card as AntCard } from 'antd';
import Meta from 'antd/es/card/Meta';
import { AArrowDown, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { Water } from '../models/models';
import { useEffect, useState } from 'react';
import { favouriteAction } from '../ultilities/localStorageManager';
import Badge from './Badge';

export default function WaterCard({ data, className, isFav }: any) {
    const [Fav, setFav] = useState(isFav);

    useEffect(() => {

    }, [Fav]);
    return <>
        <AntCard
            className={`lg:min-w-[400px] rounded-3xl overflow-hidden shadow-md  h-fit  max-w-[410.5px] ${className}`}
            cover={
                <div className="relative h-[280px]">
                    <img
                        alt="Station"
                        src={`${data && data?.image_url || "/images/irpc-logo.png"}`}// Replace with your image source
                        className="brightness-90 object-cover w-full h-full relative z-0"
                    />
                    <button className='' onClick={e => {
                        e.preventDefault()
                        favouriteAction(data, "water");


                    }}>

                        <div onClick={e => setFav((prev: Boolean) => !prev)} className="absolute top-4 right-4 p-2 duration-150 shadow-sm hover:border-[--primary] hover:bg-[--primary] bg-white/20 glass border-[1px] border-white/80  rounded-full">
                            <Bookmark className={`text-white size-4 text-lg ${Fav && "fill-white"}`} />
                        </div>
                    </button>


                    <div className="bg-black/20 backdrop-blur-md border-t-[1px] border-white/30 absolute flex w-full justify-between bottom-0 px-4 py-6 items-center z-1">

                        <div className=" text-white ">
                            <span className="text-4xl font-bold">{data?.LastUpdate?.COD || "N/A"}</span>
                            <span className="text-lg pl-2">ppm / COD</span>
                        </div>
                        {/* <div className=" text-white">
                            <p className="text-sm">ความเร็วลม</p>
                            <p className="text-sm font-semibold flex gap-2 items-center"><span><Image src="/icons/wind.svg" width={15} height={15} alt="wind icon"></Image></span>1.9 ms</p>
                        </div> */}

                    </div>
                </div>
            }
        >
            <div className="grid">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[24px] font-semibold">{data && data?.nameTH}</h3>
                    {/* <span className="text-red-500 bg-red-100 px-2 py-1 rounded-full">มีผลกระทบ</span> */}
                    <Badge status={data?.LastUpdate?.effect} name="water"></Badge>
                </div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>Flow</p>
                    <p className="font-bold">{data?.LastUpdate?.Flow || "N/A"} m<sup>3</sup>/s</p>
                </div>
                <div className="bg-[#EAECF0] h-[1px] w-full"></div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>pH</p>
                    <p className="font-bold">{data?.LastUpdate?.pH || "N/A"}</p>
                </div>

            </div>
        </AntCard>
    </>
}