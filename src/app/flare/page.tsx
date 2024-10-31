'use client'

import { Input, Radio } from 'antd';
import { Grid2X2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
// import DateFormator from '../ultilities/DateFormater';
import Link from 'next/link';
import Flarecard from '../components/Flarecard';
import Badge from '@/app/components/Badge';

import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import { getData } from '../ultilities/api';
import Pagination from '../components/Pagination';
import Badges from '../components/Badges';

export default function flare() {

  const [display, setDisplay] = useState<'List' | 'Map'>('List');
  const [flare, setFlare] = useState([]) // [ตัวเเปร,ฟังชั้นเอาไว่้เซ็ตค่าตัวเเปรข้างหน้า]



  const fetchData = async () => {
    const result = await getData('/forWeb/getWaterLast.php')
    setFlare(result.stations || [])
  }

  useEffect(() => {
    fetchData();
    console.log("first time")
  }, [])

  const [selectedPlace, setSelectedPlace] = useState<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 1;

  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">
        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำวันจันทร์ ที่ 19 มิถุนายน เวลา 09:05 น.</div>
        <div className="text-[36px] font-bold">สถานีแฟลร์ทั้งหมด</div>

        <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
          <Badges name='other' />
          <div className="badges flex flex-wrap items-center gap-2 lg:w-auto md:w-full w-full">
            <div className="search lg:w-auto md:w-full w-full"> <Input size="middle"  style={{ fontFamily: "prompt" ,padding:"0px 5px"}}  placeholder="ค้นหา" className="text-slate-500 noto-sans shadow-sm py-2  rounded-lg" prefix={<Search />} /></div>
            <div className="tabs py-4 lg:w-auto md:w-full w-full  ">
              <Radio.Group
                value={display}
                onChange={(e) => setDisplay(e.target.value)}
                className="lg:w-auto md:w-full w-full "
              >
                <Radio.Button value="List" className="w-1/2">
                  <div className='flex gap-2 items-center justify-center w-full'>
                    <Grid2X2 />รายการ
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
        {display == "List" && <div className="lg:grid justify-items-center lg:grid-cols-3 md:grid-cols-2 md:grid hidden gap-5">
          {flare.map((item: any) => <Link href={`flare/detail/${item.stationID}`} key={item.stationID}>
            <Flarecard item={item} ></Flarecard>
          </Link>)}
        </div>}

        <div className="lg:hidden md:hidden flex justify-center py-3">
          <Pagination pageSize={pageSize} simple={{ readOnly: true }} current={currentPage} onChange={setCurrentPage} total={flare.length} >
            {[flare[currentPage]].map((item: any) => <Link key={item?.stationID} href={`water/detail/${item?.stationID}`}>
              <Flarecard key={item?.stationID} item={item}></Flarecard>
            </Link>)}
          </Pagination>
        </div>

        {display == "Map" && <div className="flex gap-5 ">
          <div className="basis-2/5 lg:block md:hidden hidden">
            <Link href={`flare/detail/someid${selectedPlace?.stationID!}`}>
              <Flarecard item={selectedPlace}></Flarecard>
            </Link>
          </div>
          <div className="lg:basis-3/5 w-full lg:h-auto md:h-[50vh] h-[50vh]">
            <MapPick data={flare} setState={setSelectedPlace} unit="mg/L" key="COD" />
          </div>
        </div>}
      </section>

      <section id="table" className="px-10 py-10">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="text-[20px] font-bold">ตารางตรวจวัดสถานีแฟลร์ทั้งหมด</div>
          <div className="search"> <Input size="middle" placeholder="ค้นหา" className="text-slate-500 noto-sans" prefix={<Search />} /></div>
        </div>

        <div className='py-5'>
          <Table data={flare}

            columns={
              [{
                title: <div>สถานี</div>,
                dataIndex: 'nameEN',
              },
              {
                title: <div className='text-center'>ประเภทพื้นที่</div>,
                dataIndex: 'areaTH',
                render: (text: string) => <div className='text-center'>{text}</div>,
              },
              {
                title: <div className='text-center'>พื้นที่</div>,
                dataIndex: 'area',
                render: (text: string) => <div className='text-center'>{text}</div>,
              },
              {
                title: <div className='text-center'>สถานะ</div>,
                dataIndex: 'status',
                render: (text: string) => <div className='flex justify-center'><Badge text={text} status='good' className='text-[rgba(6, 118, 71, 1)] bg-[#ECFDF3] border-[rgba(171, 239, 198, 1)] w-[25%]'></Badge></div>,
              },
              {
                title: <div className='text-center'>เวลาอัพเดต</div>,
                dataIndex: 'update',
                render: (text: string) => <div className='text-center'>{text}</div>,
              },
              ]
            }
          />
        </div>
      </section>
    </>
  );
}