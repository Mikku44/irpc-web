'use client'

import { Breadcrumb, Button } from 'antd';
import { ChevronRight, House, MapPin, CirclePlay, CloudDownload, Trash2, } from 'lucide-react';
import Image from 'next/image';

export default function Detail() {
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
                        href: '/flare',
                        title: (
                            <>
                                <span className='px-2'>คุณภาพอากาศ</span>
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
                    <Button className=" text-[14px] font-bold h-10"><CirclePlay className="mr-2" />ดูบันทึกย้อนหลัง</Button>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px] rounded-xl my-10"></div>
            <section className="flex flex-wrap">
                <div className="w-1/4 space-y-5">
                    {/* Location */}
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[14px] text-gray-500">ตำเเหน่งที่ตั้ง</span>
                        <div className="flex items-center gap-2">
                            <MapPin />
                            <span className="text-[14px]">จังหวัดระยอง</span>
                        </div>
                    </div>
                    {/* Station Name */}
                    <div>
                        <span className="text-[14px] text-gray-500">ชื่อสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">ห้วยคิง</p>
                    </div>

                    {/* Station Code */}
                    <div>
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
                <div className="flex-grow w-3/4">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-gray-700 font-medium">รายการ</th>
                                    <th className="px-6 py-3 text-center text-gray-700 font-medium">วันที่</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[{ list: "รายการ" }].map((x) => (
                                    <tr key={x.list}>
                                        <td className="px-6 py-4">{x.list}</td>
                                        <td className="px-6 py-4 text-center">19 มิ.ย. 66 เวลา 09:00 น.</td>
                                        <td className="px-6 py-4 flex justify-center space-x-7">
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <CloudDownload size={20} />
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <Trash2 size={20} />
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <CirclePlay size={20} />
                                            </button>
                                        </td>
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