import Input from '../Input';

type Props = {
    formInputs:any,
    onSubmit:(e:any)=>void;
    inputChange:(e:any, name:string)=>void;
}

const Form = ({formInputs, onSubmit, inputChange}: Props) => {
    const formElement = [];
    for (let key in formInputs) {
      formElement.push({
        id: key,
        config: formInputs[key],
      });
    }
    if (formElement.length === 0) return null;


  return (
    <form onSubmit={onSubmit} className='form'>
         {formElement.map((el) => {
        let errorElement = el.config.touched?el.config.valid?false:true:false;
        if (el.id === "submit") {
            return <input key={el.id} type={el.config.type} className={el.config.className} value={el.config.text} />
        } else {
            if(el.config.options) return<Input key={el.id} value={el.config.value} type={el.config.type} className={errorElement?'error':''} error={errorElement} errorMessage={el.config.validation.errorMessage} title={el.id} label={el.config.label} onChange={e=>inputChange(e.target.value, el.id)} options={el.config.options}/>
            if(el.config.validation.min) return <Input key={el.id} value={el.config.value} type={el.config.type} className={errorElement?'error':''} error={errorElement} errorMessage={el.config.validation.errorMessage} title={el.id} label={el.config.label} onChange={e=>inputChange(e.target.value, el.id)} />
            return <Input key={el.id} value={el.config.value} type={el.config.type} className={errorElement?'error':''} error={errorElement} errorMessage={el.config.validation.errorMessage} title={el.id} label={el.config.label} onChange={e=>inputChange(e.target.value, el.id)} />
        }
      })}
    </form>
  )
}

export default Form