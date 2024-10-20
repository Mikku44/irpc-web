'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import ColumnGraph from '@/app/components/ColumnGraph';
import Table from '@/app/components/Table';
import { getData } from '@/app/ultilities/api';
import { Breadcrumb, Radio } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image as AntImage } from 'antd';
import rearrangeData from '@/app/ultilities/parseFromDate';
import DateFormator, { FullDateFormator } from '@/app/ultilities/DateFormater';
import { convertPropertyToNumber } from '@/app/ultilities/PropsToNumber';
import MultiColumnGraph from '@/app/components/MultiColumnGraph';
import MultiLineGraph from '@/app/components/MultiLineGraph';

export default function Detail({ params }: { params: any }) {

    const [display, setDisplay] = useState<'ALL' | 'COD' | 'FLOW' | 'WATT'>('ALL');

    const [cemsDetail, setCemsDetail] = useState<any>();

    const fetchData = async () => {
        const result = await getData(`/forWeb/getCems24H.php?stationID=${params.id}`)
        setCemsDetail(result.stations && result.stations[0])

    }

    useEffect(() => {
        fetchData();
    }, [])


    const namedArray = (data: any, name: string) => {
        if (!data) return []
        const result = data.map((item: any) => ({
            name,
            ...item,
        }));
        return result
    }


    return <>
        <div className="h-[240px] overflow-hidden w-full flex justify-center">
            <AntImage
                src={`${cemsDetail?.image_url || "/images/cover-image.png"}`}
                className="w-full h-full object-cover bg-black"
                alt={''}
            />
        </div>
        <div className="container-x bg-white">
            <Breadcrumb
                separator={<ChevronRight />}

                className='py-2'
                items={[
                    {
                        href: '',
                        title: <House />,
                    },
                    {
                        href: '/environment',
                        title: (
                            <>

                                <span className='px-2'>ดัชนีคุณภาพสิ่งแวดล้อม</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{cemsDetail?.nameTH}</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">{cemsDetail?.nameTH}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(`${cemsDetail?.LastUpdate.date}T${cemsDetail?.LastUpdate.time}`))}</div>
                </div>
                <div>
                    <Badge text="มีผลกระทบ" className="text-[--error] bg-[--error-50] border-1 border-[--error]"></Badge>
                    <div className="text-[36px] font-bold">{cemsDetail?.LastUpdate.NOx} <span className="text-[20px] font-normal">COD/mgI</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="lg:flex-row flex-col flex ">
                <div className="lg:basis-1/3">
                    {/* Location */}
                    <span className="text-[14px] text-gray-500 mb-2">ตำแหน่งที่ตั้ง</span>
                    <div className="flex items-center mb-4">
                        <MapPin></MapPin>
                        <span className="text-[14px]">{cemsDetail?.areaTH}</span>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">ประเภทข้อมูล</span>
                        <p className="text-[16px] font-semibold text-gray-900">กรมควบคุมมลพิษ</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{cemsDetail?.stationID}</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ประเภทพื้นที่</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            ชุมชน
                        </p>
                    </div>
                </div>
                <div className="lg:basis-2/3 w-[90vw]">
                    <div className="w-full  bg-[#F9FAFB] border-2  border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-3 grid-cols-2 justify-center items-center">
                        <div>
                            <div className='text-[#475467]'>COD</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>48.39 mg/I</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Flow</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'>1,000 m3/hr</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Watt</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'>27.56 kW</div>
                        </div>
                    </div>

                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ค่า COD, Flow, Watt ย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="COD"><div className='flex gap-2 items-center'>COD </div></Radio.Button>
                                    <Radio.Button value="FLOW"><div className='flex gap-2 items-center'>Flow</div></Radio.Button>
                                    <Radio.Button value="WATT"><div className='flex gap-2 items-center'>Watt</div></Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">
                            {display == "ALL" && cemsDetail && <MultiLineGraph data={
                                [
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.O2, "O2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.NOx, "NOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.SOx, "SOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.CO, "CO"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.CO2, "CO2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.NH3, "NH3"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.H2S, "H2S"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.Dust, "Dust"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.Opacity, "Opacity"), 'value'),
                                ]
                            } />}
                            {display == "COD" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.COD, "value")} />}
                            {display == "FLOW" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.Flow, 'value')} />}
                            {display == "WATT" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.pH, "value")} />}
                        </div>
                    </section>

                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับคุณภาพเฉลี่ยรายชั่วโมง (COD, 24hr) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            {display == "ALL" && cemsDetail && <MultiColumnGraph data={
                                cemsDetail?.Last7D &&
                                [
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.O2, "O2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.NOx, "NOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.SOx, "SOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.CO, "CO"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.CO2, "CO2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.NH3, "NH3"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.H2S, "H2S"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.Dust, "Dust"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.Opacity, "Opacity"), 'value'),
                                ]
                            } />}
                            {display == "COD" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.COD, 'value')} />}
                            {display == "WATT" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.pH, 'value')} />}
                            {display == "FLOW" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.Flow, 'value')} />}
                        </div>
                    </section>


                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับคุณภาพเฉลี่ยรายชั่วโมง (CEMS, 24hr) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            <Table
                                data={
                                    //     [
                                    //     {
                                    //         key: '1',
                                    //         station: 'HRSG 21',
                                    //         updated: '19 มิ.ย. 66 เวลา 09:00 น.',
                                    //         CO: 2,
                                    //         NOx: 30.94,
                                    //         SO2: 0.07,
                                    //         temperature: 111.45,
                                    //         O2: 15.16,
                                    //         flow: 337024.09,
                                    //         particulate: 0.31,
                                    //     },
                                    // ]
                                    rearrangeData(cemsDetail?.Last24H)
                                }

                                columns={[
                                    // {
                                    //     title: <div className="text-[#475467]">จุดตรวจวัด</div>,
                                    //     dataIndex: 'nameTH',
                                    //     key: 'nameTH',

                                    // },
                                    {
                                        title: <div className="text-[#475467]">เวลาอัพเดต</div>,
                                        dataIndex: 'updated',
                                        key: 'updated',
                                        render: (text: string, record: any) => `${DateFormator(new Date(record?.DATETIMEDATA.split(" ").join("T")))}` || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">CO (ppm)</div>,
                                        dataIndex: 'CO',
                                        key: 'CO',

                                    },
                                    {
                                        title: <div className="text-[#475467]">NOx (ppm)</div>,
                                        dataIndex: 'NOx',
                                        key: 'NOx',

                                    },
                                    {
                                        title: <div className="text-[#475467]">SOx (ppm)</div>,
                                        dataIndex: 'SOx',
                                        key: 'SOx',

                                    },
                                    {
                                        title: <div className="text-[#475467]">Temp (°C)</div>,
                                        dataIndex: 'temperature',
                                        key: 'temperature',

                                    },
                                    {
                                        title: <div className="text-[#475467]">O2 (%)</div>,
                                        dataIndex: 'O2',
                                        key: 'O2',

                                    },
                                    {
                                        title: <div className="text-[#475467]">Flow (m³/hr)</div>,
                                        dataIndex: 'flow',
                                        key: 'flow',

                                    },
                                    {
                                        title: <div className="text-[#475467]">Particulate (mg/m³)</div>,
                                        dataIndex: 'particulate',
                                        key: 'particulate',

                                    },
                                ]}
                            />
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}