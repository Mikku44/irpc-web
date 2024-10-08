'use client'

import { Button, Input, Pagination, Radio, Segmented } from 'antd';
import { Download, Grid, Grid2X2, Magnet, Map, RefreshCw, Search } from 'lucide-react';
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
import StationCard from '../components/StationCard';
import Badges from '../components/Badges';

export default function CEMs() {

   
  const [display, setDisplay] = useState<'List' | 'Map'>('List');

  const currentPage = 0;
  const pageSize = 1;

  const sounds = [1, 2, 3, 4, 5, 6];
  const soundsSplited = sounds[currentPage]
  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">

        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำวันจันทร์ ที่ 19 มิถุนายน เวลา 09:05 น.</div>
        <div className="flex justify-between">
          <div className="text-[36px] font-bold">สถานีทั้งหมด</div>
          <div className="text-[16px] font-bold flex gap-2">
            <Button ><RefreshCw className='size-[14px]' /> อัปเดต</Button>
            <Button type='primary' ><Download className='size-[14px]' />ดาวน์โหลด</Button>
          </div>
        </div>

      

      </section>

      <section id="lists" className='px-10 bg-white py-5'>
        {display == "List" && <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 hidden gap-5 justify-center">
          {[1, 2, 3, 4, 5, 6].map(item => <Link href="#">
            <StationCard key={item}></StationCard>
          </Link>)}
        </div>}

        {display == "List" && <div className="lg:hidden md:hidden flex gap-5 justify-center">
          {[soundsSplited].map(item => <Link href="#">
            <StationCard key={item}></StationCard>
          </Link>)}
        </div>}


        {display == "Map" && <div className="flex  gap-5 ">
          <div className="basis-2/5 lg:block md:hidden hidden">
            <Link href="#">
              <StationCard ></StationCard>
            </Link>
          </div>
          <div className="lg:basis-3/5  w-full lg:h-auto md:h-[50vh] h-[50vh]">
            <MapPick />
          </div>
        </div>}

        <Pagination pageSize={pageSize} simple={{ readOnly: true }} defaultCurrent={0} total={sounds.length} className="lg:hidden md:hidden flex justify-center py-3" />
      </section>

      


    </>
  );
}
