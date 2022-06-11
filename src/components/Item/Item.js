import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css'
import Loader from '../Loader/Loader.js'


function Item({id, title, price, pictureurl}){
  console.log(pictureurl)
    return(<li key={id} className='li-product'>
            <Link className='cardLink' to={`/item/${id}`}>
                <div className="card" >
                    <img src={pictureurl} className="card-img-top" alt={title}/>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">$ {price}</p>
                        <button  type="button" className="btn btn-primary showDetails-btn">VER MÁS</button>
                    </div>
                </div>
            </Link>
           </li>)
}

export default Item;