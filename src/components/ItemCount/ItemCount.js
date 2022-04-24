import React from 'react';
import './ItemCount.css'

const countStyle={
    backgroundColor:'#d1d1d1',
    padding: '6px 25px'
}

function ItemCount({stock,count, setCount, onAdd}){
    
    const Add = ()=>{
        if (count !== parseInt(stock)){
            setCount(count + 1)
        }
    }

    const Substract = ()=>{
        if (count !== 0){
            setCount(count - 1)
        }
    }

    return(<div className="itemCount">
                    <h4>Cantidad:<span style={{fontSize:.9+'em',fontWeight:100}}> {count} ({stock - count} Disponibles)</span></h4>
                    <div className='counter-container'>
                        <button onClick={() => Substract()} type='button' className="counterBtn" disabled={count === 0}>-</button>
                        <span>{count}</span>
                        <button onClick={() => Add()} type='button' className="counterBtn" disabled={count >= stock}>+</button>
                    </div>
                    <button onClick={onAdd} style={{marginTop:10 +'px'}} type='button' className="add-to-cart-btn" disabled={count === 0}>AGREGAR AL CARRITO</button>
           </div>)
}

export default ItemCount;