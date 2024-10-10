import { Badge } from "antd";

const SegmentList = [
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>
            คุณภาพอากาศ
            <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>5</div>} ></Badge>
        </div>,
        value: 'air'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>ระดับเสียง  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>7</div>} ></Badge></div>,
        value: 'sound'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพน้ำ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>9</div>} ></Badge></div>,
        value: 'water'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>สภาพแวดล้อม  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>2</div>} ></Badge></div>,
        value: 'environment'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>แฟลร์  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>4</div>} ></Badge></div>,
        value: 'flare'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>EQMs  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>10</div>} ></Badge></div>,
        value: 'EQMs'
    },
];
const SegmentUserList = [
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพอากาศ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>5</div>} ></Badge></div>,
        value: 'air'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>ระดับเสียง  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>5</div>} ></Badge></div>,
        value: 'sound'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพน้ำ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>5</div>} ></Badge></div>,
        value: 'water'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>สภาพแวดล้อม  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>5</div>} ></Badge></div>,
        value: 'environment'
    }
];

export { SegmentList };
