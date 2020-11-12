import React, { useState } from 'react'
import * as Products from '../../Utils/ProductItems'

export interface ItemGridProps {
  category: string;
}

const ItemGrid: React.FC<ItemGridProps> = (props) => {
  const { category } = props;

  const fillList = () => {
    
  }

  return (
    <div className="container">

    </div>
  )
}

export default ItemGrid