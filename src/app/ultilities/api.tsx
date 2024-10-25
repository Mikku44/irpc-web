import axios from "axios";



export async function getData(extPath: string) {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    const raw = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    // const raw = {}
    console.log(raw.data)
    return raw.data
}
export async function postData(extPath: string, formData: any) {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)
    // const raw = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`,data)
    // const raw = {}
    // console.log(raw.data)
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (error) {
        return
    }


}