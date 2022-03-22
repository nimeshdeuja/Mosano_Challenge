import { CountryType } from '../App'
import './input.css'

type Props = {
    type:'text' | 'date' | 'select',
    title:string,
    value:string,
    onChange:(e:any)=> void,
    label:string,
    options?:CountryType[],
    className:string,
    error:boolean,
    errorMessage?:string,
}

const Input = ({type, title,value, onChange, label, options, className, error,errorMessage}: Props) => {
  return (
      <div className='input-container'>
        <label htmlFor={title}>{label}</label>
        {type === 'text' || type === 'date' 
            ? <input type={type} onChange={onChange} className={className} value={value} /> 
            : type === 'select' && options && 
                <select onChange={onChange} className={className} value={value}>
                    <option value=''>Select</option>
                    {options.length>0 && options.map(item=> <option value={item.label} key={item.id}>
                        {item.label}
                    </option>)}
                </select>
        }
        {error && errorMessage && <span className='errorMessage'>{errorMessage}</span>}
    </div>
  )
}

export default Input