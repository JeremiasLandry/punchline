import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './CartWidget.css'

let iconStyle = {
    margin:"7px",
    fontSize:"20px",
}

function CartWidget(){
    
    const {cartQuantity} = useContext(CartContext)

    return(<Link to={'/cart'} className='cartWidget-container'>
                <div className='cartWidget-icon'>
                    <FontAwesomeIcon style={iconStyle} icon={faCartShopping}/>
                    <span className='cartCount'>{cartQuantity()}</span>
                </div>
           </Link> 
            );
}

export default CartWidget;