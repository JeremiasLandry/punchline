import React from 'react'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = () => {
  const { cart, clearCart, removeItem, cartTotal} = useContext(CartContext);

  const buttonStyle = {
    maxWidth:'200px',
    backgroundColor:'#ed008c',
    borderColor:'#ed008c',
    borderRadius:'0',
    fontFamily: 'Oswald'
  }
  

  if (cart.length === 0) {
    return <div className="container my-5 d-flex justify-content-start flex-column align-items-center" style={{height:100+'vh'}}>
                <h2 className="mainTitle">TU CARRITO ESTA VACÍO</h2>
                <hr/>
                <h5>Vuelve al shop para comprar</h5>
                <Link to={"/"} className="add-to-cart-btn linkBtn" style={{backgroundColor:'#ed008c',maxWidth:100+'px',marginTop:25+'px'}}>VOLVER</Link>
            </div>
  }

  return (
      <div className="container my-5" style={{maxWidth:800+'px',minHeight:100+'vh'}}>
          <h2 className='mainTitle'>TU COMPRA</h2>
          <hr/>

          {
              cart.map((item) => (
                  <div key={item.id} className='d-flex my-5 cart-card' style={{backgroundColor:'#212529', color:'#fff'}}>
                      <img src={item.pictureurl !== undefined? item.pictureurl : console.log('error')} alt={item.title}/>
                      <div className="d-flex flex-column mx-5 justify-content-between">
                        <div className="d-flex flex-column">
                            <h4 className='py-2 item-title'>{item.title}</h4>
                            <p className='fuente'>Cantidad: {item.count}</p>
                            <p className='fuente'>Talle: {item.size}</p>
                            <h5>Precio: ${item.price * item.count}</h5>
                        </div>
                        <button 
                            className="btn btn-danger my-3 deleteItem-btn"
                            onClick={() => removeItem(item.id)}
                        >
                            ELIMINAR ITEM
                        </button>
                      </div>
                  </div>
              ))
          }

          <h3 style={{fontFamily: 'Oswald'}}><b>TOTAL:</b> ${cartTotal()}</h3>
          <hr/>
          <button className="btn clearCart-btn" onClick={clearCart}>Vaciar carrito</button>
          <Link to='/checkout' className="add-to-cart-btn linkBtn" style={{marginLeft:10+'px'}}>TERMINAR MI COMPRA</Link>
      </div>
  )
}
 
export default Cart