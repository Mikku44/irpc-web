
export const saveArrayToLocalStorage = (key: string, myObjectArray: object[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(myObjectArray));
  }
};

export const getArrayFromLocalStorage = (key: string): object[] | null => {
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