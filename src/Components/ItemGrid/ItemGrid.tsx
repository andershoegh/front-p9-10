import React, { useState } from 'react'
import ItemCard from '../ItemCard'
import './ItemGrid.scss'

export interface ItemGridProps {
  toggleModal?: CallableFunction;
  addItemToOrder?: CallableFunction;
  category: string;
  items: Array<{}>;
}

const ItemGrid: React.FC<ItemGridProps> = (props) => {
  const { toggleModal, addItemToOrder, category, items } = props;

  return(
    <div className="grid-container">
      { items.map((item: any, key) => {
        return (
          <div key={key}>
            <ItemCard 
              type='item' 
              name={item.name} 
              imgSrc={item.imgSrc} 
              price={item.price}
              item={item}
              toggleModal={toggleModal}
              addItemToOrder={addItemToOrder} />
          </div>
        );
      })}  
    </div>
  )
}

export default ItemGrid