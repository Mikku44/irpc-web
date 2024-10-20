'use client'

import { Input, Radio, Segmented } from 'antd';
import { Grid, Grid2X2, Magnet, Map, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import Badge from '../components/Badge';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator, { FullDateFormator } from '../ultilities/DateFormater';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SegmentList } from '../globals';
import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import EnvironmentCard from '../components/EnvironmentCard';
import Badges from '../components/Badges';
import Pagination from '../components/Pagination';
import { getData } from '../ultilities/api';
export default function Environment() {


    const [display, setDisplay] = useState<'List' | 'Map'>('List');
    const [cems, setCems] = useState<any>([]);
    const [selectedPlace, setSelectedPlace] = useState<any>();
    const [currentPage, setCurrentPage] = useState(0);


    const today = FullDateFormator(new Date())
    const pageSize = 1;



    const fetchData = async () => {
        const result = await getData('/forWeb/getCemsLast.php')
        setCems(result.stations || [])
       

    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(cems)
         setSelectedPlace(cems[0])
    }, [cems])



    return (
        <>

            <section id="header" className="px-10 py-4 bg-white">

                <SegmentMenu />
                <div className="text-[18px] text-[--primary] font-bold">ประจำ{today}</div>
                <div className="text-[36px] font-bold">ดัชนีคุณภาพแวดล้อม</div>

                <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
                    <Badges />
                    <div className="badges flex flex-wrap items-center gap-2 lg:w-auto md:w-full w-full">
                        <div className="search lg:w-auto md:w-full w-full"> <Input size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt" }} className="text-slate-500 noto-sans shadow-sm py-2  rounded-lg" prefix={<Search />} /></div>
                        <div className="tabs py-4 lg:w-auto md:w-full w-full  ">
                            <Radio.Group
                                value={display}
                                onChange={(e) => setDisplay(e.target.value)}
                                className="lg:w-auto md:w-full w-full "
                            >
                                <Radio.Button value="List" className="w-1/2">
                                    <div className='flex gap-2 items-center justify-center w-full'>
                                        <Grid2X2 className='w-[34px]' />รายการ
                                    </div>
                                </Radio.Button>
                                <Radio.Button value="Map" className="w-1/2">
                                    <div className='flex gap-2 items-center justify-center w-full'>
                                        <Image src="/icons/map.svg" className="p-[1px]" width={24} height={24} alt="wind icon" />
                                        แผนที่
                                    </div>
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                </div>

            </section>

            <section id="lists" className='px-10 bg-white py-5'>
                {display == "List" && <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 hidden gap-5 justify-center">
                    {cems.map((item: any) => <Link href={`environment/detail/${item.stationID}`} key={item.stationID}>
                        <EnvironmentCard data={item}></EnvironmentCard>
                    </Link>)}
                </div>}

                {display == "List" && <div className="lg:hidden md:hidden flex flex-col gap-5 justify-center">
                    <Pagination pageSize={pageSize} simple={{ readOnly: true }} current={currentPage} onChange={setCurrentPage} total={cems?.length} className="lg:hidden md:hidden flex justify-center py-3" >
                        {[cems[currentPage]].map((item:any) => <Link key={item?.stationID} href={`/environment/detail/${item?.stationID}`}>
                            <EnvironmentCard  data={item}></EnvironmentCard>
                        </Link>)}
                    </Pagination>
                </div>}


                {display == "Map" && <div className="flex lg:flex-row flex-col gap-5 ">
                   {selectedPlace && <div className="basis-2/5 lg:block flex justify-center">
                        <Link href={`environment/detail/${selectedPlace?.stationID}`}>
                            <EnvironmentCard data={selectedPlace}></EnvironmentCard>
                        </Link>
                    </div>}
                    <div className=" w-full lg:h-auto md:h-[50vh] h-[50vh]">
                        <MapPick data={cems} setState={setSelectedPlace} unit="NOx" key="NOx_7p"/>
                    </div>
                </div>}

            </section>

            <section id="table" className="px-10 py-10">
                <div className="flex flex-wrap gap-2 justify-between">
                    <div className="text-[20px] font-bold">ตารางตรวจวัดคุณภาพเสียง</div>
                    <div className="search"> <Input size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt" }} className="text-slate-500 noto-sans" prefix={<Search />} /></div>
                </div>

                <div className='py-5'>
                    <Table
                        data={
                            //     [
                            //     {
                            //         key: '1',
                            //         station: 'แขวงการทางสมุทรสาคร',
                            //         point: 'จุดที่1',
                            //         updated: '19 มิ.ย. 66 เวลา 09:00 น.',
                            //         CO: 2,
                            //         Flow: '337,024.09',
                            //         Particulate: 0.31,
                            //     },
                            // ]
                            cems
                        }


                        columns={[
                            {
                                title: <div className="text-[#475467]">สถานี</div>, // Station
                                dataIndex: 'nameTH',
                            },
                            {
                                title: <div className="text-[#475467]">จุดตรวจวัด</div>, // Measurement Point
                                dataIndex: 'areaTH',
                            },
                            {
                                title: <div className="text-[#475467]">เวลาอัพเดต</div>, // Updated Time
                                dataIndex: 'updated',
                                render: (text: string, record: any) => `${DateFormator(new Date(record.LastUpdate?.date + "T" + record.LastUpdate?.time))}` || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">CO (ppm)</div>, // CO (ppm)
                                dataIndex: 'CO',
                                sorter: {
                                    compare: (a: { CO: number; }, b: { CO: number; }) => a.CO - b.CO,
                                    multiple: 3,
                                },
                                render: (text: string, record: any) => record.LastUpdate?.CO_7p || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">Flow (m³/hr)</div>, // Flow (m³/hr)
                                dataIndex: 'Flow',
                                render: (text: string, record: any) => record.LastUpdate?.Dust || 'N/A',

                            },
                            {
                                title: <div className="text-[#475467]">Particulate (mg/m³)</div>, // Particulate (mg/m³)
                                dataIndex: 'Particulate',
                                sorter: {
                                    compare: (a: { Particulate: number; }, b: { Particulate: number; }) => a.Particulate - b.Particulate,
                                    multiple: 3,
                                },
                            },
                        ]}
                    />

                </div>
            </section>


        </>
    );
}
