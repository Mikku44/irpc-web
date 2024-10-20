import axios from "axios";



export async function getData(extPath: string) {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    const raw = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    // const raw = {}
    console.log(raw.data)
    return raw.data
}
export async function postData(extPath: string,data:any) {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    const raw = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`,data)
    // const raw = {}
    console.log(raw.data)
    return raw.data
}