'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import { Breadcrumb, Radio } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


export default function Detail() {

    const [display, setDisplay] = useState<'PM2' | 'PM10'>('PM10');
    const [display2, setDisplay2] = useState<'Tempurature' | 'Pressure' | 'RH'>('Tempurature');

    return <>
        <Image src="/images/cover-image.png" width={1664} height={240} className='w-[100vw] bg-black' alt={''}></Image>
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
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>วัดปลวกเกตุ</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">วัดปลวกเกตุ</h3>
                    <div className="text-mute text-[16px]">ประจำวันจันทร์ ที่ 19 มิถุนายน 2566 เวลา 09:05 น.</div>
                </div>
                <div>
                    <Badge text="มีผลกระทบ" className="text-[--error] bg-[--error-50] border-1 border-[--error]"></Badge>
                    <div className="text-[36px] font-bold">208 <span className="text-[20px] font-normal">AQI</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="flex flex-wrap">
                <div className="lg:basis-1/3">
                    {/* Location */}
                    <div className="flex items-center mb-4">
                        <MapPin></MapPin>
                        <span className="text-[14px]">จังหวัดระยอง</span>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">ชื่อสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">ห้วยคิง</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">A1234</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ข้อมูลล่าสุด</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            19 มิถุนายน 2566 เวลา 09:05 น.
                        </p>
                    </div>
                </div>
                <div className="lg:basis-2/3">
                    <div className="w-full  bg-[#F9FAFB] border-2  border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-3 grid-cols-2 justify-center items-center">
                        <div>
                            <div className='text-[#475467]'>ความเร็วลม</div>
                            <div className='inline-flex gap-2 font-extrabold'><Waves /><span>1.9 ms</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>PM2.5 เฉลี่ย 24 ชม</div>
                            <div className='inline-flex gap-2 font-extrabold'>6.0 มคก/ลบ.ม.</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>PM10 เฉลี่ย 24 ชม</div>
                            <div className='inline-flex gap-2 font-extrabold'>9 มคก/ลบ.ม.</div>
                        </div>
                    </div>

                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ข้อมูลตรวจวัดปริมาณฝุ่นละออง PM2.5 ย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    <Radio.Button value="PM10"><div className='flex gap-2 items-center'>PM10 </div></Radio.Button>
                                    <Radio.Button value="PM2"><div className='flex gap-2 items-center'>PM2.5 </div></Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">
                            <AreaGraph />
                        </div>
                    </section>

                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ค่าตรวจวัดข้อมูลทางอุตุนิยมวิทยาย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={display2} onChange={(e) => setDisplay2(e.target.value)}>
                                    <Radio.Button value="Tempurature"><div className='flex gap-2 items-center'>Temperature </div></Radio.Button>
                                    <Radio.Button value="Pressure"><div className='flex gap-2 items-center'>Pressure </div></Radio.Button>
                                    <Radio.Button value="RH"><div className='flex gap-2 items-center'>RH </div></Radio.Button>
                                </Radio.Group>

                            </div>
                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            <AreaGraph />
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}