import React from 'react'
import './ItemCard.scss'

export interface itemCardProps {
  name: string;
  imgSrc: string;
  price?: number;
}

const itemCard: React.FC<itemCardProps> = (props) => {
  const { name, imgSrc, price } = props;
  const textContainer = price ? 'text-container' : 'text-container-centered';
  
  const route = './products/' + imgSrc;

  return (
    <div className="card">
      <img src={route} alt='Card'></img>
      <div className={textContainer}>
        <span>{name.toUpperCase()}</span>
        { price 
          ? <span>{price}DKK</span>
          : null
        }
      </div>
    </div>
  )
}

export default itemCard