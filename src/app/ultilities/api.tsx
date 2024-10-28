import axios from "axios";



export async function getData(extPath: string, config: any = {}) {
    try {
        // Build full URL
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`;
        console.log(url);

        // Default headers if none are provided in config
        const defaultConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        };

        // Make GET request
        const response = await axios.get(url, defaultConfig);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw for further handling if needed
    }
}
export async function postData(extPath: string, formData: any) {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`)

    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${extPath}`, formData, {
            headers: {
                'Content-Type': 'application/json',

            }
        })
        return data;

    } catch (error) {
        return
    }


}