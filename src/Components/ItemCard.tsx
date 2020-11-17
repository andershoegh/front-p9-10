import React, { useState } from 'react'
import './ItemCard.scss'
import { menuItem } from '../App'

export interface ItemCardProps {
  type: string;
  name: string;
  imgSrc: string;
  price?: number;
  item?: menuItem;
  toggleModal?: CallableFunction;
  addItemToOrder?: CallableFunction;
  orderSelection?: CallableFunction;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { type, name, imgSrc, price, item, toggleModal, addItemToOrder, orderSelection } = props;
  const layout = type !== 'item' ? 'text-container' : 'text-container-centered';
  const route = './products/' + imgSrc;

  const onClickAction = () => {
    switch (type) {
      case 'category':
        break;
      case 'item':
        if(toggleModal && item?.type === 'burger') {
          toggleModal(true, item);
        } else if(addItemToOrder && item) {
          addItemToOrder(item);
        }
        break;
      case 'order selection':
        if(orderSelection) {
          orderSelection(name);
        }
    }
  }

  return (
    <div 
      className="card"
      onClick={() => onClickAction()}>
        <img src={route} alt=''></img>
        <div className={layout}>
          <span>{name.toUpperCase()}</span>
          { price 
            ? <span>{price}DKK</span>
            : null
          }
        </div>
    </div>
  )
}

export default ItemCard