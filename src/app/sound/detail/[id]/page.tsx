'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import ColumnGraph from '@/app/components/ColumnGraph';
import DualGraph from '@/app/components/DualGraph';
import LineGraph from '@/app/components/LineGraph';
import Table from '@/app/components/Table';
import DateFormator from '@/app/ultilities/DateFormater';
import { Breadcrumb, Radio } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


export default function Detail() {

    const [display, setDisplay] = useState<'ALL' | 'LEQ' | 'LMAX' | 'LMIN'>('ALL');
    const [display2, setDisplay2] = useState<'ALL' | 'Defaul' | 'Noise'>('ALL');

    return <>
        <Image src="/images/cover-image.png" width={1664} height={240} className='w-[100vw] bg-black' alt={''}></Image>
        <div className="container bg-white">
            <Breadcrumb
                separator={<ChevronRight />}

                className='py-2'
                items={[
                    {
                        href: '',
                        title: <House />,
                    },
                    {
                        href: '/sound',
                        title: (
                            <>

                                <span className='px-2'>ดัชนีคุณภาพเสียง</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>สถานีอุตุนิยมวิทยาลำปาง</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">สถานีอุตุนิยมวิทยาลำปาง</h3>
                    <div className="text-mute text-[16px]">ประจำวันจันทร์ ที่ 19 มิถุนายน 2566 เวลา 09:05 น.</div>
                </div>
                <div>
                    <Badge text="มีผลกระทบ" className="text-[--error] bg-[--error-50] border-1 border-[--error]"></Badge>
                    <div className="text-[36px] font-bold">70.3 <span className="text-[20px] font-normal">dBA/Leq 24 ชม</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="flex flex-wrap">
                <div className="lg:basis-1/3">
                    {/* Location */}

                    <span className="text-[14px] text-gray-500 pb-2">ตำแหน่งที่ตั้ง</span>
                    <div className="flex items-center mb-4">
                        <MapPin></MapPin>
                        <span className="text-[14px]">ต.พระบาท, อ.เมือง ลำปาง</span>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">ประเภทข้อมูล</span>
                        <p className="text-[16px] font-semibold text-gray-900">กรมควบคุมมลพิษ</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">A1234</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ประเภทพื้นที่</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            ชุมชน
                        </p>
                    </div>
                </div>
                <div className="lg:basis-2/3">
                    <div className="w-full  bg-[#F9FAFB] border-2  border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-5 grid-cols-2 justify-center items-center">
                        <div>
                            <div className='text-[#475467]'>dBA/Leq 1 ชม</div>
                            <div className='inline-flex gap-2 font-extrabold'>45.7</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>dBA/Leq 15 นาที</div>
                            <div className='inline-flex gap-2 font-extrabold'>54.6</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>dBA/Leq 5 นาที</div>
                            <div className='inline-flex gap-2 font-extrabold'>54.6</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Lmax</div>
                            <div className='inline-flex gap-2 font-extrabold'>54.6</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Lmin</div>
                            <div className='inline-flex gap-2 font-extrabold'>54.6</div>
                        </div>
                    </div>

                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ค่า Leq, Lmax, Lmin ย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="LEQ"><div className='flex gap-2 items-center'>Leq</div></Radio.Button>
                                    <Radio.Button value="LMAX"><div className='flex gap-2 items-center'>Lmax</div></Radio.Button>
                                    <Radio.Button value="LMIN"><div className='flex gap-2 items-center'>Lmin</div></Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">
                            <DualGraph />
                        </div>
                    </section>

                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">เสียงพื้นฐานและเสียงรบกวน</div>
                            <div className="">
                                <Radio.Group value={display2} onChange={(e) => setDisplay2(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="Default"><div className='flex gap-2 items-center'>เสียงมาตรฐาน</div></Radio.Button>
                                    <Radio.Button value="Noise"><div className='flex gap-2 items-center'>เสียงรบกวน </div></Radio.Button>
                                </Radio.Group>

                            </div>
                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            <LineGraph />
                        </div>
                    </section>
                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับเสียงเฉลี่ยรายชั่วโมง (Leq, 24hr) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            <ColumnGraph />
                        </div>
                    </section>
                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับเสียงเฉลี่ยรายชั่วโมง (Leq, 24hr) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            <Table className="w-full" data={[
                                {
                                    updated: DateFormator(new Date()),
                                    Leq: 51.3,
                                    Lmin: 63.6,
                                    Lmax: 66.2
                                }


                            ]}

                                columns={
                                    [
                                        {
                                            title: <div className="text-[#475467]">เวลาอัพเดต</div>,
                                            dataIndex: 'updated',
                                        },
                                        {
                                            title: <div className="text-[#475467]">Leq</div>,
                                            dataIndex: 'Leq',
                                        },
                                        {
                                            title: <div className="text-[#475467]">Lmin</div>,
                                            dataIndex: 'Lmin',
                                        },
                                        {
                                            title: <div className="text-[#475467]">Lmax</div>,
                                            dataIndex: 'Lmax',
                                        },
                                    ]
                                }
                            ></Table>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}