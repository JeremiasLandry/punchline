import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import './CardReview.css';
import '../CardReviewContainer/ejemplo2.png';

const CardReview = ({url, nombre, review, score, key}) => {
  return (
    <li className='user-review-container'>
        <div>
            <img src={require(`../CardReviewContainer/${url}`)} alt='user review profile'/>
            <h3>{nombre}</h3>
            <p>{review}</p>
        </div>
        <div>
            <FontAwesomeIcon icon={faStar} id='star-icon'/>
            <span>{score}</span>
        </div>
    </li>
  )
}

export default CardReview