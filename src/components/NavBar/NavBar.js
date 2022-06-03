import React from "react";
import { Link, NavLink} from 'react-router-dom';
import CartWidget from "../CartWidget/CartWidget";
import logo from "./logo.png"
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './NavBar.css';

const logoStyle = {
    maxWidth:'200px'
}

function NavBar(){

    const { cartQuantity } = useContext(CartContext);

    return(<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid" style={{padding:0}}>
                    <Link className="navbar-brand" to="/"><img style={logoStyle} src={logo} alt="Logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        <NavLink className="nav-link navLink-style" aria-current="page" to="/">INICIO</NavLink>
                        <NavLink className="nav-link navLink-style" to="/category/accesorios">ACCESORIOS</NavLink>
                        <NavLink className="nav-link navLink-style" to="/category/calzados">CALZADOS</NavLink>
                        <NavLink className="nav-link navLink-style" to="/category/buzos">BUZOS</NavLink>
                        <NavLink className="nav-link navLink-style" to="/category/pantalones">PANTALONES</NavLink>
                        <NavLink className="nav-link navLink-style" to="/category/camperas">CAMPERAS</NavLink>
                        {
                            cartQuantity() !== 0
                            ? <CartWidget/>
                            : ''
                        }
                    </div>
                </div>
                </div>
           </nav>);
}

export default NavBar;