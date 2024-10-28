'use client'

import { FlagOff } from "lucide-react";
import { useEffect, useState } from "react";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";
import Card from "./Card";
import WaterCard from "./WaterCard";
import SoundCard from "./SoundCard";
import EnvironmentCard from "./EnvironmentCard";
import StationCard from "./StationCard";
import Flarecard from "./Flarecard";


export default function Favourite({className} : any) {

    const [Fav, setFav] = useState<any>([]);

    function getFav() {
      const localFav = getArrayFromLocalStorage('favData');
      // console.log(localFav)
      setFav(localFav || []);
    }

    useEffect(() => {
        getFav();
    }, []);

    return <section className="bg-[#F9FAFB] max-w-[90vw] py-10 mx-auto">
        <div className="text-[24px] font-bold py-5">รายการโปรด ({Fav?.length || 0})</div>
        <div className={`flex gap-10 overflow-x-auto py-5 w-[90vw] ${className}`}>
            {Fav?.map((item: any) => {
               return <>
              { item?.type == "air" &&  <Card data={item} isFav={true} className="min-w-[400px]"></Card>}
              { item?.type == "water" &&  <WaterCard data={item} isFav={true} className="min-w-[400px]"></WaterCard>}
              { item?.type == "sound" &&  <SoundCard data={item} isFav={true} className="min-w-[400px]"></SoundCard>}
              { item?.type == "flare" &&  <Flarecard item={item} isFav={true} className="min-w-[400px]"></Flarecard>}
              { item?.type == "env" &&  <EnvironmentCard data={item} isFav={true} className="min-w-[400px]"></EnvironmentCard>}
              { item?.type == "eqms" &&  <StationCard data={item} isFav={true} className="min-w-[400px]"></StationCard>}
               </>
                 
            })}
            {Fav?.length == 0 && <div className="w-full flex justify-center flex-col gap-5 items-center">
                <FlagOff className="size-[48px] text-[--primary]"></FlagOff>
                No have favourites.</div>}

        </div>
    </section>
}