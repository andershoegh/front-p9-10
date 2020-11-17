import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MenuSelection.scss'
import { menuItem, Menu } from '../../../App'
import ItemGrid from '../../ItemGrid/ItemGrid'
import ItemCard from '../../ItemCard/ItemCard'
import { Sides, Drinks } from '../../../Utils/ProductItems'

interface MenuSelectionProps {
  selectedItem: menuItem;
  addItemToOrder: CallableFunction;
}

const MenuSelection: React.FC<MenuSelectionProps> = (props) => {
  const { selectedItem, addItemToOrder } = props;
  const [selectedDrink, setSelectedDrink] = useState<menuItem>();
  const [selectedSide, setselectedSide] = useState<menuItem>();

  const addMenuToOrder = () => {
    if(selectedDrink && selectedSide) {
      let newMenu = { burger: selectedItem, drink: selectedDrink, side: selectedSide, type: 'menu' }

      addItemToOrder(newMenu);
    }
  }

  return (
    <div>
      <div className="headline-text">Main</div>
      <div className="item-container">
        <ItemCard 
          type='item' 
          scale={150}
          name={selectedItem.name} 
          imgSrc={selectedItem.imgSrc}
          price={selectedItem.price}
        />
      </div>
      
      <div className="headline-text">Drinks</div>
      <div className="item-container">
        { Drinks.map((item, key) => {
          return (
            <div key={key}>
              <ItemCard 
                type='item'
                scale={150}
                name={item.name}
                imgSrc={item.imgSrc}
                price={item.price}
                item={item}
                setSelectedItem={setSelectedDrink}
              />
            </div>
          )
        })}
      </div>

      <div className="headline-text">Sides</div>
      <div className="item-container">
      { Sides.map((item, key) => {
          return (
            <div key={key}>
              <ItemCard 
                type='item'
                scale={150}
                name={item.name}
                imgSrc={item.imgSrc}
                price={item.price}
                item={item}
                setSelectedItem={setselectedSide}
              />
            </div>
          )
        })}      </div>

      <Link to='mainpage'>
        <button id='add-button' onClick={addMenuToOrder}>Add to order</button>
      </Link>
    </div>
  )
}

export default MenuSelection