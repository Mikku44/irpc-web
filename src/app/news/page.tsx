'use client'

import { Button } from "antd";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "../ultilities/api";
import { FullDateFormator } from "../ultilities/DateFormater";


export default function Page() {

  const [DashBoard, setDashBoard] = useState<any>();
  const fetchData = async () => {
    const result = await getData('/forWeb/getDashbord.php')
    setDashBoard(result || {})
  }


  useEffect(() => {
    fetchData();

  }, [])


  return (
    <section className="max-w-[90vw] py-10 mx-auto">
      <div className="flex justify-between py-10">
        <div className="text-2xl font-bold">ข่าวสาร ประชาสัมพันธ์</div>

      </div>


      <div className="flex flex-wrap gap-10  justify-center">

        {DashBoard?.news?.[0] &&
          <Link href={`/news/${DashBoard?.news?.[0]?.newsID}`}>
            <div className="rounded-xl border border-[#EAECF0] bg-white shadow-md lg:max-w-[500px] md:w-[500px] w-[80vw] h- overflow-hidden">
              <div className="h-[250px] overflow-hidden">
                <Image src={DashBoard?.news?.[0]?.newsPicPath} alt="" width={625} height={308} className="h-[250px] w-full"></Image>
              </div>
              <div className="flex flex-col p-4 gap-4 pt-8">
                <div className="flex flex-col">
                  <div className="text-[--primary] text-[14px] font-bold">{DashBoard?.news?.[0]?.newsDateModified && FullDateFormator(new Date(DashBoard?.news?.[0]?.newsDateModified.split(" ").join("T")))}</div>
                  <div className="flex justify-between">
                    <div className="text-black text-[24px] font-extrabold">{DashBoard?.news?.[0]?.newsHeader}</div>
                    <ArrowUpRight className="size-7" />
                  </div>
                </div>
                <div className="text-[#475467]  text-ellipsis line-clamp-2 ">{DashBoard?.news?.[0]?.newsDescription}</div>
              </div>
            </div>
          </Link>
        }


        <div className="lg:grid md:hidden hidden gap-5 lg:max-w-[800px]">
          {DashBoard?.news?.slice(1, 3).map((item: any, index: number) =>
            <Link href={`/news/${item?.newsID}`}>
              <div className="rounded-xl border w-[50vw] border-[#EAECF0] flex bg-white shadow-md h-[200px] overflow-hidden">
                <div className="w-[150px] h-[200px] bg-black overflow-hidden">
                  <Image src={item?.newsPicPath} alt="" width={625} height={308} className="w-full h-full object-cover"></Image>
                </div>
                <div className="flex flex-col p-4 gap-4 pt-8">
                  <div className="flex flex-col">
                    <div className="text-[--primary] text-[14px] font-bold">{item?.newsDateModified && FullDateFormator(new Date(item?.newsDateModified.split(" ").join("T")))}</div>
                    <div className="flex justify-between">
                      <div className="text-black text-[24px] font-extrabold">{item?.newsHeader}</div>
                    </div>
                  </div>
                  <div className="text-[#475467]  text-ellipsis line-clamp-2 ">{item?.newsDescription}</div>
                </div>
              </div>
            </Link>)
          }

        </div>
      </div>


      <div className="py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {DashBoard?.news?.slice(3).map((item: any, index: number) =>
          <Link href={`/news/${item?.newsID}`}>
            <div className="rounded-xl border border-[#EAECF0] bg-white shadow-md  overflow-hidden">
              <div className="h-[250px] overflow-hidden">
                <Image src={item?.newsPicPath} alt="" width={625} height={308} className="h-[250px] w-full"></Image>
              </div>
              <div className="flex flex-col p-4 gap-4 pt-8">
                <div className="flex flex-col">
                  <div className="text-[--primary] text-[14px] font-bold">{item?.newsDateModified && FullDateFormator(new Date(item?.newsDateModified.split(" ").join("T")))}</div>
                  <div className="flex justify-between">
                    <div className="text-black text-[24px] font-extrabold">{item?.newsHeader}</div>
                    <ArrowUpRight className="size-7" />
                  </div>
                </div>
                <div className="text-[#475467]  text-ellipsis line-clamp-2 ">{item?.newsDescription}</div>
              </div>
            </div>
          </Link>)
        }

      </div>
    </section>


  )
}