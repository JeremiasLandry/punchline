import React from 'react'
import { useContext, useState} from 'react'
import { CartContext } from '../../context/CartContext'
import { db } from '../../firebase/config'
import { collection, getDoc, addDoc, Timestamp, doc, updateDoc} from 'firebase/firestore'
import { Navigate, Link} from 'react-router-dom'
import './Checkout.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Warning from '../Warning/Warning'
import Loader from '../Loader/Loader'

const Checkout = () => {

  const {cart, cartTotal, clearCart} = useContext(CartContext)

  const [orderId, setOrderId] = useState(null)
  const [aviso, setAviso] = useState(false)
  const [loaderState, setLoaderState] = useState(false)
  const [values, setValues]  = useState({
      nombre:'',
      email: '',
      tel:'',
      apellido:'',
      confirmEmail:''
  })


  const handelInputChange = (e) => {
      setValues({
         ...values,
         [e.target.name]: e.target.value
      })
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      if (values.email === values.confirmEmail){
          setAviso(false);
          setLoaderState(true)
          const orden = {
            items:cart,
            total: cartTotal(),
            buyer:{...values},
            fechaYhora: Timestamp.fromDate(new Date())
            
        }
        
        const ordersRef = collection(db, 'orders')
    
        cart.forEach((item) => {
            const docRef = doc(db, 'productos', item.id)
    
            getDoc(docRef)
                .then((doc)=>{
                    if (doc.data().stock >= item.count) {
                        updateDoc(docRef, {
                            stock:doc.data().stock - item.count
                        })
                        addDoc(ordersRef, orden)
                            .then((doc) => {
                                setOrderId(doc.id)
                                clearCart()
                            })
                        
                    } else {
                        alert('no hay stock') //reemplazar por componente modal.
                    }
                })
        });
      }else{
          setAviso(true)  
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
                aviso
                ? <Warning titulo='AVISO' mensaje=' Asegurate de que las direcciones email coincidan.' boton='ENTENDIDO'/>
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