import React from 'react'
import { Link } from 'react-router-dom'
import './CancelModal.scss'

export interface CancelModalProps {
  showModal: boolean;
  toggleModal: CallableFunction;
  clearOrder: CallableFunction;
}

const CancelModal: React.FC<CancelModalProps> = (props) => {
  const { showModal, toggleModal, clearOrder } = props;
  const modal = document.getElementById('cancel-modal');

  if(modal) {
    if(showModal) {
      modal.style.display = 'block';
    } else {
      modal.style.display = 'none';
    }
  }

  const cancelClick = () => {
    toggleModal(false);
    clearOrder();
  }

  return (
    <div id="cancel-modal">
      <div className="modal-content">
        <h2>Are you sure you want to cancel your order?</h2>

        <div className="button-container">
          <Link className='link' to='/'>
            <button className="no-button" onClick={cancelClick}>Cancel order</button>
          </Link>
          <button className="yes-button" onClick={() => toggleModal(false)}>Continue order</button>
        </div>
      </div>
    </div>
  )
}

export default CancelModal