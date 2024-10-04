'use client'

import { Input, Radio, Segmented } from 'antd';
import { Grid, Grid2X2, Magnet, Map, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator from '../ultilities/DateFormater';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SegmentList } from '../globals';
import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';

export default function Air() {

  const [segmentValue, setSegmentValue] = useState<string | number>('air');
  const [display, setDisplay] = useState<'List' | 'Map'>('List');


  const router = useRouter();
 


  useEffect(() => {

    router.push(`/${segmentValue}`)
  }, [segmentValue])

  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">

       <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำวันจันทร์ ที่ 19 มิถุนายน เวลา 09:05 น.</div>
        <div className="text-[36px] font-bold">ดัชนีคุณภาพอากาศ</div>

        <div className="flex justify-between pt-10">
          <div className="badges flex gap-2 flex-wrap">
            <Badge text="คุณภาพดีมาก" className="bg-[--primary-50] text-[--primary] border-[--primary]"></Badge>
            <Badge text="คุณภาพดี" className="bg-[--success-50] text-[--success] border-[--success]"></Badge>
            <Badge text="คุณภาพปานกลาง" className="bg-[--yellow-50] text-[--yellow] border-[--yellow]"></Badge>
            <Badge text="เริ่มมีผลกระทบ" className="bg-[--orange-50] text-[--orange] border-[--orange]"></Badge>
            <Badge text="มีผลกระทบ" className="bg-[--error-50] text-[--error] border-[--error]"></Badge>
          </div>
          <div className="badges flex flex-wrap gap-2">
            <div className="search"> <Input size="middle" placeholder="ค้นหา" className="text-slate-500 noto-sans" prefix={<Search />} /></div>
            <div className="tabs">
              <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                <Radio.Button value="List"><div className='flex gap-2 items-center'><Grid2X2 />รายการ </div></Radio.Button>
                <Radio.Button value="Map"><div className='flex gap-2 items-center'><Image src="/icons/map.svg" width={24} height={24} alt="wind icon"></Image>แผนที่ </div></Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>

      </section>

      <section id="lists" className='px-10 bg-white py-5'>
        {display == "List" && <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5 ">
          {[1, 2, 3, 4, 5, 6].map(item => <Link href="air/detail/someid">
            <Card key={item}></Card>
          </Link>)}
        </div>}

        {display == "Map" && <div className="flex  gap-5 ">
          <div className="basis-2/5">
            <Link href="air/detail/someid">
              <Card ></Card>
            </Link>
          </div>
          <div className="basis-3/5">
            <MapPick />
          </div>
        </div>}
      </section>

      <section id="table" className="px-10 py-10">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="text-[20px] font-bold">ตารางตรวจวัดคุณภาพอากาศ</div>
          <div className="search"> <Input size="middle" placeholder="ค้นหา" className="text-slate-500 noto-sans" prefix={<Search />} /></div>
        </div>

        <div className='py-5'>
          <Table data={
            [{
              key: '1',
              station: 'วัดปลวกเกตุ',
              AQI: 12,
              PM2: 6.0,
              PM10: 13,
              tempurature: 30.6,
              pressure: 966,
              moisture: 66.3,
              updated: DateFormator(new Date())
            },]
          }

            columns={
              [{
                title: 'สถานี',
                dataIndex: 'station',
              },
              {
                title: 'AQI',
                dataIndex: 'AQI',
                sorter: {
                  compare: (a: { AQI: number; }, b: { AQI: number; }) => a.AQI - b.AQI,
                  multiple: 3,
                },
              },
              {
                title: <div >PM2.5 <span className="text-sm font-normal"> (มคก/ลบ.ม.)</span></div>,
                dataIndex: 'PM2',
                sorter: {
                  compare: (a: { PM2: number; }, b: { PM2: number; }) => a.PM2 - b.PM2,
                  multiple: 3,
                },
              },
              {
                title: <div >PM10 <span className="text-sm font-normal"> (มคก/ลบ.ม.)</span></div>,
                dataIndex: 'PM10',
                sorter: {
                  compare: (a: { PM10: number; }, b: { PM10: number; }) => a.PM10 - b.PM10,
                  multiple: 3,
                },
              },
              {
                title: <div >อุณหภูมิ<span className="text-sm font-normal"> (°C)</span></div>,
                dataIndex: 'tempurature',
                sorter: {
                  compare: (a: { tempurature: number; }, b: { tempurature: number; }) => a.tempurature - b.tempurature,
                  multiple: 3,
                },
              },
              {
                title: <div >ความกดอากาศ<span className="text-sm font-normal"> (mmHg)</span></div>,
                dataIndex: 'pressure',
                sorter: {
                  compare: (a: { pressure: number; }, b: { pressure: number; }) => a.pressure - b.pressure,
                  multiple: 3,
                },
              },
              {
                title: <div >ความชื้นสัมพัทธ์<span className="text-sm font-normal"> (%)</span></div>,
                dataIndex: 'moisture',
                sorter: {
                  compare: (a: { moisture: number; }, b: { moisture: number; }) => a.moisture - b.moisture,
                  multiple: 3,
                },
              },
              {
                title: 'เวลาอัพเดต',
                dataIndex: 'updated',


              },
              ]
            }
          />
        </div>
      </section>


    </>
  );
}
