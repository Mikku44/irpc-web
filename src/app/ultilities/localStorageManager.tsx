
export const saveArrayToLocalStorage = (key: string, myObjectArray: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(myObjectArray));
  }
};

export const getArrayFromLocalStorage = (key: string): any => {
  if (typeof window !== 'undefined') {
    const storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : null;
  }
  return null;
};


export const isObjectInArray = (myObjectArray: object[], myObject: object): boolean => {
  return myObjectArray.some((item) => isObjectEqual(item, myObject));
};

export const isObjectEqual = (obj1: object, obj2: object): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};


export async function favouriteAction(data:any,type:'air'| 'sound' | 'flare' | 'water' | 'env' | 'flare' | 'eqms') {
  const tempData = await getArrayFromLocalStorage("favData")
  if (isObjectInArray(tempData || [], data)) {
    // Remove 'data' if it already exists in 'tempData'
    saveArrayToLocalStorage("favData", tempData ? tempData.filter((item: any) => !isObjectEqual(item, data)) : []);
  } else {
    // Add 'data' if it does not exist in 'tempData'
    saveArrayToLocalStorage("favData", [...(tempData || []), { ...data, type: type }]);
  }
}