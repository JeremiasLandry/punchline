import React from 'react'
import CardReview from '../CardReview/CardReview';
import './CardReviewContainer.css'

const CardReviewContainer = ({items}) => {
    return(<ul className='reviews'>
        {items?.map((i, key) => <CardReview url={i.url} nombre={i.nombre} review={i.review} score={i.score} key={key}/>)}
        </ul>)
}

export default CardReviewContainer