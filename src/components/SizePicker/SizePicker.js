import React from 'react'

const SizePicker = ({size,setSize}) => {
  return (<div className='d-flex flex-column'>
            <h3 style={{fontSize:1.4 +'em',fontWeight:100}}>Talla: {size}</h3>
            <div className='d-flex'>
                <button onClick={()=> setSize('Large')} className='sizes-btn'>Large</button>
                <button onClick={()=> setSize('Medium')} className='sizes-btn'>Medium</button>
                <button onClick={()=> setSize('Small')} className='sizes-btn'>Small</button>
            </div>
          </div>)
}

export default SizePicker