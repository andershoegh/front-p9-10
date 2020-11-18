import React from 'react'
import './ItemCard.scss'
import { MenuItem } from '../../App'

export interface ItemCardProps {
  type: string;
  scale: number;
  name: string;
  imgSrc: string;
  price?: number;
  item?: MenuItem;
  toggleModal?: CallableFunction;
  addItemToOrder?: CallableFunction;
  orderSelection?: CallableFunction;
  setSelectedItem?: CallableFunction;
  selectedItem?: MenuItem;
  onClick?: () => void;
  className?: string;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { type, scale, name, imgSrc, price, item, toggleModal, addItemToOrder, orderSelection, setSelectedItem, selectedItem, className, onClick} = props;
  let layout = type !== 'item' ? 'text-container' : 'text-container-centered';
  let cardStyle = className + ' card';
  const route = './products/' + imgSrc;
  const divScale = {
    width: scale,
    height: scale
  }

  if(item && selectedItem) {
    if(item === selectedItem) {
      cardStyle += ' highlighted'; 
      layout += '-highlighted';  
    } else {
      cardStyle = ' card';
      layout = 'text-container-centered';
    }
  }

  const onClickAction = () => {
    switch (type) {
      case 'category':
        if(onClick) {
          onClick();
        }
        break;
      case 'item':
        if(toggleModal && item?.type === 'burger') {
          toggleModal(true, item);
        } else if(addItemToOrder && item) {
          addItemToOrder(item);
        } else if(setSelectedItem && item) {
          setSelectedItem(item);
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
      className={cardStyle}
      style={divScale}
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