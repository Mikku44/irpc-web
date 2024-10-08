import { Badge, Checkbox, Image } from "antd";

export default function StationCard() {
    return (
        <>
            <div className="rounded-xl border-2 border-[#84ADFF] grid gap-5 h-fit p-5 shadow-md">
                <div className="flex justify-between">
                    <div className="grid">
                        <div className="text-[14px] ">SSDD</div>
                        <div className="font-bold text-[18px]">Status Sent Data to Diw</div>
                    </div>
                    <Checkbox />
                </div>

                <div className="rounded-lg w-full bg-slate-300 overflow-clip">
                    <img src="/images/ssdd.png" className="rounded-lg w-full object-cover"></img>
                </div>

                <div className="flex flex-col flex-wrap gap-2">
                    <Badge className="border-[1px] border-[#D0D5DD] shadow-sm rounded-[5px] px-2" status="success" text="CEMs HRSG 21" />
                    <Badge className="border-[1px] border-[#D0D5DD] shadow-sm rounded-[5px] px-2" status="success" text="CEMs Auxiliary Boiler" />
                </div>
            </div>
        </>
    )
}