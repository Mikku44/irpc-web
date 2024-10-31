import { Badge } from "antd";
export const parameterUnit = {
    // --- Air
    "PM25" : "µg./m3",
    "PM10" : "µg./m3",
    "O3" : "ppb",
    "CO" : "ppm",
    "NO2" : "ppb",
    "SO2" : "ppb",
    // --- Water
    "COD" : "ppm",
    "pH" : "",
    "Flow" : "m3/s",
    // --- Cems,
    "O2" : "ppm",
    "NOx" : "ppm",
    "SOx" : "ppm",
    "CO2" : "ppm",
    "NH3" : "",
    "H2S" : "ppm",
    "Dust" : "µg./m3",
    "Opacity" : "",
    "" : "",
    // --- Sound,
    "Leq" : "dBA",
    "Lmin" : "dBA",
    "Lmax" : "dBA"
  };

const total = {
    "air" :5,
    "sound" :4,
    "water" :3,
    "environment" :19,
    "flare" :0,
    "EQMs" : 31,
}

const privatePath = [
    'EQMs',
    'flare'
]

const SegmentList = [
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>
            คุณภาพอากาศ
            <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['air']}</div>} ></Badge>
        </div>,
        value: 'air'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>ระดับเสียง  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['sound']}</div>} ></Badge></div>,
        value: 'sound'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพน้ำ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['water']}</div>} ></Badge></div>,
        value: 'water'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>CEMs  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['environment']}</div>} ></Badge></div>,
        value: 'environment'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>แฟลร์  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['flare']}</div>} ></Badge></div>,
        value: 'flare'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>EQMs  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['EQMs']}</div>} ></Badge></div>,
        value: 'EQMs'
    },
];
const SegmentUserList = [
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพอากาศ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['air']}</div>} ></Badge></div>,
        value: 'air'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>ระดับเสียง  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['sound']}</div>} ></Badge></div>,
        value: 'sound'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพน้ำ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['water']}</div>} ></Badge></div>,
        value: 'water'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>CEMs  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['environment']}</div>} ></Badge></div>,
        value: 'environment'
    }
];

export { SegmentList ,SegmentUserList,privatePath};
