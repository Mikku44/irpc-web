
export default function extractKeys(data: any): string[] {
   if(data.length > 0) return Object.keys(data[0]);
   return []
    
  }