'use client'

import { getData } from '@/app/ultilities/api';
import { FullDateFormator } from '@/app/ultilities/DateFormater';
import { Breadcrumb, Button, Checkbox, Input, Table, Tag } from 'antd';
import { ChevronRight, House, MapPin, CirclePlay, CloudDownload, Trash2, } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Detail() {
    const [EQMs, setEQMs] = useState<any>();
    const fetchData = async () => {
        const result = await getData('/forWeb/getEqmsList.php')
        setEQMs(result || [])
    
    
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    const dataSource = [
        { key: '1', code: 'SSDD', location: 'CEMs HRSG 61', type: 'SSDD', parameter: '-', status: 'Normal' },
        { key: '2', code: '', location: 'CEMs HRSG 21', type: '', parameter: '-', status: 'Normal' },
        { key: '3', code: '', location: 'CEMs Auxiliary Boiler', type: '', parameter: '-', status: 'Normal' },
        { key: '4', code: '', location: 'WWT1&2 จุดที่1', type: '', parameter: '-', status: 'Normal' },
        { key: '5', code: '', location: 'WWT3 จุดที่1', type: '', parameter: '-', status: 'Normal' },
        { key: '6', code: '', location: 'CEMs HRSG 61', type: '', parameter: '-', status: 'Normal' },
    ];

    const columns = [
        {
            title: 'รหัสสถานี',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'ชื่อสถานี',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'ประเภทการตรวจวัด',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'พารามิเตอร์',
            dataIndex: 'parameter',
            key: 'parameter',
        },
        {
            title: 'สถานะออกจากระบบ',
            dataIndex: 'status',
            key: 'status',
            render: (status:any) => (
                <Tag className='rounded-[30px]'  color={status === 'Normal' ? 'green' : 'volcano'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'ตรวจสอบสถานะล่าสุด',
            key: 'checkStatus',
            render: () => (
                <span>
                    <Checkbox checked>Normal</Checkbox>
                    <Checkbox>Malfunction</Checkbox>
                </span>
            ),
        },
        {
            title: 'Remark',
            key: 'remark',
            render: () => <Input placeholder="Enter remark" />,
        },
    ];

    return <>

        <div className="container-x bg-white py-10">
            <Breadcrumb
                separator={<ChevronRight />}

                className='py-10'
                items={[
                    {
                        href: '',
                        title: <House />,
                    },
                    {
                        href: '/EQMs',
                        title: (
                            <>
                                <span className='px-2'>สถานีทั้งหมด</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>SSDD</div>,
                    },
                ]}
            />
            <section className="flex justify-between py-5">
                <div>
                    <h3 className="font-bold text-[30px]">Daily Status</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date())}</div>
                </div>

            </section>

            <div className="w-full bg-slate-200 h-[1px] rounded-xl my-10"></div>
            <section className="">

                <Table dataSource={dataSource} columns={columns} pagination={false} className='w-full' />
            </section>

        </div>
    </>
}