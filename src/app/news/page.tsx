import { Button } from "antd";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
  return (
    <section className="max-w-[90vw] py-10 mx-auto">
      <div className="py-10">
        <div className="text-2xl font-bold">ข่าวสาร ประชาสัมพันธ์</div>

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

  )
}