import { Avatar, Card as AntCard } from 'antd';
import Meta from 'antd/es/card/Meta';
import { AArrowDown, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { favouriteAction, getArrayFromLocalStorage } from '../ultilities/localStorageManager';
import { useEffect, useState } from 'react';
import Badge from './Badge';
import { ShortDateFormator } from '../ultilities/DateFormater';
import { isOnline } from '../page';

export default function SoundCard({ className, data, isFav }: any) {
    const [Fav, setFav] = useState(isFav);

    useEffect(() => {
        const FavData = getArrayFromLocalStorage('favData')
        const isFav = FavData.find((item:any) => item?.stationID == data?.stationID)
        setFav(isFav ? true : false)
    }, [Fav]);
    return <>
        <AntCard
            className={`lg:min-w-[400px] rounded-3xl overflow-hidden shadow-md  h-fit  max-w-[410.5px] ${className}`}
            cover={
                <div className="relative h-[280px]">
                    <img
                        alt="Station"
                        draggable={false}
                        src={data?.image_url || "https://www.menosfios.com/wp-content/uploads/2022/10/sFoto-estacao-Bento.JPG.jpg"}// Replace with your image source
                        className="brightness-90 object-cover w-full h-full relative z-0 "
                    />
                    <button className='' onClick={e => {
                        e.preventDefault()
                        favouriteAction(data, "sound");


                    }}>

                        <div onClick={e => setFav((prev: Boolean) => !prev)} className=" absolute top-4 right-4 p-2 duration-150 shadow-sm hover:border-[--primary] hover:bg-[--primary] bg-white/20 glass border-[1px] border-white/80  rounded-full">
                            <Bookmark className={`text-white size-4 text-lg ${Fav && "fill-white"}`} />
                        </div>
                    </button>

                    <div className="bg-black/20 backdrop-blur-md border-t-[1px] border-white/30 absolute flex w-full justify-between bottom-0 px-4 py-6 items-center z-1">

                        <div className=" text-white ">
                            <span className="text-4xl font-bold">{data?.LastUpdate5min?.Leq || "N/A"}</span>
                            <span className="text-lg pl-2">dBA / เสียงรบกวน</span>
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
                    <h3 className="text-[24px] font-semibold">{data?.nameTH || "Unnamed"}</h3>
                    {/* <span className="text-red-500 bg-red-100 px-2 py-1 rounded-full">มีผลกระทบ</span> */}

                    <Badge status={data?.LastUpdate?.effect} name="sound"></Badge>
                </div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>Leq 24 ชม.</p>
                    <p className="font-bold">{data?.LastUpdate?.Leq || "N/A"} dBA</p>
                </div>

                <div className="bg-[#EAECF0] h-[1px] w-full"></div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>Leq 1 ชม.</p>
                    <p className="font-bold">{data?.LastUpdate?.L50 || "N/A"} dBA</p>
                </div>


                <div className="bg-[#EAECF0] h-[1px] w-full"></div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>Leq 5 นาที</p>
                    <p className="font-bold">{data?.LastUpdate?.L5 || "N/A"} dBA</p>
                </div>
                <div className="flex font-light text-[#475467]">
                    <p className="flex gap-2 relative items-center ">
                        {isOnline(new Date(`${data?.LastUpdate?.date}T${data?.LastUpdate?.time}`))}
                        อัพเดทล่าสุด: </p>
                    <p> &nbsp; {ShortDateFormator(new Date(`${data?.LastUpdate?.date}T${data?.LastUpdate?.time}`))}</p>
                </div>
            </div>
        </AntCard>
    </>
}