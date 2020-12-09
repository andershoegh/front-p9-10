import React from 'react'
import './FlatItemCard.scss'

export interface FlatItemCardProps {
    name: string
    imgSrc: string
    price?: number
}

const FlatItemCard: React.FC<FlatItemCardProps> = (props) => {
    const { name, imgSrc, price } = props
    const textContainer = price ? 'text-container' : 'text-container-centered'

    const route = './products/' + imgSrc

    return (
        <div className="flatCard">
            <img src={route} alt="Card"></img>
            <div className={textContainer}>
                <span>{name.toUpperCase()}</span>
                {price ? <span>{price}DKK</span> : null}
            </div>
        </div>
    )
}

export default FlatItemCard
