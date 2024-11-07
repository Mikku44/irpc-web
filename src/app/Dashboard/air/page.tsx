'use client'
import { Breadcrumb, Button, Input, Select } from "antd";

import { ChevronRight, CloudDownload, House, RefreshCw, Search } from "lucide-react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { useState } from "react";

export default function Page() {

    const [airsFiltered, setAirsFiltered] = useState<any>({
        0: "",
        1: ""
    });

    const handleSearch = async (keyword: string, index: number) => {
        setAirsFiltered((prev: any) => ({
            ...prev,
            [index]: keyword,
        }));
    };

    return <>

        <section id="header" className="px-16 py-4 bg-white">
            <Breadcrumb
                separator={<ChevronRight />}

                className='py-2'
                items={[
                    {
                        href: '',
                        title: <House />,
                    },
                    {
                        href: '/Dashboard',
                        title: <>

                            <span className='px-2'>Dashboard</span>
                        </>,
                    },
                    {
                        href: '',
                        title: (
                            <>

                                <span className='px-3 py-1 hover:bg-none rounded-md bg-slate-100 '>คุณภาพอากาศ</span>
                            </>
                        ),
                    },

                ]}
            />
            <div className="flex flex-wrap gap-5 justify-between items-end">
                <div className="">

                    <div className="text-[36px] font-bold">คุณภาพอากาศ</div>
                    <div className="text-sm text-gray-800">ข้อมูลการส่งรายงานของทุกสถานี</div>
                </div>
                <div className="text-[16px] font-bold flex gap-2">
                    <Button className=" w-[150px] font-bold"><RefreshCw className='size-[14px] ' /> อัปเดตข้อมูล</Button>
                </div>
            </div>

        </section>


        <section className="px-16 py-10 bg-white flex justify-between">
            <Select
                // showSearch
                // onChange={(e) => setDisplay(e)}
                style={{ width: 200 }}
                placeholder="Month"
                optionFilterProp="label"
            // value={display}
            // options={types.map((item: any) => {
            //     return {
            //         value: item,
            //         label: dropdownTypesLabel[item]
            //     }
            // })}
            />
            <div className="search"> <Input onChange={e => handleSearch(e.target.value, 1)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt", padding: "0px 5px" }} className="text-slate-500 noto-sans" prefix={<Search />} /></div>
        </section>

        <section className="bg-white px-16">

        </section>

        <Footer />

    </>
}