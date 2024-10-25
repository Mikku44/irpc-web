'use client'

import { useEffect, useState } from "react";
import SoundCard from "../components/SoundCard";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";
import Card from "../components/Card";

export default function Page() {

    const [Fav, setFav] = useState<any>();

    function getFav() {
        const localFav = getArrayFromLocalStorage('favData');
        console.log(localFav)
        setFav([localFav]);
    }

    useEffect(() => {
        getFav();
    }, []);


    return <section className="bg-[#F9FAFB] max-w-[90vw] py-10 mx-auto">
        <div className="text-[24px] font-bold py-5">รายการโปรด ({Fav?.length || 0})</div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 overflow-x-auto justify-items-center py-5 w-[90vw]">
            {/* <Card></Card> */}
            {Fav?.map((item: any) => {
                return <Card data={item} className="lg:min-w-[80%] min-w-[400px]"></Card>
            }
            )
            }

            {/* <SoundCard></SoundCard> */}
        </div>
    </section>
}