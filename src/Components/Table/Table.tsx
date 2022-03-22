import { ListType } from '../../App'
import './table.css'

export type Props = {
    list:ListType[],
    SelectUser:(item:any)=>void,
    selected:ListType
}

const Table = ({list,SelectUser, selected}: Props) => {
  if(list.length === 0) return <div className='warning'>You don't have any data to display.</div>
  return (
    <div className='table'>
        <div className='head table-container'>
            <span className='name'>Name</span>
            <span className='country'>Country</span>
            <span className='birthday'>Birthday</span>
        </div>
        {list.length>0 && list.map((item, index)=> <div key={item.id} className={`list table-container ${index % 2 === 0?'odd':'even'} ${selected.id === item.id?'selected':''}`} onClick={()=>SelectUser(item)}>
            <span className='name'>{item.name} {item.surname}</span>
            <span className='country'>{item.country}</span>
            <span className='birthday'>{item.birthday}</span>
        </div>)}
    </div>
  )
}

export default Table