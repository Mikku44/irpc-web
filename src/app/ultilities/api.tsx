import axios from "axios";



export async function getData(extPath:string){
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    // const data = {}
    console.log(data)
    return data
}