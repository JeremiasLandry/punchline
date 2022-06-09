import React from "react";
import Item from '../Item/Item';
import './ItemList.css'

function ItemList({items}){
    return(<ul className='item-list'>{items?.map((i) => <Item id={i.id} title={i.title} price={i.price} pictureurl={i.pictureurl}/>)}</ul>)
}

export default ItemList;