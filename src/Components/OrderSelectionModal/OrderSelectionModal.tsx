import React from 'react'
import { Link } from 'react-router-dom'
import './OrderSelectionModal.scss'
import ItemCard from '../ItemCard/ItemCard'

export interface OrderSelectionModalInterface {
  showModal: boolean
  toggleModal: CallableFunction
  handleMenu: CallableFunction
  imgSrc: string;
}

const OrderSelectionModal: React.FC<OrderSelectionModalInterface> = (props) => {
  const { showModal, toggleModal, handleMenu, imgSrc } = props;
  const modal = document.getElementById("modal")!;

  const orderSelection = (type: string) => {
    if (type === 'Single') {
      toggleModal(false);
      handleMenu(false);
    } else if (type === 'Menu') {
      toggleModal(false);
      handleMenu(true);
    }
  }

  if(modal) {
    if (showModal) {
      modal.style.display = 'block';

    } else {
      modal.style.display = 'none';
    }
  }

  return (
    <div id="modal">
      <div className="modal-content">
        <h2>Select an option</h2>
        <div className="selection-box">
          <ItemCard 
            type='order selection'
            scale={250}
            name='Single' 
            imgSrc={imgSrc} 
            orderSelection={orderSelection}
          />
          <Link to={'menuselection'} >
            <ItemCard 
              type='order selection'
              scale={250}
              name='Menu' 
              imgSrc='frenchFries.jpg' 
              orderSelection={orderSelection}
            />
          </Link>
        </div>
        <button onClick={() => toggleModal(false)}>CANCEL</button>
      </div>
    </div>
  )
}

export default OrderSelectionModal