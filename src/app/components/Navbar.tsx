'use client'
import { Drawer, Dropdown, MenuProps, Space } from "antd";
import Button from "antd/es/button/button";
import { ChevronDown, Menu, PhoneCall, Send, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_self" rel="noopener noreferrer" href="/air">
        คุณภาพอากาศ
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_self" rel="noopener noreferrer" href="/sound">
        ระดับเสียง
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_self" rel="noopener noreferrer" href="/water">
        คุณภาพน้ำ
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_self" rel="noopener noreferrer" href="/environment">
        สิ่งแวดล้อม
      </a>
    ),
  },

];

const suggestBTN: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" className="flex gap-2 " rel="noopener noreferrer" href="/report">
        <Send className="size-5" style={{ color: "#667085" }} />  ไปหน้าแนะนำติชม
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" className="flex gap-2 " rel="noopener noreferrer" href="tel:+6627657380">
        <PhoneCall className="size-5" style={{ color: "#667085" }} /> โทรด่วน +66(0) 2765-7380
      </a>
    ),
  },

];



export default function Navbar() {

  const [open, setOpen] = useState(false);




  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full bg-white text-center flex justify-between py-4 lg:px-28 md:px-[10px] px-5 items-center">
      <div className="flex gap-10 items-center text-lg ">
        <div className="flex gap-2 items-center">

          <Link href="/">
            <Image height={18} width={100} src="/images/irpc-logo.svg" alt="irpc logo" />
          </Link>
        </div>


        <ul className="lg:px-10 lg:flex md:hidden hidden gap-10 items-center font-medium text-[#475467]">
          <Link href="/">
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



      <div className="lg:flex md:hidden hidden  gap-2">
        <Dropdown menu={{ items: suggestBTN }}>
          <Button type="default" className="">

            <div className="">แนะนำติชม</div>
            <ChevronDown className="size-5"></ChevronDown>
          </Button>
        </Dropdown>
        <Link href="/login">
          <Button type="primary" className="text-white">
            เข้าสู่ระบบ
          </Button>
        </Link>
      </div>


      <div className="lg:hidden md:block block">
        <Button type="text" onClick={e => setOpen(true)} className="">
          <Menu  />
        </Button>
      </div>

      <Drawer
        title={`เมนู`}
        placement="right"
        size={"default"}
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="text" onClick={onClose}> <X /> </Button>

          </Space>
        }
      >
        <div className="grid gap-2" >

          <Link href="/">
            <Button type="text" className="w-full flex items-center justify-start">หน้าแรก</Button>
          </Link>


          <Link href="/air">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              ดัชนีคุณภาพอากาศ
            </Button>
          </Link>

          <Link href="/sound">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              ดัชนีคุณภาพเสียง
            </Button>
          </Link>

          <Link href="/water">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              ดัชนีคุณภาพน้ำ
            </Button>
          </Link>

          <Link href="/environment">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              ดัชนีคุณภาพสิ่งแวดล้อม
            </Button>
          </Link>

          <Link href="#">
            <Button type="text" className="w-full flex items-center justify-start">รายการโปรด</Button>
          </Link>
          <Link href="#">
            <Button type="text" className="w-full flex items-center justify-start">ข่าวสาร</Button>
          </Link>

          <Dropdown menu={{ items: suggestBTN }}>
            <Button type="default" className="">

              <div className="">แนะนำติชม</div>
              <ChevronDown className="size-5"></ChevronDown>
            </Button>
          </Dropdown>

          <Link href="/login" className="w-full">
            <Button type="primary" className="text-white w-full">
              เข้าสู่ระบบ
            </Button>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
