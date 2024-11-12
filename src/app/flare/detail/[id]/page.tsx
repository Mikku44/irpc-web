'use client'

import AreaGraph from '@/app/components/AreaGraph';
import MultiLineGraph from '@/app/components/MultiLineGraph';
import { convertPropertyToNumber } from '@/app/ultilities/PropsToNumber';
import { Breadcrumb, Button, Radio, DatePicker, } from 'antd';
import { ChevronRight, House, MapPin, CirclePlay, } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getData } from '@/app/ultilities/api';
import DateFormator, { FullDateFormator, } from '@/app/ultilities/DateFormater';
import Link from 'next/link';

export default function Detail({ params }: { params: any }) {

    const namedArray = (data: any, name: string) => {
        if (!data) return []
        const result = data.map((item: any) => ({
            name,
            ...item,
        }));
        return result
    }

    const [display, setDisplay] = useState<'ALL' | 'Fire' | 'Smoke' | 'Fire_smoke' | 'Steam' | 'Null_group'>('ALL');
    const [FlareDetail, setFlareDetail] = useState<any>();

    const [Type, setType] = useState<any>("day");
    const [StartDate, setStartDate] = useState<any>("24-04-08");
    const [EndDate, setEndDate] = useState<any>(new Date().toISOString().split('T')[0]);

    const fetchData = async () => {
        const result = await getData(`/forWeb/getFlareDetail.php?stationID=${params.id}&type=${Type}&start=${StartDate}&end=${EndDate}`)
        setFlareDetail(result.stations && result.stations[0])
    }
    useEffect(() => {
        fetchData();
    }, [Type, StartDate, EndDate])

    const { RangePicker } = DatePicker;

    return <>
        <div className="h-[240px] overflow-hidden w-full flex justify-center">
            <Image width={1023} height={300}
                src={`${FlareDetail?.image_url || "/images/cover-image.png"}`}
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
                        href: '/flare',
                        title: (
                            <>
                                <span className='px-2'>เเฟลร์</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{FlareDetail?.nameTH}</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">{FlareDetail?.nameEN}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(`${FlareDetail?.LastUpdate.date!}T${FlareDetail?.LastUpdate.time!}`))} </div>
                </div>
                <div>
                    <Link href={`${FlareDetail?.stationID}/steaming/${FlareDetail?.stationID}`}><Button className="h-12"><CirclePlay className="size-5" /><span className='font-bold'>ดูสด</span></Button></Link>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px] rounded-xl my-10"></div>
            <div className="flex flex-col items-end space-y-3 mt-7">
                <Radio.Group onChange={setType} className="space-x-3">
                    <Radio value="day" className=''>รายวัน</Radio>
                    <Radio value="hour" className=''>รายชั่วโมง</Radio>
                    <Radio value="min" className=''>รายนาที</Radio>
                </Radio.Group>
                <RangePicker onChange={(value, dateString) => {
                    setStartDate(dateString[0])
                    setEndDate(dateString[1])
                }} className="w-[280px] shadow-sm" />
            </div>

            <section className="grid gap-4 lg:gap-8 lg:grid-cols-4 mt-5">
                <div className="space-y-5">
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[14px] text-gray-500">ตำเเหน่งที่ตั้ง</span>
                        <div className="flex items-center gap-2">
                            <MapPin />
                            <span className="text-[14px]">{FlareDetail?.areaTH}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-[14px] text-gray-500">ประเภทข้อมูล</span>
                        <p className="text-[16px] font-semibold text-gray-900">{FlareDetail?.stationType}</p>
                    </div>
                    <div>
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{FlareDetail?.stationID}</p>
                    </div>
                    <div>
                        <span className="text-[14px] text-gray-500">ประเภทพื้นที่</span>
                        <p className="text-[16px] font-semibold text-gray-900">ชุมชน</p>
                    </div>
                </div>

                <div className="lg:col-span-3 overflow-x-auto">
                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold lg:pb-0 md:pb-0 pb-5">ระดับเสียงรบกวนย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="Fire"><div className='flex gap-2 items-center'>Fire</div></Radio.Button>
                                    <Radio.Button value="Smoke"><div className='flex gap-2 items-center'>Smoke</div></Radio.Button>
                                    <Radio.Button value="Fire_smoke"><div className='flex gap-2 items-center'>Fire_smoke</div></Radio.Button>
                                    <Radio.Button value="Steam"><div className='flex gap-2 items-center'>Steam</div></Radio.Button>
                                    <Radio.Button value="Null_group"><div className='flex gap-2 items-center'>Null_group</div></Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="overflow-hidden flex justify-center">
                            {display == "ALL" && FlareDetail && <MultiLineGraph data={[
                                ...convertPropertyToNumber(namedArray(FlareDetail.data, "fire"), 'fire'),
                                ...convertPropertyToNumber(namedArray(FlareDetail.data, "smoke"), 'smoke'),
                                ...convertPropertyToNumber(namedArray(FlareDetail.data, "fire_smoke"), 'fire_smoke'),
                                ...convertPropertyToNumber(namedArray(FlareDetail.data, "steam"), 'steam'),
                                ...convertPropertyToNumber(namedArray(FlareDetail.data, "null_group"), 'null_group'),
                            ]} />}
                            {display === "Fire" && FlareDetail && <AreaGraph data={convertPropertyToNumber(FlareDetail.data, "fire")} />}
                            {display === "Smoke" && FlareDetail && <AreaGraph data={convertPropertyToNumber(FlareDetail.data, "smoke")} />}
                            {display === "Fire_smoke" && FlareDetail && <AreaGraph data={convertPropertyToNumber(FlareDetail.data, "fire_smoke")} />}
                            {display === "Steam" && FlareDetail && <AreaGraph data={convertPropertyToNumber(FlareDetail.data, "steam")} />}
                            {display === "Null_group" && FlareDetail && <AreaGraph data={convertPropertyToNumber(FlareDetail.data, "null_group")} />}
                        </div>
                    </section>

                    <div className="overflow-x-auto pt-14">
                        <table className="w-full table-auto">
                            <thead className="bg-[#F9FAFB] border-b-2">
                                <tr>
                                    <th className="px-3 py-3 text-center text-gray-700 font-medium">N.</th>
                                    <th className="px-3 py-3 text-center text-gray-700 font-medium">วันที่</th>
                                    <th className="px-3 py-3 text-center text-gray-700 font-medium">Fire</th>
                                    <th className="px-3 py-3 text-center text-gray-700 font-medium">Smoke</th>
                                    <th className="px-3 py-3 text-center text-gray-700 font-medium">Fire-Smoke</th>
                                    <th className="px-3 py-3 text-center text-gray-700 font-medium">Steam</th>
                                    <th className="px-3 py-3 text-center text-gray-700 font-medium">Null_Group</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {FlareDetail?.data.map((x: any, index: number) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-center">{index + 1}</td>
                                        <td className="px-6 py-4 text-center">{DateFormator(new Date(x?.DATETIMEDATA))}</td>
                                        <td className="px-6 py-4 text-center">{x?.fire || '-'}</td>
                                        <td className="px-6 py-4 text-center">{x?.smoke || '-'}</td>
                                        <td className="px-6 py-4 text-center">{x?.fire_smoke || '-'}</td>
                                        <td className="px-6 py-4 text-center">{x?.steam || '-'}</td>
                                        <td className="px-6 py-4 text-center">{x?.null_group || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    </>
}