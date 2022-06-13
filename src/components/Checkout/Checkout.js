import React from 'react'
import { useContext, useState, useEffect} from 'react'
import { CartContext } from '../../context/CartContext'
import { db } from '../../firebase/config'
import { collection, getDoc, addDoc, Timestamp, doc, updateDoc} from 'firebase/firestore'
import { Navigate, Link, useLocation} from 'react-router-dom'
import './Checkout.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Warning from '../Warning/Warning'
import Loader from '../Loader/Loader'

const Checkout = () => {

  const {cart, cartTotal, clearCart} = useContext(CartContext)
  const { pathname } = useLocation();

  const [orderId, setOrderId] = useState(null);
  const [loaderState, setLoaderState] = useState(false);
  const [values, setValues]  = useState({
      nombre:'',
      email: '',
      tel:'',
      apellido:'',
      confirmEmail:''
  });
  const [errorMessage,setErrorMessage] = useState({
    empty: false,
    wrongTel:false,
    emailCheck:false,
    stock:false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, orderId]);

  const handelInputChange = (e) => {
    if (e.target.name === 'tel'){
        setValues({
            ...values,
            [e.target.name]:  Number(e.target.value)
        })
    }else{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
  }


  const handleSubmit = (e) =>{
      e.preventDefault();

      setErrorMessage({
        empty: false,
        wrongTel:false,
        emailCheck:false,
        stock:false
      });

      if(values.nombre === '' || values.apellido === '' || values.email === '' || values.tel === '' || values.confirmEmail === ''){
        setErrorMessage({
            ...errorMessage,
            empty: true
        })
      }else if (!(typeof(values.tel) === 'number') || isNaN(values.tel)){
        setErrorMessage({
            ...errorMessage,
            wrongTel:true
        })
      }else if(values.email !== values.confirmEmail){
        setErrorMessage({
          ...errorMessage,
          emailCheck:true
        })
      }else{
        setLoaderState(true)

        const orden = {
            items:cart,
            total: cartTotal(),
            buyer:{...values},
            fechaYhora: Timestamp.fromDate(new Date())
        }
        
        
        const ordersRef = collection(db, 'orders')
        
        
        cart.forEach((item) => {
            if(orderId === null){
        
                const docRef = doc(db, 'productos', item.id)
                getDoc(docRef)
                    .then((doc)=>{
                        if (doc.data().stock >= item.count) {
                            if(!errorMessage.stock){
                                updateDoc(docRef, {
                                    stock:doc.data().stock - item.count
                                });                                           
                            }
                        } else {
                            setErrorMessage({
                                ...errorMessage,
                                stock:true
                            }) 
                        }
                    })                  
            }
        });

        if(!errorMessage.stock){
            addDoc(ordersRef, orden)
            .then((doc) => {
                setOrderId(doc.id)
                clearCart()           
            })
        }

      }
      
  }
  
  

  if(orderId){
      return (<div className='container my-5' style={{height:100+'vh'}}>
                <h2 className='mainTitle'>TU ORDEN SE REGISTRÓ EXITOSAMENTE!</h2>
                <h4 style={{fontFamily: 'Oswald',fontWeight:500,marginTop:25+'px'}}>GUARDA TU NÚMERO DE ORDEN: <span style={{fontFamily:'sans-serif',paddingLeft:10+'px'}}>{orderId}</span></h4>
                <hr/>
                <Link to='/' className='backHome'><FontAwesomeIcon icon={faArrowLeft}/>  VOLVER AL INICIO</Link>
              </div>)
  }

  if(cart.length === 0){
      return <Navigate to='/'/>
  }


  return (
    <div className="container my-5 checkout-container">
        <h2 className='mainTitle'>CHECKOUT</h2>
        <hr/>

        <form onSubmit={handleSubmit}>
            <input
                className="my-2 checkout-form"
                type={'text'}
                placeholder='INTRODUCE TU NOMBRE'
                value={values.nombre}
                onChange={handelInputChange}
                name='nombre'
                required
            />
            <input
                className="my-2 checkout-form"
                type={'text'}
                placeholder='INTRODUCE TU APELLIDO'
                value={values.apellido}
                onChange={handelInputChange}
                name='apellido'
                required
            />
            <input
                className="my-2 checkout-form"
                type={'email'}
                placeholder='INTRODUCE TU EMAIL'
                value={values.email}
                onChange={handelInputChange}
                name='email'
                required
            />
            <input
                className="my-2 checkout-form"
                type={'email'}
                placeholder='CONFIRMA TU EMAIL'
                value={values.confirmEmail}
                onChange={handelInputChange}
                name='confirmEmail'
                required
            />
            <input
                className="my-2 checkout-form"
                type={'tel'}
                placeholder='INTRODUCE TU TEL'
                value={values.tel}
                onChange={handelInputChange}
                name='tel'
                required
            />

            <button className="add-to-cart-btn my-3" type='submit'>ENVIAR</button>
            {
                 errorMessage.empty
                 ? <Warning titulo='CAMPOS VACÍOS' mensaje='Asegúrate de no dejar campos vacíos.'/>
                 : errorMessage.wrongTel 
                   ? <Warning titulo='UTILIZA NÚMEROS' mensaje='Asegurate de introducir números en el campo "Telefono".'/>
                   : errorMessage.emailCheck ? <Warning titulo='AVISO' mensaje=' Asegurate de que las direcciones email coincidan.' boton='ENTENDIDO'/> : ''    
            }
            {
                errorMessage.stock
                ? <Warning titulo='LO SENTIMOS' mensaje='Uno de los productos de tu carrito se ha quedado sin stock. Vuelve a intentarlo mas tarde...'/>
                : ''
            }
            {
                loaderState
                ? <div className='d-flex justify-content-center my-3'><Loader/></div>
                : ''
            }
        </form>
    </div>
  )
}

export default Checkout