import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MenuSelection.scss'
import { MenuItem } from '../../../App'
import ItemCard from '../../ItemCard/ItemCard'
import { Sides, Drinks } from '../../../Utils/ProductItems'

interface MenuSelectionProps {
  selectedItem: MenuItem;
  addItemToOrder: CallableFunction;
}

const MenuSelection: React.FC<MenuSelectionProps> = (props) => {
  const { selectedItem, addItemToOrder } = props;
  const [selectedDrink, setSelectedDrink] = useState<MenuItem>();
  const [selectedSide, setselectedSide] = useState<MenuItem>();

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
          scale={190}
          name={selectedItem.name} 
          imgSrc={selectedItem.imgSrc}
          price={selectedItem.price}
          item={selectedItem}
          selectedItem={selectedItem}
        />
      </div>
      
      <div className="headline-text">Drinks</div>
      <div className="item-container">
        { Drinks.map((item, key) => {
          return (
            <div key={key}>
              <ItemCard 
                type='item'
                scale={190}
                name={item.name}
                imgSrc={item.imgSrc}
                price={item.price}
                item={item}
                setSelectedItem={setSelectedDrink}
                selectedItem={selectedDrink}
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
                scale={190}
                name={item.name}
                imgSrc={item.imgSrc}
                price={item.price}
                item={item}
                setSelectedItem={setselectedSide}
                selectedItem={selectedSide}
              />
            </div>
          )
        })}      </div>

      <Link to='mainpage' className={(selectedDrink && selectedSide)? '' : 'disabled-link'} >
        <button id='add-button' onClick={addMenuToOrder} >Add to order</button>
      </Link>
    </div>
  )
}

export default MenuSelection