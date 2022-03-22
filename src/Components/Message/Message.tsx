import { getNextBirthDay } from '../Utility'
import './message.css'

export interface SelectedInterface {
        id:string,
        name:string,
        surname:string,
        country:string,
        birthday:string
}

type Props = {
    selected:SelectedInterface
}

const Message = ({selected}: Props) => {
    if(!selected) return null;
    let {year, month, age} = getNextBirthDay(selected.birthday);
    return (
        <div className='message'>Hello {selected.name} {selected.surname} from {selected.country}. on {month} of {year} you will be {age} years old!</div>
    )
}

export default Message