import React, {useState, useEffect} from 'react';
import { Navigate, Link, NavLink, useLocation} from 'react-router-dom'
import './Shop.css'
import ShopNav from '../ShopNav/ShopNav'
import ItemListContainer from '../ItemListContainer/ItemListContainer'


function Shop() {
  const { pathname } = useLocation();
  const [category, setCategory] = useState('buzos');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, currentPage, category]);

  return (
      <div className='shop-container'>
          <h1 className="mainTitle">TIENDA</h1>
          <ShopNav
          setCategory={setCategory}
          setCurrentPage={setCurrentPage}
          />
          <ItemListContainer
          categoryProp={category}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          /> 
      </div>
  )
}

export default Shop