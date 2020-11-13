import React from 'react'
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
  const route = './products/' + imgSrc;

  switch (type) {
    case 'category':
      // Menu card for selecting category
      return (
        <div className="card">
          <img src={route} alt=''></img>
          <div className='text-container'>
            <span>{name.toUpperCase()}</span>
          </div>
        </div>
      )
    case 'item':
      if (toggleModal && item?.type === 'burger') {
        // Card for selecting a burger and opening modal
        return (
          <div 
            className="card"
            onClick={() => toggleModal(true, item)}>
              <img src={route} alt=''></img>
              <div className='text-container-centered'>
                <span>{item.name.toUpperCase()}</span>
                { price 
                  ? <span>{item.price}DKK</span>
                  : null
                }
              </div>
          </div>
        )
      } else if (addItemToOrder && item) {
        // Card for selecting !burger and adding it to the order
        return (
          <div 
            className="card"
            onClick={() => addItemToOrder(item)}>
              <img src={route} alt=''></img>
              <div className='text-container-centered'>
                <span>{item.name.toUpperCase()}</span>
                { price 
                  ? <span>{item.price}DKK</span>
                  : null
                }
              </div>
          </div>
        )
      }
      break;
    case 'order selection':
      if (orderSelection) {
        // Modal card for selecting 'single' or 'menu' option
        return (
          <div 
            className="card"
            onClick={() => orderSelection(name)}>
              <img src={route} alt=''></img>
              <div className='text-container'>
                <span>{name.toUpperCase()}</span>
              </div>
          </div>
        )
      }
      break;
    default:
      return (
        <></>
      )
  }

  return (
    <></>
  )
}

export default ItemCard