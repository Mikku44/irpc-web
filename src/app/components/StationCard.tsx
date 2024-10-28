import { Badge, Checkbox, Image } from "antd";

export default function StationCard({ className, data }: any) {

    const colorMap = {
        "green": "success"
    }

    return (
        <>
            <div className={`rounded-xl border-2 border-[#84ADFF] h-[500px] grid gap-5 p-5 shadow-md ${className}`}>
                <div className="flex justify-between">
                    <div className="grid">
                        <div className="text-[14px] ">{data?.EqmsType}</div>
                        <div className="font-bold text-[18px]">{data?.StationNameEn}</div>
                    </div>
                    <Checkbox />
                </div>

                <div className="rounded-lg w-full bg-slate-300 max-h-[250px] overflow-clip">
                    <img src={data?.EqmsImage || "/images/ssdd.png"} className="rounded-lg w-full object-cover"></img>
                </div>

                <div className="flex items-start flex-wrap gap-2">
                    {data?.StatusParam?.map((item: any) => {
                       return <Badge className="border-[1px] border-[#D0D5DD] shadow-sm rounded-[5px] px-5" style={{ padding: "2px 10px" }} color={item?.color} text={item?.param} />
                    })}
                    {/* <Badge className="border-[1px] border-[#D0D5DD] shadow-sm rounded-[5px] px-2" status="success" text="CEMs Auxiliary Boiler" /> */}
                </div>
            </div>
        </>
    )
}