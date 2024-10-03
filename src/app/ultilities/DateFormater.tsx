export default function DateFormator(date: Date): string {
    const monthsThai = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", 
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
  
    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543 - 2500; // Convert to BE year and last 2 digits.
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
  };
  

  