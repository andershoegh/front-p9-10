import React from 'react'
import './ItemCard.scss'

export interface ItemCardProps {
    type: string
    name: string
    imgSrc: string
    price?: number
    toggleModal?: CallableFunction
    orderSelection?: CallableFunction
    className?: string
    onClick?: ()=> void 
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
    const {
        type,
        name,
        imgSrc,
        price,
        toggleModal,
        orderSelection,
        className,
    } = props
    const route = './products/' + imgSrc

    switch (type) {
        case 'category':
            return (
                <div className={'card ' + className} onClick={props.onClick ? props.onClick : ()=>{}}>
                    <img src={route} alt=""></img>
                    <div className="text-container-centered">
                        <span className="category-span">
                            {name.toUpperCase()}
                        </span>
                    </div>
                </div>
            )
        case 'item':
            if (toggleModal) {
                return (
                    <div className="card" onClick={() => toggleModal(true)}>
                        <img src={route} alt=""></img>
                        <div className="text-container-centered">
                            <span>{name.toUpperCase()}</span>
                            {price ? <span>{price}DKK</span> : null}
                        </div>
                    </div>
                )
            }
            break
        case 'order selection':
            if (orderSelection) {
                return (
                    <div className="card" onClick={() => orderSelection(name)}>
                        <img src={route} alt=""></img>
                        <div className="text-container">
                            <span>{name.toUpperCase()}</span>
                        </div>
                    </div>
                )
            }
            break
        default:
            return <></>
    }

    return <></>
}

export default ItemCard
