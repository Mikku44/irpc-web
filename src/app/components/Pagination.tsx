'use client'

import { Button } from "antd"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function Pagination({pageSize,defaultCurrent,total,className,current,onChange}:any){
    return  <>
    <div className={`flex justify-evenly ${className}`}>
        <Button className="aspect-square w-10 h-10 p-[10px]" onClick={onChange} value={0}><ArrowLeft /></Button>
        <div className="">
            {current} of {total/pageSize}
        </div>
        <Button className="aspect-square w-10 h-10 p-[10px]"  onClick={onChange} value={1}><ArrowRight /></Button>
    </div>
    </>
    // <Pagination pageSize={pageSize} simple={{ readOnly: true }} defaultCurrent={0} total={sounds.length} className="lg:hidden md:hidden flex justify-center py-3" />
}