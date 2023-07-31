import React from 'react'
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="Footer">
        <div className="Footer-socials">
          <a href='#'>
            <FontAwesomeIcon icon={faTwitter}/>
          </a>
          <a href='https://www.linkedin.com/in/jerem%C3%ADas-landry-0b66891a4/' target='_blank'>
            <FontAwesomeIcon icon={faLinkedin}/>
          </a>
        </div>
        <div className="Footer-terms">
            <Link to='/'>PRIVACY + TERMS</Link>
            <small>2022 - Created by Kabait</small>
        </div>
    </div>
  )
}

export default Footer