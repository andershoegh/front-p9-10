import React from 'react'
import './ItemCard.scss'
import { menuItem } from '../../App'

export interface ItemCardProps {
  type: string;
  scale: number;
  name: string;
  imgSrc: string;
  price?: number;
  item?: menuItem;
  toggleModal?: CallableFunction;
  addItemToOrder?: CallableFunction;
  orderSelection?: CallableFunction;
  setSelectedItem?: CallableFunction;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { type, scale, name, imgSrc, price, item, toggleModal, addItemToOrder, orderSelection, setSelectedItem } = props;
  const layout = type !== 'item' ? 'text-container' : 'text-container-centered';
  const route = './products/' + imgSrc;

  const divScale = {
    width: scale,
    height: scale
  }

  const onClickAction = () => {
    switch (type) {
      case 'category':
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
      className="card"
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