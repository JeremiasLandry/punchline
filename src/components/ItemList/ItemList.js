import React from "react";
import Item from '../Item/Item';

const ulStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'center',
    marginTop: '20px',
    flexWrap: 'wrap',
    padding: '0 10%'
}

function ItemList({items}){
    return(<ul style={ulStyle}>{items?.map((i) => <Item id={i.id} title={i.title} price={i.price} pictureurl={i.pictureurl}/>)}</ul>)
}

export default ItemList;