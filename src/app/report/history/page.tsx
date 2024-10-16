'use client'

import React from 'react'

export default function page() {
    return (
        <>
            <section className="max-w-3xl mx-auto p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">ประวัติการใช้งาน</h1>

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm space-y-4 sm:space-y-0">
                        <div className="flex-1">
                            <span className="block text-sm text-gray-500">วันที่</span>
                            <p className="text-base font-bold">24 กันยายน 2567</p>
                        </div>
                        <div className="flex-1">
                            <span className="block text-sm text-gray-500">ประเภทการร้องเรียน</span>
                            <p className="text-base font-bold">แนะนำติชม</p>
                        </div>
                        <div className="flex-1">
                            <span className="block text-sm text-gray-500">ข้อมูลเพิ่มเติม</span>
                            <p className="text-base font-bold">การใช้งานดี ยอดเยี่ยม</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm space-y-4 sm:space-y-0">
                        <div className="flex-1">
                            <span className="block text-sm text-gray-500">วันที่</span>
                            <p className="text-base font-bold">20 กันยายน 2567</p>
                        </div>
                        <div className="flex-1">
                            <span className="block text-sm text-gray-500">ประเภทการร้องเรียน</span>
                            <p className="text-base font-bold">แนะนำติชม</p>
                        </div>
                        <div className="flex-1">
                            <span className="block text-sm text-gray-500">ข้อมูลเพิ่มเติม</span>
                            <p className="text-base font-bold">-</p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}