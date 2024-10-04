'use client'

import Segmented from "antd/es/segmented"
import { SegmentList } from "../globals"
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import {setCookie,getCookie} from "../ultilities/setCookie";


export default function SegmentMenu() {

    useEffect(()=>{
        const segment = window.location.href.split('/').pop()
        setSegmentValue(segment!)
        setCookie("currenSegment",`${segment}`,30)
    },[])

    const [segmentValue, setSegmentValue] = useState<string | number>(getCookie("currenSegment")!);

    const router = useRouter();



    useEffect(() => {
        if (segmentValue) {
            router.push(`/${segmentValue}`)
        }
    }, [segmentValue])


    return <div className="w-full py-5 ">
        <Segmented options={SegmentList} size='large' className='w-full py-2 px-2' value={segmentValue} onChange={setSegmentValue} block />
    </div>
}


