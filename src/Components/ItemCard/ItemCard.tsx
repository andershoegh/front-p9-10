import React, { useEffect } from 'react'
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
  highlightedItem?: string;
  onClick?: () => void;
  className?: string;
  enterPress?: boolean;
  setEnterPress?: CallableFunction;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { type, scale, name, imgSrc, price, item, toggleModal, addItemToOrder, orderSelection, setSelectedItem, selectedItem, highlightedItem, className, onClick, enterPress, setEnterPress} = props;
  let layout = type !== 'item' ? 'text-container' : 'text-container-centered';
  let fontSize;
  let cardStyle = className + ' card';
  const route = './products/' + imgSrc;

  useEffect(() => {
      if(enterPress && name === highlightedItem && setEnterPress) {
        setEnterPress(false);
        onClickAction();
      }
  }, [enterPress, highlightedItem, setEnterPress, item])

  if(type !== 'item') {
    layout = 'text-container';
    fontSize = 0.8 * (scale / 120) + 'em';
  } else {
    layout = 'text-container-centered';
    if (name.length > 20) {
      fontSize = 0.8 * (scale / 280) + 'em';
    } else {
      fontSize = 0.8 * (scale / 200) + 'em';
    }
  }

  const divScale = {
    width: scale,
    height: scale,
    fontSize: fontSize
  }

  if((selectedItem || highlightedItem) && item) {
    if(item === selectedItem) {
      cardStyle += ' selected'; 
    } else if(name === highlightedItem) {
        cardStyle += ' highlighted'
    } else {
      cardStyle = ' card';
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
      onClick={onClickAction}>
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