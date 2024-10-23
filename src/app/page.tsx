'use client'
import { ArrowRight, ArrowUpRight, ChevronRight, Fullscreen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Card from "./components/Card";
import SoundCard from "./components/SoundCard";
import SegmentMenu from "./components/SegmentMenu";
import { FullDateFormator } from "./ultilities/DateFormater";
import Badges from "./components/Badges";
import { Button, Segmented, Select,Image as ImageAnt } from "antd";
import WaterCard from "./components/WaterCard";
import MapPick from "./components/MapPick";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { SegmentList } from "./globals";
import EnvironmentCard from "./components/EnvironmentCard";
import Flarecard from "./components/Flarecard";
import StationCard from "./components/StationCard";
import { getData } from "./ultilities/api";


const MeasuringMap : any = {
  "air": "/forWeb/getAirLast.php",
  "sound": "/forWeb/getAirLast.php",
  "water": "/forWeb/getWaterLast.php",
  "environment": "/forWeb/getCemsLast.php",
  "flare": "/forWeb/getCemsLast.php",
  "EQMs": "/forWeb/getCemsLast.php",
}

const MeasuringUnitMap : any = {
  "air": "AQI",
  "sound": "dBA",
  "water": "COD/mgl",
  "environment": "NOx",
  "flare": "",
  "EQMs": "",
}

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<any>();
  const [segmentValue, setSegmentValue] = useState<string>("air");

  const [MeasuringData, setMeasuringData] = useState<any>();
  const [DashBoard, setDashBoard] = useState<any>();

  const fetchData = async () => {
    const result = await getData('/forWeb/getDashbord.php')
    setDashBoard(result || {})
  }

  const fetchMeasuringData = async () => {
    const result = await getData(MeasuringMap[segmentValue])
    setMeasuringData(result.stations || {})

  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchMeasuringData();
  }, [segmentValue])

  useEffect(() => {
    // console.log("Current Data : ",MeasuringData);
    if(MeasuringData)
    setSelectedPlace(MeasuringData[0])
  }, [MeasuringData]);




  return (
    <>


      <div className="relative ">
        <div className="h-[300px] justify-center overflow-hidden lg:flex md:hidden hidden">
          <Image src="/images/sulu2.png" alt="" width={1440} height={372} className="h-full w-full brightness-50   object-cover absolute z-[-10] " >
          </Image>
          <div className="relative flex flex-col items-center justify-center h-[400px] text-center ">
            <p className=" text-white text-3xl font-bold">รายงานผลการตรวจสอบ</p>
            <p className="  text-white ">ค่าตรวจวัดสูงสุดรายวัน ประจำวันจันทร์ ที่ 19 มิถุนายน 2566 เวลา 09:05 น.</p>
          </div>
        </div>

        <div className="relative lg:hidden md:flex flex flex-col  p-10">
          <p className=" text-black text-3xl">รายงานผลการตรวจสอบ</p>
          <p className="  text-[#475467] ">ประจำ{FullDateFormator(new Date())}</p>
        </div>

        <div className="lg:overflow-visible py-10 overflow-x-scroll">
          <div className="lg:flex md:inline-flex inline-flex  mx-2 gap-5 lg:justify-center lg:relative  bottom-[-100px]">

            <div className="  bg-white shadow-lg rounded-2xl  lg:w-auto w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/sulu3.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">คุณภาพอากาศ</p>
                </div>
                <Link href="/air">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">208</p>
                  <p className="mt-2 text-[#475467]">AQI</p>
                </div>
                <div className="w-20 h-6 text-center bg-[--error-50] text-[--error] border-[--error] border rounded-xl">
                  <p className="text-sm">มีผลกระทบ</p>
                </div>
              </div>
              <div className="m-4">
                <p className="font-bold">วัดปลวกเกตุ</p>
                <div className="flex font-light text-[#475467]">
                  <p>อัพเดทล่าสุด:</p>
                  <p>19 ส.ค. 2564 19:00 น.</p>
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-lg rounded-2xl  lg:w-auto w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/speakericon.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">คุณภาพเสียง</p>
                </div>
                <Link href="/sound">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">208</p>
                  <p className="mt-2 text-[#475467]">dBA</p>
                </div>
                <div className="w-20 h-6 text-center bg-[--error-50] text-[--error] border-[--error] border rounded-xl">
                  <p className="text-sm">มีผลกระทบ</p>
                </div>
              </div>
              <div className="m-4">
                <p className="font-bold">วัดปลวกเกตุ</p>
                <div className="flex font-light text-[#475467]">
                  <p>อัพเดทล่าสุด:</p>
                  <p>19 ส.ค. 2564 19:00 น.</p>
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-lg rounded-2xl  lg:w-auto w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/watericon.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">คุณภาพน้ำ</p>
                </div>
                <Link href="/water">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">208</p>
                  <p className="mt-2 text-[#475467]">COD/mgl</p>
                </div>
                <div className="w-20 h-6 text-center bg-[--error-50] text-[--error] border-[--error] border rounded-xl">
                  <p className="text-sm">มีผลกระทบ</p>
                </div>
              </div>
              <div className="m-4">
                <p className="font-bold">วัดปลวกเกตุ</p>
                <div className="flex font-light text-[#475467]">
                  <p>อัพเดทล่าสุด:</p>
                  <p>19 ส.ค. 2564 19:00 น.</p>
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-lg rounded-2xl  lg:w-auto w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/waveicon.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">คุณภาพการปล่อย</p>
                </div>
                <Link href="/environment">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">208</p>
                  <p className="mt-2 text-[#475467]">NOx</p>
                </div>
                <div className="w-20 h-6 text-center bg-[--error-50] text-[--error] border-[--error] border rounded-xl">
                  <p className="text-sm">มีผลกระทบ</p>
                </div>
              </div>
              <div className="m-4">
                <p className="font-bold">วัดปลวกเกตุ</p>
                <div className="flex font-light text-[#475467]">
                  <p>อัพเดทล่าสุด:</p>
                  <p>19 ส.ค. 2564 19:00 น.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden md:flex flex  justify-center text-[--primary] mt-10">
          <Link href="#" className="flex gap-2  ">ดูทั้งหมด <ChevronRight></ChevronRight></Link>
        </div>
      </div>
      <div className="bg-white h-[200px] w-full lg:block md:block hidden"></div>




      <section className="bg-[#F9FAFB] max-w-[90vw] py-10 mx-auto">
        <div className="text-[24px] font-bold py-5">รายการโปรด (2)</div>
        <div className="flex gap-10 overflow-x-auto py-5 w-[90vw]">
          {/* <Card></Card> */}
          <SoundCard className="min-w-[400px]"></SoundCard>
          <SoundCard className="min-w-[400px]"></SoundCard>
          <SoundCard className="min-w-[400px]"></SoundCard>
          {/* <SoundCard></SoundCard> */}
        </div>
      </section>


      <section className="max-w-[90vw] py-10 mx-auto">
        <div className="text-[18px] text-[--primary] font-bold">สถานีของ IRPC</div>
        <div className="text-[36px] font-bold">ข้อมูลแสดงสถานีติดตั้งเครื่องตรวจวัด</div>
        <div className="lg:hidden md:block block w-full py-5 ">
          <Select
            style={{ height: "45px", color: "black" }}
            className="w-full "
            placeholder="Search to Select"
            optionFilterProp="label"
            value={segmentValue}
            options={SegmentList}
            onChange={setSegmentValue}
          />
        </div>
        <div className="lg:block md:hidden hidden w-full py-5 ">
          <Segmented options={SegmentList} size='large' style={{ padding: "8px", color: "black" }} className='w-full py-2 px-2' value={segmentValue} onChange={e => {
            setSegmentValue(e);
          }} block />
        </div>

        <Badges></Badges>
        {<div className="flex lg:flex-row flex-col py-10  gap-5 ">
          <div className="lg:basis-2/5 basis-full flex justify-center">
            {segmentValue === "air" && <Link href={`air/detail/${selectedPlace?.stationID!}`}>
              <Card data={selectedPlace}></Card>
            </Link>}
            {segmentValue === "sound" && <Link href={`sound/detail/${selectedPlace?.stationID!}`}>
              <SoundCard ></SoundCard>
            </Link>}
            {segmentValue === "water" && <Link href={`water/detail/${selectedPlace?.stationID!}`}>
              <WaterCard data={selectedPlace}></WaterCard>
            </Link>}
            {segmentValue === "environment" && <Link href={`environment/detail/${selectedPlace?.stationID!}`}>
              <EnvironmentCard data={selectedPlace}></EnvironmentCard>
            </Link>}
            {segmentValue === "flare" && <Link href={`flare/detail/${selectedPlace?.stationID!}`}>
              <Flarecard></Flarecard>
            </Link>}
            {segmentValue === "EQMs" && <Link href={`EQMs/detail/${selectedPlace?.stationID!}`}>
              <StationCard></StationCard>
            </Link>}
          </div>
          <div className={`w-full lg:h-auto md:h-[50vh] h-[50vh]`}>
            {MeasuringData && <MapPick data={MeasuringData} setState={setSelectedPlace} unit={MeasuringUnitMap[segmentValue]} />}
          </div>
        </div>}
      </section>

      <section className="max-w-[90vw] py-10 mx-auto">
        <div className="flex justify-between py-10">
          <div className="text-2xl font-bold">ข่าวสาร ประชาสัมพันธ์</div>
          <Link href="/news"><Button className="text-[--primary]" style={{ color: "var(--primary)" }}>ดูทั้งหมด</Button></Link>

        </div>


        <div className="flex flex-wrap gap-10  justify-center">
          <div className="rounded-xl border border-[#EAECF0] bg-white shadow-md lg:max-w-[500px] md:w-[70vw] aspect-[16:9] h-fit overflow-hidden">
            <div className="h-[250px] overflow-hidden">
              <Image src="/images/blog.png" alt="" width={625} height={308} className="h-[250px] w-full"></Image>
            </div>
            <div className="flex flex-col p-4 gap-4 pt-8">
              <div className="flex flex-col">
                <div className="text-[--primary] text-[14px] font-bold">19 สิงหาคม 2567</div>
                <div className="flex justify-between">
                  <div className="text-black text-[24px] font-extrabold">ไออาร์พีซี ติด TOP 10 บริษัทชั้นนำในไทย และ TOP 30 ในอาเซียน จากนิตยสารฟอร์จูน</div>
                  <ArrowUpRight className="size-14" />
                </div>
              </div>
              <div className="text-[#475467]  text-ellipsis line-clamp-2 ">บริษัท ไออาร์พีซี จำกัด (มหาชน) (IRPC) ได้รับการจัดอันดับที่ 30 จากนิตยสารฟอร์จูน (Fortune) ที่จัดอันดับบริษัท ในภูมิภาคเอเชียตะวันออกเฉียงใต้  (Fortune Southeast Asia 500) ในปี 2567 เป็นครั้งแรก โดยประเมินและจัดอันดับจากรายได้ในปีงบประมาณ 2566 และทิศทางการเติบโตขององค์กร ตอกย้ำความแข็งแกร่งและการเติบโตในสากล</div>
            </div>
          </div>


          <div className="lg:grid md:hidden hidden gap-5 lg:max-w-[800px]">
            <div className="rounded-xl border border-[#EAECF0] flex bg-white shadow-md max-w-fit  overflow-hidden">
              <div className="w-[1000px] overflow-hidden">
                <Image src="/images/blog1.png" alt="" width={625} height={308} className="w-full h-full object-cover"></Image>
              </div>
              <div className="flex flex-col p-4 gap-4 pt-8">
                <div className="flex flex-col">
                  <div className="text-[--primary] text-[14px] font-bold">19 สิงหาคม 2567</div>
                  <div className="flex justify-between">
                    <div className="text-black text-[24px] font-extrabold">ไออาร์พีซี ติด TOP 10 บริษัทชั้นนำในไทย และ TOP 30 ในอาเซียน จากนิตยสารฟอร์จูน</div>
                  </div>
                </div>
                <div className="text-[#475467]  text-ellipsis line-clamp-2 ">บริษัท ไออาร์พีซี จำกัด (มหาชน) (IRPC) ได้รับการจัดอันดับที่ 30 จากนิตยสารฟอร์จูน (Fortune) ที่จัดอันดับบริษัท ในภูมิภาคเอเชียตะวันออกเฉียงใต้  (Fortune Southeast Asia 500) ในปี 2567 เป็นครั้งแรก โดยประเมินและจัดอันดับจากรายได้ในปีงบประมาณ 2566 และทิศทางการเติบโตขององค์กร ตอกย้ำความแข็งแกร่งและการเติบโตในสากล</div>
              </div>
            </div>
            <div className="rounded-xl border border-[#EAECF0] flex bg-white shadow-md max-w-fit  overflow-hidden">
              <div className="w-[1000px] overflow-hidden">
                <Image src="/images/blog1.png" alt="" width={625} height={308} className="w-full h-full object-cover"></Image>
              </div>
              <div className="flex flex-col p-4 gap-4 pt-8">
                <div className="flex flex-col">
                  <div className="text-[--primary] text-[14px] font-bold">19 สิงหาคม 2567</div>
                  <div className="flex justify-between">
                    <div className="text-black text-[24px] font-extrabold">ไออาร์พีซี ติด TOP 10 บริษัทชั้นนำในไทย และ TOP 30 ในอาเซียน จากนิตยสารฟอร์จูน</div>
                  </div>
                </div>
                <div className="text-[#475467]  text-ellipsis line-clamp-2 ">บริษัท ไออาร์พีซี จำกัด (มหาชน) (IRPC) ได้รับการจัดอันดับที่ 30 จากนิตยสารฟอร์จูน (Fortune) ที่จัดอันดับบริษัท ในภูมิภาคเอเชียตะวันออกเฉียงใต้  (Fortune Southeast Asia 500) ในปี 2567 เป็นครั้งแรก โดยประเมินและจัดอันดับจากรายได้ในปีงบประมาณ 2566 และทิศทางการเติบโตขององค์กร ตอกย้ำความแข็งแกร่งและการเติบโตในสากล</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-gray-50 p-6 max-w-[90vw] flex-wrap mx-auto rounded-lg flex items-center justify-between">
        {/* Left Section */}
        <div className="flex flex-col sm:basis-1/2">
          <h2 className="text-xl font-extrabold text-black mb-2">รายงานประจำวัน</h2>
          <p className="text-gray-600">ข้อมูลเชิงลึกและผลการดำเนินงานในแต่ละวัน</p>
        </div>

        <div className="flex items-center flex-wrap lg:gap-10 md:gap-5 gap-2 lg:py-0 py-5 sm:basis-1/2">
          <div className="flex items-center mb-4">
            <ImageAnt src={DashBoard?.report?.[0]?.reportFile || "/images/irpc-logo.png"} width={202} alt="report preview" className="w-auto h-16 object-contain" />
          </div>
          {/* Right Section */}
          <div className="flex flex-col">
            <p className=" text-[20px] font-bold">{DashBoard?.report?.[0]?.dateThai}</p>
            <p className=" text-[16px] text-gray-500 ">ข้อมูลเชิงลึกและผลการดำเนินงานในแต่ละวัน</p>
            <a href="#" className="text-[--primary] font-bold hover:underline flex gap-2">
              ดูรายงาน <ArrowRight></ArrowRight>
            </a>
          </div>
        </div>
      </section>


      <Footer></Footer>
    </>
  );
}