export function GET(req:any){
    return Response.json({
        msg:"TEST"
    })
}

export async function POST(req:any){
    const body = await req.body;
    return Response.json({
        
        msg:"TEST",
        data:body
    })
}