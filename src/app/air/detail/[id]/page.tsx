'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import { getData } from '@/app/ultilities/api';
import { FullDateFormator } from '@/app/ultilities/DateFormater';
import { Breadcrumb, Radio, Select } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Image as AntImage } from 'antd';
import ColumnGraph from '@/app/components/ColumnGraph';
import { convertPropertyToNumber } from '@/app/ultilities/PropsToNumber';


export default function Detail({ params }: { params: any }) {

    const types = [
        'AQI', 'PM2', 'PM10', 'O3', 'CO', 'NO2', 'SO2', 'WS', 'WD'
    ];

    const [display, setDisplay] = useState<'PM2' | 'PM10' | 'O3' | 'CO' | 'NO2' | 'SO2' | 'WS' | 'WD' | 'AQI'>('AQI');
    const [display2, setDisplay2] = useState<'Tempurature' | 'Pressure' | 'RH'>('Tempurature');

    const [airsDetail, setAirsDetail] = useState<any>();

    const fetchData = async () => {
        const result = await getData(`/forWeb/getAir24H.php?stationID=${params.id}`)
        setAirsDetail(result.stations && result.stations[0])

    }

    useEffect(() => {
        fetchData();
    }, [])


    return <>
        <div className="h-[240px] overflow-hidden w-full flex justify-center">
            <Image width={1023} height={300}
                src={`${airsDetail?.image_url || "/images/cover-image.png"}`}
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
                        href: '/air',
                        title: (
                            <>

                                <span className='px-2'>ดัชนีคุณภาพอากาศ</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{airsDetail?.nameTH}</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">{airsDetail?.nameTH}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(`${airsDetail?.LastUpdate.date}T${airsDetail?.LastUpdate.time}`))}</div>
                </div>
                <div className="flex flex-col items-end">
                    <Badge text="มีผลกระทบ" className="text-[--error] bg-[--error-50] border-1 border-[--error]"></Badge>
                    <div className="text-[36px] font-bold">{airsDetail?.LastUpdate.O3 || "N/A"} <span className="text-[20px] font-normal">AQI</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="flex flex-wrap">
                <div className="lg:basis-1/3 py-5">
                    {/* Location */}
                    <div className="flex items-center mb-4">
                        <MapPin></MapPin>
                        <span className="text-[14px]">{airsDetail?.areaTH}</span>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">ชื่อสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{airsDetail?.nameTH}</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{airsDetail?.stationID}</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ข้อมูลล่าสุด</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            {FullDateFormator(new Date(`${airsDetail?.LastUpdate.date}T${airsDetail?.LastUpdate.time}`))}
                        </p>
                    </div>
                </div>
                <div className="lg:basis-2/3">
                    <div className="w-full  bg-[#F9FAFB] border-2  border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-3 grid-cols-2 justify-center items-center">
                        <div>
                            <div className='text-[#475467]'>ความเร็วลม</div>
                            <div className='inline-flex gap-2 font-extrabold'><Waves /><span>{airsDetail?.LastUpdate.WS || "N/A"} ms</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>PM2.5 เฉลี่ย 24 ชม</div>
                            <div className='inline-flex gap-2 font-extrabold'>{airsDetail?.LastUpdate.PM25 || "N/A"} มคก/ลบ.ม.</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>PM10 เฉลี่ย 24 ชม</div>
                            <div className='inline-flex gap-2 font-extrabold'>{airsDetail?.LastUpdate.PM10 || 'N/A'} มคก/ลบ.ม.</div>
                        </div>
                    </div>

                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ข้อมูลตรวจวัดปริมาณฝุ่นละออง PM2.5 ย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                {/* <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    {types.map(item => <Radio.Button value={item}><div className='flex gap-2 items-center'>{item} </div></Radio.Button>)}

                                </Radio.Group> */}

                                <Select
                                    // showSearch
                                    onChange={(e) => setDisplay(e)}
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    value={display}
                                    options={types.map(item => {
                                        return {
                                            value: item,
                                            label: item
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">

                            {display == "AQI" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.AQI, "value")} />}
                            {display == "CO" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.CO, "value")} />}
                            {display == "NO2" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.NO2, "value")} />}
                            {display == "PM2" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.PM25, "value")} />}
                            {display == "PM10" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.PM10, "value")} />}
                            {display == "O3" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.O3, "value")} />}
                            {display == "SO2" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.SO2, "value")} />}
                            {display == "WD" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.WD, "value")} />}
                            {display == "WS" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.WS, "value")} />}

                        </div>
                    </section>

                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ค่าตรวจวัดข้อมูลทางอุตุนิยมวิทยาย้อนหลัง 7 วัน</div>
                            {/* <div className="">
                                <Radio.Group value={display2} onChange={(e) => setDisplay2(e.target.value)}>
                                    <Radio.Button value="Tempurature"><div className='flex gap-2 items-center'>Temperature </div></Radio.Button>
                                    <Radio.Button value="Pressure"><div className='flex gap-2 items-center'>Pressure </div></Radio.Button>
                                    <Radio.Button value="RH"><div className='flex gap-2 items-center'>RH </div></Radio.Button>
                                </Radio.Group>

                            </div> */}
                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            {display == "AQI" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.AQI, "value")} />}
                            {display == "CO" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.CO, "value")} />}
                            {display == "NO2" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.NO2, "value")} />}
                            {display == "PM2" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.PM25, "value")} />}
                            {display == "PM10" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.PM10, "value")} />}
                            {display == "O3" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.O3, "value")} />}
                            {display == "SO2" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.SO2, "value")} />}
                            {display == "WD" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.WD, "value")} />}
                            {display == "WS" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last24H?.WS, "value")} />}

                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}