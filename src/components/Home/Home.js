import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query, limit} from 'firebase/firestore'
import { db } from '../../firebase/config'
import Banner from './mainbanner.png'
import ItemList from '../ItemList/ItemList';
import Loader from "../Loader/Loader";
import { users } from '../../stock/usersReview';
import CardReviewContainer from '../CardReviewContainer/CardReviewContainer'
import { FontAwesomeIcon, fontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Home.css';


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [productosDestacados,setProductosDestacados] = useState([]);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setLoading(true);

    const productosRef = collection(db, 'productos')
    const q = query(productosRef, limit(4))
    getDocs(q)
        .then(resp => {
            const items = resp.docs.map((doc) => ({id:doc.id, ...doc.data()}))
            setProductosDestacados(items)
        })
        .finally(() => {
            setLoading(false)
        })

  }, [])

  return (
    <div className='shop-container justify-content-start'>
        <div className='bannerNcard'>
            <Link to='/tienda/buzos' style={{textDecoration:'none'}} className='d-flex'>
                <img className='banner' src={Banner} alt='main banner'/>
                <div className='banner-cardContainer'>
                    <p>COMPRA</p>
                    <p>AHORA</p>
                </div>
            </Link>
        </div>
        <Link to='/tienda/buzos'><img src={require('./mainbannermMOBILE.png')} className='mobileBanner'/></Link>
        <h1 className="mainTitle">DESTACADOS</h1>
        <ItemList items={productosDestacados}/>
        <div className='reviews-clip-container'>
            <div className='clip-path-sides'></div>
            <div className='clip-path'></div>
            <div className='clip-path-sides'></div>
        </div>
        <div className='reviews-container'>
            <CardReviewContainer items={users}/>
        </div>
        <div className='our-benefits-container'>
            <h2 className='mainTitle'>NUESTROS BENEFICIOS</h2>
            <div class="container my-5">
                <div class="row">
                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <ul className='benefits-list d-flex flex-column align-items-center justify-content-center'>
                            <li className='d-flex flex-column align-items-center justify-content-center'>
                                <img src={require('./garantia.png')}/>
                                <div className='d-flex align-items-baseline mt-5'>
                                    <FontAwesomeIcon icon={faCheck} className='check' style={{marginRight:5+'px'}}/>
                                    <p style={{textAlign: 'center'}}>GARANTÍA DE DEVOLUCIÓN GRATUITA DEL PRODUCTO</p>                                    
                                </div>
                            </li>
                            <li className='d-flex flex-column align-items-center'>
                                <img src={require('./devolver.png')}/>
                                <div className='d-flex align-items-baseline mt-5'>
                                    <FontAwesomeIcon icon={faCheck} className='check' style={{marginRight:5+'px'}}/>
                                    <p style={{textAlign: 'center'}}>GARANTÍA DE DEVOLUCIÓN DE DINERO</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <ul className='benefits-list d-flex flex-column align-items-center justify-content-center'>
                            <li className='d-flex flex-column align-items-center'>
                                <img src={require('./treintadias.png')}/>
                                <div className='d-flex align-items-baseline mt-5'>
                                    <FontAwesomeIcon icon={faCheck} className='check' style={{marginRight:5+'px'}}/>
                                    <p style={{textAlign: 'center'}}>30 DÍAS DE GARANTÍA DE DEVOLUCIÓN</p>                                    
                                </div>
                            </li>
                            <li className='d-flex flex-column align-items-center'>
                                <img src={require('./envios.png')}/>
                                <div className='d-flex align-items-baseline mt-5'>
                                    <FontAwesomeIcon icon={faCheck} className='check' style={{marginRight:5+'px'}}/>
                                    <p style={{textAlign: 'center'}}>ENVIOS GRATUITOS A PARTIR DE $15.000</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home