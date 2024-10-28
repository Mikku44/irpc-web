'use client'

import Segmented from "antd/es/segmented"
import { SegmentList, SegmentUserList } from "../globals"
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "../ultilities/setCookie";
import { Select } from "antd";
import { getData } from "../ultilities/api";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";


export default function SegmentMenu() {
    const allCategories = [
        "air",
        "water",
        "sound",
        "environment",
        "flare",
        "EQMs"
    ]

    async function fetchData() {
        try {
            const token = localStorage.getItem('token');


            // Make request with Authorization header
            const result = await getData('/forWeb/authInfo.php', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });


            if(result?.status == "ok"){
                setRole(result?.user_data?.role)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            const role = getArrayFromLocalStorage("user_data")?.role
            setRole(role || 'client')
        }
    }

    useEffect(() => {
        const segment = window.location.href.split('/').pop()
        setSegmentValue(segment!)
        setCookie("currenSegment", `${segment}`, 30)
        fetchData()

    }, [])

    const [role, setRole] = useState('client');

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
                style={{ height: "45px" }}
                className="w-full "
                placeholder="Search to Select"
                optionFilterProp="label"
                value={segmentValue}
                options={role == "ADMIN" ? SegmentList : SegmentUserList}
                onChange={setSegmentValue}
            />
        </div>
        <div className="lg:block md:hidden hidden w-full py-5 ">
            <Segmented options={role == "ADMIN" ? SegmentList : SegmentUserList} size='large' style={{ padding: "8px" }} className='w-full py-2 px-2' value={segmentValue} onChange={e => {
                setSegmentValue(e);
                router.push(`/${e}`)
            }} block />
        </div>
    </>
}


