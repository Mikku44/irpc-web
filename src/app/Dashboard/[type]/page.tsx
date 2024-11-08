'use client'
import { Breadcrumb, Button, Input, Select, Tabs, TabsProps } from "antd";

import { ChevronRight, CloudDownload, House, Key, RefreshCw, Search } from "lucide-react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { getData } from "@/app/ultilities/api";
import MultiColumnGraph from "@/app/components/MultiColumnGraph";
import { convertPropertyToNumber } from "@/app/ultilities/PropsToNumber";
import { namedArray } from "@/app/ultilities/ExtractKeys";
import StackedColumnChart from "@/app/components/stackGraph";

const monthsInThai = [
    { value: '01', label: 'มกราคม' },
    { value: '02', label: 'กุมภาพันธ์' },
    { value: '03', label: 'มีนาคม' },
    { value: '04', label: 'เมษายน' },
    { value: '05', label: 'พฤษภาคม' },
    { value: '06', label: 'มิถุนายน' },
    { value: '07', label: 'กรกฎาคม' },
    { value: '08', label: 'สิงหาคม' },
    { value: '09', label: 'กันยายน' },
    { value: '10', label: 'ตุลาคม' },
    { value: '11', label: 'พฤศจิกายน' },
    { value: '12', label: 'ธันวาคม' },
];


export default function Page({params}:any) {

    const [display, setDisplay] = useState(monthsInThai?.[new Date().getMonth()].label);
    const [airsFiltered, setAirsFiltered] = useState<any>({
        0: "",
        1: ""
    });

    const [curTab, setCurTab] = useState<any>("PM2");
    const [Data, setData] = useState<any>();
    const handleSearch = async (keyword: string, index: number) => {
        setAirsFiltered((prev: any) => ({
            ...prev,
            [index]: keyword,
        }));
    };

    const fetchData = async () => {
        const result = await getData('/forWeb/getAirLast.php')
        setData(result.stations || [])
    }

    const nameMap : any = {
        'air' : 'คุณภาพอากาศ',
        'water' : 'คุณภาพน้ำ',
        'sound' : 'ระดับเสียง',
        'cems' : 'CEMs',
    }

    

    const typesLabel: any = {
        'AQI': "ดัชนีคุณภาพอากาศ AQI ",
        'PM2': <>ฝุ่นละออง PM<sub>2.5</sub></>,
        'PM10': <>ฝุ่นละออง PM<sub>10</sub></>,
        'O3': <>ก๊าซโอโซน O<sub>3</sub></>,
        'CO': "ก๊าซคาร์บอนมอนอกไซด์ CO",
        'NO2': <>ก๊าซไนโตรเจนไดออกไซด์ NO<sub>2</sub></>,
        'SO2': <>ก๊าซซัลเฟอร์ไดออกไซด์ SO<sub>2</sub></>,
        'WS': "WS",
        'WD': "WD"
    };

    useEffect(() => {
        fetchData();
    }, [])


    const paramsMap : any = {
       air :  ['PM2', 'PM10', 'O3', 'CO', 'NO2', 'SO2', 'WS', 'WD', 'AQI'],
       sound :  ['Leq','Leq90','Lmax','Lmin'],
       water :  ['COD','FLOW',"pH"],
       cems :  ['Flow','O2','NOx','SOx','CO','CO2','NH3','H2S','Dust',"Opacity"],
    }


    const formattedPollutants = paramsMap[params.type].map((item:any) => ({
        key: item,
        label: item
    }));

    const onChange = (key: string) => {
        console.log(key);

        setCurTab(key)
    };

    const items: TabsProps['items'] = [
        ...formattedPollutants
    ];

   

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

                                <span className='px-3 py-1 hover:bg-none rounded-md bg-slate-100 '>{nameMap[params.type]}</span>
                            </>
                        ),
                    },

                ]}
            />
            <div className="flex flex-wrap gap-5 justify-between items-end">
                <div className="py-2">

                    <div className="text-[36px] font-bold">{nameMap[params.type]}</div>
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
                onChange={(e) => setDisplay(e)}
                style={{ width: 200 }}
                placeholder="Month"
                optionFilterProp="label"
                value={display}
                options={monthsInThai}
            />
            <div className="search"> <Input onChange={e => handleSearch(e.target.value, 1)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt", padding: "0px 5px" }} className="text-slate-500 noto-sans" prefix={<Search />} /></div>
        </section>

        <section className="bg-white px-16">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <div className="text-xl py-2 font-bold">ข้อมูลตรวจวัด{typesLabel[curTab]}</div>
            <div className="p-10">
                { [{ nameTH: "วัดปลวกเกตุ" }, { nameTH: "วัดปลวกเกตุ2" }].map((item: any, index: number) => <div key={index}>
                    <div className="font-bold pb-8 pt-12">{item?.nameTH}</div>
                    <MultiColumnGraph data={
                        [
                            ...convertPropertyToNumber(namedArray([
                                {
                                    "DATETIMEDATA": "2024-10-31 00:00:00",
                                    "value": "49.7"
                                },
                                {
                                    "DATETIMEDATA": "2024-10-31 01:00:00",
                                    "value": "46.3"
                                },
                                {
                                    "DATETIMEDATA": "2024-10-31 02:00:00",
                                    "value": "46.9"
                                },
                                {
                                    "DATETIMEDATA": "2024-10-31 03:00:00",
                                    "value": "49.6"
                                },
                            ], "O2"), 'value'),

                            ...convertPropertyToNumber(namedArray([
                                {
                                    "DATETIMEDATA": "2024-10-31 00:00:00",
                                    "value": "89.7"
                                },
                                {
                                    "DATETIMEDATA": "2024-10-31 01:00:00",
                                    "value": "86.3"
                                },
                                {
                                    "DATETIMEDATA": "2024-10-31 02:00:00",
                                    "value": "86.9"
                                },
                                {
                                    "DATETIMEDATA": "2024-10-31 03:00:00",
                                    "value": "89.6"
                                },
                            ], "PC"), 'value'),
                        ]
                    } />
                </div>)}
            </div>


        </section>

        <Footer />

    </>
}