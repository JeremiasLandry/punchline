import React from 'react'
import { NavLink } from 'react-router-dom';
import './ShopNav.css'

const ShopNav = ({setCategory,setCurrentPage}) => {

  const handleCategory = (category) => {
    setCategory(category);
    setCurrentPage(1)
  }

  return (
    <div className='my-3 category-container'>
        <NavLink onClick={() => handleCategory('accesorios')} to='/tienda/accesorios' className='shop-filter-btn'>ACCESORIOS</NavLink>
        <NavLink onClick={()=> handleCategory('calzados')} to='/tienda/calzados' className='shop-filter-btn'>CALZADOS</NavLink>
        <NavLink onClick={()=> handleCategory('buzos')} to='/tienda/buzos' className='shop-filter-btn'>BUZOS</NavLink>
        <NavLink onClick={()=> handleCategory('pantalones')} to='/tienda/pantalones' className='shop-filter-btn'>PANTALONES</NavLink>
        <NavLink onClick={()=> handleCategory('camperas')} to='/tienda/camperas' className='shop-filter-btn'>CAMPERAS</NavLink>
    </div>
  )
}

export default ShopNav