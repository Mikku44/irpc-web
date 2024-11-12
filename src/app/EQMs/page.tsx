'use client'

import { Button, Input, Radio, Segmented } from 'antd';
import { Download, Grid, Grid2X2, Magnet, Map, RefreshCw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator, { FullDateFormator } from '../ultilities/DateFormater';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SegmentList } from '../globals';
import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import StationCard from '../components/StationCard';
import Badges from '../components/Badges';
import Pagination from '../components/Pagination';
import { getData, postData } from '../ultilities/api';

export default function EQMs() {


  const [display, setDisplay] = useState<'List' | 'Map'>('List');
  const [EQMs, setEQMs] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(0);

  const today = FullDateFormator(new Date())
  const pageSize = 1;

  const fetchData = async () => {
    const result = await getData('/forWeb/getEqmsList.php')
    setEQMs(result || [])
    
  }

  const downloadImage = async () => {
    const query = {
      "station":["s001", "s002"]
    }
    const result = await fetch("/api/eqms", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    // console.log(result);
    if (result?.ok) {
      // Assuming the response contains the image data (e.g., as a Blob)
      const blob = await result.blob(); // You can also use result.arrayBuffer() for binary data
  
      // Create an object URL for the Blob (image)
      const imageUrl = URL.createObjectURL(blob);
  
      // Create an anchor tag and trigger download
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `EQMS-${new Date().toISOString().split("T")[0]}.png`; // Set the desired download filename here
      a.click();
  
      // Clean up the object URL after download
      URL.revokeObjectURL(imageUrl);
    } else {
      console.error('Failed to fetch the image');
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    EQMs && localStorage.setItem('EQMs', EQMs?.length)

  }, [EQMs]);
  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">

        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำ{today}</div>
        <div className="flex justify-between">
          <div className="text-[36px] font-bold">สถานีทั้งหมด</div>
          <div className="text-[16px] font-bold flex gap-2">
            <Button onClick={e => window?.location.reload()}><RefreshCw className='size-[14px]' /> อัปเดต</Button>
            <form action={downloadImage} ><Button type='primary' htmlType="submit" ><Download className='size-[14px]' />ดาวน์โหลด</Button></form>
          </div>
        </div>



      </section>

      <section id="lists" className='px-10 bg-white py-5 min-h-screen'>
        {display == "List" && <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 hidden gap-5 justify-center">
          {EQMs?.map((item: any,index:number) => <Link key={index} href={`/EQMs/detail/${item?.EqmsID}`}>
            <StationCard data={item}></StationCard>
          </Link>)}
        </div>}

        {display == "List" && EQMs?.length > 0 && <div className="lg:hidden md:hidden flex flex-col gap-5 justify-center">
          {[EQMs?.[currentPage]].map((item:any,index:number) => <Link key={index} href={`/EQMs/detail/${item?.EqmsID}`}>
            <StationCard data={item} className=""></StationCard>
          </Link>)}
          <Pagination current={currentPage} onChange={setCurrentPage} pageSize={pageSize} simple={{ readOnly: true }} defaultCurrent={0} total={EQMs?.length} className="lg:hidden md:hidden flex justify-center py-3" />
        </div>}

          {EQMs?.length <= 0 && <div className="flex justify-center items-center h-full">
            ไม่มีรายการนี้แสดง
            </div>}

      </section>




    </>
  );
}
