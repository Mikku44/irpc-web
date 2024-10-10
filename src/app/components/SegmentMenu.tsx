'use client'

import Segmented from "antd/es/segmented"
import { SegmentList } from "../globals"
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "../ultilities/setCookie";
import { Select } from "antd";


export default function SegmentMenu() {
    const allCategories = [
        "air",
        "water",
        "sound",
        "environment",
        "flare",
        "EQMs"
    ]

    useEffect(() => {
        const segment = window.location.href.split('/').pop()
        setSegmentValue(segment!)
        setCookie("currenSegment", `${segment}`, 30)
    }, [])

    const [segmentValue, setSegmentValue] = useState<string>(getCookie("currenSegment")!);

    const router = useRouter();



    useEffect(() => {
        if (segmentValue && allCategories.includes(segmentValue)) {
            router.push(`/${segmentValue}`)
        }
    }, [segmentValue])


    return <>
        <div className="lg:hidden md:block block w-full py-5 ">
            <Select
                className="w-full h-12"
                placeholder="Search to Select"
                optionFilterProp="label"
                value={segmentValue}
                options={SegmentList}
                onChange={setSegmentValue}
            />
        </div>
        <div className="lg:block md:hidden hidden w-full py-5 ">
            <Segmented options={SegmentList}  size='large' className='w-full py-2 px-2' value={segmentValue} onChange={e => {
                setSegmentValue(e);
                router.push(`/${e}`)
            }} block />
        </div>
    </>
}


