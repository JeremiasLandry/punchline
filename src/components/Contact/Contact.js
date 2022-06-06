import React, {useState} from 'react'
import './Contact.css';
import { collection, addDoc, Timestamp} from 'firebase/firestore';
import { db } from '../../firebase/config';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import Warning from '../Warning/Warning'


function Contact() {
    const [messageState, setMessageState] = useState(null);
    const [loader, setLoader] = useState(false);
    const [aviso, setAviso] = useState(false);
    const [errorMessage,setErrorMessage] = useState({
        empty: false,
        wrongTel:false,
        minChar:false,
        maxChar:false
    });
    
    const [values, setValues]= useState ({
      nombre:'',
      email:'',
      tel: '',
      apellido:'',
      message:''
    });

    const handleInputChange= (e) => {
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
   
    const handleSubmit = (e) => {
      e.preventDefault()

      setErrorMessage({
            empty: false,
            wrongTel:false,
            minChar:false,
            maxChar:false
      });

      if(values.nombre === '' || values.apellido === '' || values.email === '' || values.tel === '' || values.message === ''){
          setAviso(true)
          setErrorMessage({
              ...errorMessage,
              empty: true
          })
      }else if (!(typeof(values.tel) === 'number') || isNaN(values.tel)){
        setErrorMessage({
            ...errorMessage,
            wrongTel:true
        })
      }else if(values.message.length < 25){
        setErrorMessage({
            ...errorMessage,
            minChar:true
        })
      }else if(values.message.length > 2000){
        setErrorMessage({
            ...errorMessage,
            maxChar:true
        })
      }else{
          setAviso(false)
          setLoader(true)
          const consulta = {
            usuario: {...values},
            fyh: Timestamp.fromDate(new Date())
          }
  
          const consultasRef= collection(db, 'consultas')
  
          addDoc(consultasRef, consulta)
          .then((doc) => {
            setMessageState('sent')
          })
      }
    }

    if (messageState === 'sent') {
      return (<div className="container d-flex justify-content-start flex-column my-5 mx-5 align-items-center mx-auto"  style={{minHeight:100+'vh'}}>
              <h2 className='mainTitle text-center'>
                  TU CONSULTA SE ENVIO EXITOSAMENTE!
              </h2>
              <h4 style={{textAlign: 'center'}}>Dentro de un periodo de tres días obtendras una respuesta.</h4>
              <Link to="/" className="add-to-cart-btn linkBtn" style={{fontWeight:600, maxWidth:200+'px',marginTop:50+'px'}}>VOLVER AL INICIO</Link>
             </div>)
    }else{
        return (
          <div className='contact-container'>
              <h1 className='mainTitle'>CONTACTO</h1>
              <p>Envía tu consulta llenando el formulario de abajo.</p>
              <p>Obtendras una respuesta en los proximos 3 días.</p>
              {
                  
              errorMessage.empty
              ? <Warning titulo='CAMPOS VACÍOS' mensaje='Asegúrate de no dejar campos vacíos.'/>
              : errorMessage.wrongTel 
                ? <Warning titulo='UTILIZA NÚMEROS' mensaje='Asegurate de introducir números en el campo "Telefono".'/>
                : errorMessage.minChar 
                  ? <Warning titulo='CARACTERES MINIMOS' mensaje='Asegurate de introducir al menos 25 caracteres.'/>
                  : errorMessage.maxChar
                    ? <Warning titulo='DEMASIADO LARGO' mensaje='Asegurate de introducir 2000 caracteres como máximo.'/>
                    : '' 
                  
                  
              }
              <div className='checkout-container'>
                  <hr/>
                  <form onSubmit={handleSubmit} className='contact-form'>
                      <div>
                          <input
                              className="my-2 checkout-form"
                              type={'text'}
                              placeholder= 'NOMBRE'
                              value={values.nombre}
                              name='nombre'
                              onChange={handleInputChange}
                              
                          />
                          <input
                              className="my-2 checkout-form"
                              type={'text'}
                              placeholder= 'APELLIDO'
                              value={values.apellido}
                              name='apellido'
                              onChange={handleInputChange}
                              
      
                          />
                      </div>
                      <input
                          className="my-2 checkout-form"
                          type={'email'}
                          placeholder= 'EMAIL'
                          value={values.email}
                          name='email'
                          onChange={handleInputChange}
                          
                      />
                      <input
                          className="my-2 checkout-form"
                          type={'number'}
                          placeholder= 'TELEFONO'
                          value={parseInt(values.tel)}
                          name='tel'
                          onChange={handleInputChange}
                          
                          />
                      <input
                          className="my-2 checkout-form"
                          id='message-box'
                          type={'text'}
                          placeholder= 'ESCRIBE TU CONSULTA'
                          value={values.message}
                          name='message'
                          onChange={handleInputChange}
                          
                      />
                  
                      <button type="submit" className='add-to-cart-btn'>ENVIAR</button>
                      {
                          loader
                          ? <div className='d-flex justify-content-center my-3'><Loader/></div>
                          : ''
                      }
                  </form>
              </div>
      
          </div>
        )

    }

}



export default Contact