'use client'
import { Dropdown, MenuProps } from "antd";
import Button from "antd/es/button/button";
import { ChevronDown, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="air">
        คุณภาพอากาศ
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="air">
        ระดับเสียง
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="air">
        คุณภาพน้ำ
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="air">
        สิ่งแวดล้อม
      </a>
    ),
  },

];

const suggestBTN: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/report">
        ไปหน้าแนะนำติชม
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="tel:+6627657380">
        โทรด่วน +66(0) 2765-7380 
      </a>
    ),
  },
 
];



export default function Navbar() {
  return (
    <div className="w-full bg-white text-center flex justify-between py-5 lg:px-28 md:px-[10vw] px-5 items-center">
      <div className="flex gap-10 items-center text-lg ">
        <Image height={18} width={100} src="/images/irpc-logo.svg" alt="irpc logo" />


        <ul className="px-10 lg:flex hidden gap-10 items-center font-medium text-[#475467]">
          <Link href="#">
            <li>หน้าแรก</li>
          </Link>


          <Dropdown menu={{ items }} className="flex items-center gap-2 cursor-pointer">
            <a onClick={(e) => e.preventDefault()}>

              ดัชนีคุณภาพ
              <ChevronDown />

            </a>
          </Dropdown>

          <Link href="#">
            <li>รายการโปรด</li>
          </Link>
          <Link href="#">
            <li>ข่าวสาร</li>
          </Link>
        </ul>
      </div>



      <div className="flex gap-2">
        <Dropdown menu={{items:suggestBTN}}>
          <Button type="default" className="">
            <Send className="size-5" />
            <div className="">แนะนำติชม</div>
          </Button>
        </Dropdown>
        <Button type="primary" className="text-white">
          เข้าสู่ระบบ
        </Button>
      </div>
    </div>
  );
}
