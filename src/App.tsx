import { useEffect, useState } from "react";
import Form from "./Components/Form/Form";
import Message from "./Components/Message/Message";
import Table from "./Components/Table/Table";
import { FilterCountries, UpdateArray, UpdateInputChange, UpdateObject, uuid } from "./Components/Utility";
import Layout from "./Layout/Layout";
import { GetCountries } from "./Server-requests/Requests";

export interface CountryType {
  id:string,
  label:string,
  value:string,
}

export type ListType = {
      id:string,
      name:string,
      surname:string,
      country:CountryType,
      birthday:string
}

function App() {
  const [list, setList]= useState<ListType[]>([]);
  const [selected, setSelected]= useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formInputs, setFormInputs] = useState<any>({
    name: {
        type: "text",
        label: "Name",
        value: "",
        validation: {
            required: true,
            errorMessage:'Name is required.'
        },
        valid: false,
        touched: false,
    },
    surname: {
        type: "text",
        label: "Surname",
        value: "",
        validation: {
            required: true,
            errorMessage:'Surname is required.'
        },
        valid: false,
        touched: false,
    },
    country: {
        type: "select",
        label: "Country",
        value: "",
        validation: {
            required: true,
            errorMessage:'Please select country you are from.'
        },
        valid: false,
        touched: false,
        options:[],
    },
    birthday: {
        type: "date",
        label: "Birthday",
        value: "",
        validation: {
            required: true,
            errorMessage:'Birthday is required.'
        },
        valid: false,
        touched: false,
    },
    submit: {
      type: "submit",
      text: "Save",
      className: "btn-save",
      clicked: (e:React.SyntheticEvent) => saveClickHandler(e),
    },
  }); 

  const inputChangeHandler = (value:string, key:string) => setFormInputs(UpdateInputChange(formInputs, value, key));

  const saveClickHandler =(e: React.SyntheticEvent)=>{
    e.preventDefault();
    let data:{[key: string]: any}={};
    let isValid = true;
    for (let key in formInputs) {
      if(key !== 'submit'){
        data[key]=formInputs[key].value;
        if(formInputs[key].value === ''){
          setFormInputs(UpdateInputChange(formInputs, formInputs[key].value, key))
        }
        isValid = isValid && formInputs[key].valid;
      }
    }
    if(isValid){
      data.id = uuid()
      setList((prev:any) =>UpdateArray(prev, data));
      setSelected(data);
      let toClear = UpdateObject(formInputs, {
        name: UpdateObject(formInputs.name, {
          value: '',
          valid: false,
          touched: false,
        }),
        surname: UpdateObject(formInputs.surname, {
          value: '',
          valid: false,
          touched: false,
        }),
        country: UpdateObject(formInputs.country, {
          value: '',
          valid: false,
          touched: false,
        }),
        birthday: UpdateObject(formInputs.birthday, {
          value: '',
          valid: false,
          touched: false,
        }),
      })
      setFormInputs(toClear);
    }
  }

  useEffect(()=>{
    if(isLoading){
      (async function serverRequests() {
        try {
          let countryList = await GetCountries('https://restcountries.com/v2/all') as [];
          setFormInputs((prev:any) =>
            UpdateObject(prev, {
              country: UpdateObject(prev.country, {
                options: FilterCountries(countryList),
              }),
            })
          );
        }
        catch(err) {
          console.log(`Error while getting countries: ${err}`)
        }
        finally{
          setIsLoading(false);
        }
      })();
    }
  },[isLoading])
  return (
    <Layout>
      <>
      {isLoading
        ?'loading...'
        :<><div className="left">
          <Form formInputs={formInputs} onSubmit={saveClickHandler} inputChange={inputChangeHandler} />
          <Message selected={selected} />
        </div>
        <div className="right"><Table list={list} SelectUser={(data)=>setSelected(data)} selected={selected} /></div></>
      }
      </>
    </Layout>
  );
}

export default App;
