import { Fullscreen } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <div className="NotoSan">

      </div> */}
    <div className="-z-10 relative -top-10 ">
        <div>
        <p className="relative z-10 top-36 left-[625px] text-white text-3xl">รายงานผลการตรวจสอบ</p>
        <p className="relative z-10 top-44 left-[520px] text-white ">ค่าตรวจวัดสูงสุดรายวัน ประจำวันจันทร์ ที่ 19 มิถุนายน 2566 เวลา 09:05 น.</p>
      <Image src="/images/sulu2.png" alt=""  width={1000}  height={1000} className="w-full h-80 blur-[2px] " >
      </Image>
      <div className="flex gap-7 justify-center">

      <div className=" relative z-10 -top-24  w-80 h-56 bg-white shadow-lg rounded-2xl ">
        <div className="flex m-4 justify-between ">
        <Image src="/images/sulu3.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        <p className="mt-2 text-blue-500">คุณภาพอากาศ</p>
        <Image src="/images/sulu4.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        </div>
        <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
        <div className="flex justify-between m-4">
          <div className="flex gap-2">
            <p className="text-2xl font-bold">208</p>
            <p className="mt-2">AQI</p>
          </div>
            <div className="w-20 h-6 text-center bg-red-300 rounded-xl">
              <p className="text-sm">มีผลกระทบ</p>
            </div>
        </div>
        <div className="m-4">
          <p>วัดปลวกเกตุ</p>
          <div className="flex font-light">
            <p>อัพเดทล่าสุด:</p>
            <p>19 ส.ค. 2564 19:00 น.</p>
          </div>
        </div>
      </div>
      <div className=" relative z-10 -top-24  w-80 h-56 bg-white shadow-lg rounded-2xl ">
        <div className="flex m-4 justify-between ">
        <Image src="/images/sulu3.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        <p className="mt-2 text-blue-500">คุณภาพอากาศ</p>
        <Image src="/images/sulu4.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        </div>
        <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
        <div className="flex justify-between m-4">
          <div className="flex gap-2">
            <p className="text-2xl font-bold">208</p>
            <p className="mt-2">AQI</p>
          </div>
            <div className="w-20 h-6 text-center bg-red-300 rounded-xl">
              <p className="text-sm">มีผลกระทบ</p>
            </div>
        </div>
        <div className="m-4">
          <p>วัดปลวกเกตุ</p>
          <div className="flex font-light">
            <p>อัพเดทล่าสุด:</p>
            <p>19 ส.ค. 2564 19:00 น.</p>
          </div>
        </div>
      </div>
      <div className=" relative z-10 -top-24  w-80 h-56 bg-white shadow-lg rounded-2xl ">
        <div className="flex m-4 justify-between ">
        <Image src="/images/sulu3.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        <p className="mt-2 text-blue-500">คุณภาพอากาศ</p>
        <Image src="/images/sulu4.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        </div>
        <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
        <div className="flex justify-between m-4">
          <div className="flex gap-2">
            <p className="text-2xl font-bold">208</p>
            <p className="mt-2">AQI</p>
          </div>
            <div className="w-20 h-6 text-center bg-red-300 rounded-xl">
              <p className="text-sm">มีผลกระทบ</p>
            </div>
        </div>
        <div className="m-4">
          <p>วัดปลวกเกตุ</p>
          <div className="flex font-light">
            <p>อัพเดทล่าสุด:</p>
            <p>19 ส.ค. 2564 19:00 น.</p>
          </div>
        </div>
      </div>
      <div className=" relative z-10 -top-24  w-80 h-56 bg-white shadow-lg rounded-2xl ">
        <div className="flex m-4 justify-between ">
        <Image src="/images/sulu3.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        <p className="mt-2 text-blue-500">คุณภาพอากาศ</p>
        <Image src="/images/sulu4.svg" alt=""  width={1000}  height={1000} className="w-10 " >
        </Image>
        </div>
        <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
        <div className="flex justify-between m-4">
          <div className="flex gap-2">
            <p className="text-2xl font-bold">208</p>
            <p className="mt-2">AQI</p>
          </div>
            <div className="w-20 h-6 text-center bg-red-300 rounded-xl">
              <p className="text-sm">มีผลกระทบ</p>
            </div>
        </div>
        <div className="m-4">
          <p>วัดปลวกเกตุ</p>
          <div className="flex font-light">
            <p>อัพเดทล่าสุด:</p>
            <p>19 ส.ค. 2564 19:00 น.</p>
          </div>
        </div>
      </div>


      </div>
      </div>
    </div>
   
    </>
  );
}