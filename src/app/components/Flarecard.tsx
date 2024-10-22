import React from 'react'
import { Button, Card as AntCard } from 'antd';
import { Bookmark, CirclePlay } from 'lucide-react';

export default function Flarecard({item}:{item:any}) {
  return (
    <div>
      <AntCard
        className="min-w-[400px] rounded-3xl overflow-hidden shadow-md  h-fit  max-w-[410.5px]"
        cover={
          <div className="relative h-[280px]">
            <img
              alt="Station"
              src={item?.image_url} // Replace with your image source
              className="object-cover w-full h-full relative z-0" />
            <div className="absolute top-4 right-4 p-2 bg-white/20 glass border-[1px] border-white/80  rounded-full">
              <Bookmark className="text-white size-4 fill-white text-lg" />
            </div>
          </div>
        }
      >
        <div className="grid">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[24px] font-semibold">{item?.nameEN}</h3>
          </div>
          <div className="grid grid-cols-2 items-center gap-6">
            <Button className="flex items-center justify-center text-[14px] font-bold h-10"><CirclePlay className="mr-2" />ดูบันทึกย้อนหลัง</Button>
            <Button type="primary" className=" py-2  text-[14px] h-10 font-bold">รายละเอียด</Button>
          </div>
        </div>
      </AntCard>
    </div>
  )
}
