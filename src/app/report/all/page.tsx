'use client'
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getData } from '@/app/ultilities/api';
import { Image } from 'antd';


export default function ReportsPage() {

    const [ReportPostCard, setReportPostCard] = useState([]) 

    const fetchData = async () => {
        const result = await getData('/forWeb/reportList.php')
        setReportPostCard(result.report || [])
      }
      useEffect(() => {
        fetchData();
      }, [])
      
    return (
        <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">รายงานประจำวันทั้งหมด</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ReportPostCard.map((item: any,index) => (
                 <div key={index} className=" p-4 rounded-lg transition-shadow">
                 <div className="flex justify-center mb-4">
                     <Image src={item.reportFile} alt="Report" wrapperClassName='w-[160px] h-[226px] object-cover' className="w-[160px] h-[226px] object-cover" />
                 </div>
                 <div className="flex justify-between items-center">
                     <h3 className="font-semibold text-lg">คุณภาพอากาศโดยรวม</h3>
                     <ArrowUpRight className="ml-2" />
                 </div>
                 <p className="text-gray-500 pt-2">{item.dateThai}</p>
             </div>
            ))}
        </div>
    </div>
    
    );
}
