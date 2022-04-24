import React from 'react'
import { useNavigate, Link} from 'react-router-dom';
import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount'
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faCheck} from '@fortawesome/free-solid-svg-icons';
import SizePicker from '../SizePicker/SizePicker';




const options = [
  {value: 'L', text: 'Large'},
  {value: 'M', text: 'Medium'},
  {value: 'S', text: 'Small'}
]

const ItemDetail = ({productDetail}) => {
  const {id, title, price, pictureurl, stock, color} = productDetail;

  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate(-1)
  }

  const [count, setCount] = useState(0);
  const [size, setSize] = useState('Large');
  
  const { addItem, isInCart } = useContext(CartContext)

  const agregarAlCarrito = () => {
    const itemToAdd = {
      id,
      title,
      price,
      pictureurl,
      count,
      size
    }
    count > 0 && addItem(itemToAdd)
  }

  return (
    <div className='detail-page'>
        <div className="d-flex detailCard-container">
          <button onClick={handleNavigate} type="button" className="getBack-btn"><FontAwesomeIcon icon={faArrowLeft}/> VOLVER </button>
          <div className="d-flex responsiveCard">
            <img style={{minWidth:500 + 'px', maxWidth:500 + 'px'}} src={pictureurl !== undefined? pictureurl: ''} alt={title}/>
            <div className="d-flex flex-column px-5 detailCard">
              <div>
                <h2>{title}</h2>
                <p className='price'>${price}</p>
                <h3 className='fuente'>Color: <small>{color}</small></h3>
                <p className='fuente'> El tiempo de entrega es de 2-4 días laborables</p>
                <p className='fuente checkInfo'><FontAwesomeIcon icon={faCheck}/> Garantía de devolución gratuita</p>
                <p className='fuente checkInfo'><FontAwesomeIcon icon={faCheck}/> Garantía de devolución de dinero</p>
                <p className='fuente checkInfo'><FontAwesomeIcon icon={faCheck}/> 30 días de garantía de devolución</p>
              </div>
              { stock === 0 && <p style={{color: 'red', fontWeight: '700'}}>¡Sin stock disponible!</p> }
              
              {
                !isInCart(id)
                ? <>
                  <SizePicker size={size} setSize={setSize}/>
                    <ItemCount
                      stock={stock} 
                      onAdd={agregarAlCarrito}
                      setCount={setCount}
                      count={count}
                    />

                  </>
                : <Link to='/cart' style={{marginTop:10 +'px'}} className="add-to-cart-btn linkBtn">TERMINAR MI COMPRA</Link>
              }
            </div>
          </div>
        </div>

    </div>
  )
}

export default ItemDetail