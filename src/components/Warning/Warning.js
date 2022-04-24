import React from 'react'
import './Warning.css'

const Warning = ({titulo,mensaje}) => {
  return (
    <div className="warning-container">
      <h3 className='mainTitle' style={{fontSize:1.5+'em'}}>{titulo}: </h3>
      <span> {mensaje}</span>
    </div>
  )
}

export default Warning