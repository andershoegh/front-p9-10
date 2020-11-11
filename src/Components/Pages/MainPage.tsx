import React, { useState } from 'react'
import ItemCard from '../ItemCard'
import OrderSelectionModal from '../OrderSelectionModal/OrderSelectionModal'

export interface MainPageInterface {}

const MainPage: React.FC<MainPageInterface> = (props) => {

  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleModal = (toggle: boolean) => {
    setShowModal(toggle);
  }

  return (
    <>
      <ItemCard 
        type='item'
        name='modal' 
        imgSrc='carrots.jpg' 
        toggleModal={toggleModal}
      />
      <OrderSelectionModal showModal={showModal} toggleModal={toggleModal}/>
    </>
  )
}

export default MainPage