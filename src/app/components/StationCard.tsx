import { Badge, Checkbox, Image } from "antd";

export default function StationCard({ className, data }: any) {

    const colorMap = {
        "green": "success"
    }

    return (
        <>
            <div className={`rounded-xl border-2 border-[#84ADFF] h-[500px] grid gap-5 p-5 shadow-md ${className}`}>
                {/* Top Section with Title and Checkbox */}
                <div className="flex justify-between items-start">
                    <div className="grid gap-1">
                        <div className="text-[14px] md:text-[16px]">{data?.EqmsType}</div>
                        <div className="font-bold text-[18px] md:text-[20px]">{data?.StationNameEn}</div>
                    </div>
                    <Checkbox onClick={e => e.preventDefault()} />
                </div>

                {/* Image Section */}
                <div className="rounded-lg w-full bg-slate-300 h-[250px] overflow-hidden">
                    <img
                        src={data?.EqmsImage || "/images/ssdd.png"}
                        className="rounded-lg w-full h-full object-cover"
                        alt="Station"
                    />
                </div>

                {/* Badge Section */}
                <div className="flex items-start flex-wrap gap-2 hide-scroll overflow-y-auto h-[100px]">
                    {data?.StatusParam?.map((item: any, index: number) => (
                        <Badge
                            key={index}
                            className="border-[1px] border-[#D0D5DD] shadow-sm rounded-[5px] px-3 py-1 md:px-5"
                            style={{ padding: "2px 10px" }}
                            color={item?.color}
                            text={item?.param}
                        />
                    ))}
                </div>
            </div>
        </>


    )
}