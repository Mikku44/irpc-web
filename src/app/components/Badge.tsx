export default function Badge({text,className}:any){
    return <div className={`rounded-full px-3 py-0 text-[12px] border border-1 flex items-center justify-center ${className}`}>
        {text}
    </div>
}