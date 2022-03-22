export const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const FilterCountries = (list:any[])=>{   
    if(list.length === 0) return [];
    return  list.map(item=>({id:uuid(),label:item.name,value:item.alpha2Code}))
}

export const getNextBirthDay = (date:string)=>{
  let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let birthDay = new Date(date)
  let birthMonth = birthDay.getMonth();

  let birthYear = birthDay.getFullYear();

  let today = new Date();
  let thisMonth = today.getMonth()
  
  let nextBirthday = today.getFullYear();
  if(birthMonth <= thisMonth) nextBirthday++

  let age = nextBirthday - birthYear;

  // if(birthDay <= new Date()) year++
  return {year: nextBirthday, month:months[birthMonth], age}
}


export const CheckValidity = (value:string, element:any, key:string) => {
  if (!element) return true;

  element[key].value = value;
  element[key].touched = true;

  let currentElement = element[key];
  let isValid = true;

  if (currentElement.validation.required) {
    isValid = value !== "" && isValid;
  }

  if(currentElement.type ==='date'){
    isValid = new Date(value) < new Date() && isValid;
  }

  return isValid;
};

export const UpdateObject = (obj:object, newObject:object) => ({
  ...obj,
  ...newObject,
});

export const UpdateArray = (arr:any[], newItem:any) => [
  ...arr,
  newItem,
];


export const UpdateInputChange = (data:any, value:string, key:string) => {
  let obj = UpdateObject(data, {
    [key]: UpdateObject(data[key], {
      value: value,
      valid: CheckValidity(value, data, key),
      touched: true,
    }),
  });
  return obj;
};