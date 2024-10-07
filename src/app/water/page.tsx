'use client'

import { Input, Pagination, Radio, Segmented } from 'antd';
import { Grid, Grid2X2, Magnet, Map, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import WaterCard from '../components/WaterCard';
import Badge from '../components/Badge';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator from '../ultilities/DateFormater';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SegmentList } from '../globals';
import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import Badges from '../components/Badges';

export default function Sound() {


  const [display, setDisplay] = useState<'List' | 'Map'>('List');

  const currentPage = 0;
  const pageSize = 1;

  const waters = [1, 2, 3, 4, 5, 6];
  const watersSplited = waters[currentPage]

  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">

        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำวันจันทร์ ที่ 19 มิถุนายน เวลา 09:05 น.</div>
        <div className="text-[36px] font-bold">ดัชนีคุณภาพน้ำ</div>

        <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
          <Badges />
          <div className="badges flex flex-wrap items-center gap-2 lg:w-auto md:w-full w-full">
            <div className="search lg:w-auto md:w-full w-full"> <Input size="middle" placeholder="ค้นหา" className="text-slate-500 noto-sans shadow-sm py-2  rounded-lg" prefix={<Search />} /></div>
            <div className="tabs py-4 lg:w-auto md:w-full w-full  ">
              <Radio.Group
                value={display}
                onChange={(e) => setDisplay(e.target.value)}
                className="lg:w-auto md:w-full w-full "
              >
                <Radio.Button value="List" className="w-1/2">
                  <div className='flex gap-2 items-center justify-center w-full'>
                    <Grid2X2 className='w-[34px]'  />รายการ
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
          {[1, 2, 3, 4, 5, 6].map(item => <Link href="water/detail/someid">
            <WaterCard key={item}></WaterCard>
          </Link>)}
        </div>}

        {display == "List" && <div className="lg:hidden md:hidden flex gap-5 justify-center">
          {[watersSplited].map(item => <Link href="sound/detail/someid">
            <WaterCard key={item}></WaterCard>
          </Link>)}
        </div>}


        {display == "Map" && <div className="flex  gap-5 ">
          <div className="basis-2/5 lg:block md:hidden hidden">
            <Link href="water/detail/someid">
              <WaterCard ></WaterCard>
            </Link>
          </div>
          <div className="lg:basis-3/5  w-full lg:h-auto md:h-[50vh] h-[50vh]">
            <MapPick />
          </div>
        </div>}

        <Pagination pageSize={pageSize} simple={{ readOnly: true }} defaultCurrent={0} total={waters.length} className="lg:hidden md:hidden flex justify-center py-3" />
      </section>

      <section id="table" className="px-10 py-10">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="text-[20px] font-bold">ตารางตรวจวัดคุณภาพน้ำ</div>
          <div className="search"> <Input size="middle" placeholder="ค้นหา" className="text-slate-500 noto-sans" prefix={<Search />} /></div>
        </div>

        <div className='py-5'>
          <Table
            data={[
              {
                key: '1',
                station: 'แขวงการทางสมุทรสาคร',
                COD: 51.3,
                Flow: 63.6,
                PH: 66.2,
                updated: DateFormator(new Date()),
              },
            ]}

            columns={[
              {
                title: <div className="text-[#475467]">สถานี</div>,
                dataIndex: 'station',
              },
              {
                title: <div className="text-[#475467]">COD (mg/L)</div>,
                dataIndex: 'COD',
                sorter: {
                  compare: (a: { COD: number; }, b: { COD: number; }) => a.COD - b.COD,
                  multiple: 3,
                },
              },
              {
                title: <div className="text-[#475467]">Flow (m³/s)</div>,
                dataIndex: 'Flow',
                sorter: {
                  compare: (a: { Flow: number; }, b: { Flow: number; }) => a.Flow - b.Flow,
                  multiple: 3,
                },
              },
              {
                title: <div className="text-[#475467]">PH</div>,
                dataIndex: 'PH',
                sorter: {
                  compare: (a: { PH: number; }, b: { PH: number; }) => a.PH - b.PH,
                  multiple: 3,
                },
              },
              {
                title: <div className="text-[#475467]">เวลาอัพเดต</div>,
                dataIndex: 'updated',
              },
            ]}
          />

        </div>
      </section>


    </>
  );
}
