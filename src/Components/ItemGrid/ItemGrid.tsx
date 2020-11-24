import React, { useState, useEffect } from 'react'
import { MenuItem } from '../../App';
import ItemCard from '../ItemCard/ItemCard'
import './ItemGrid.scss'

export interface ItemGridProps {
  toggleModal?: CallableFunction;
  addItemToOrder?: CallableFunction;
  items: Array<MenuItem>;
}

const ItemGrid: React.FC<ItemGridProps> = (props) => {
  const { toggleModal, addItemToOrder, items } = props;
  const [highlightedItemNumber, setHighlightedItemNumber] = useState<number>(0);
  const [enterPress, setEnterPress] = useState<boolean>(false);
  const arrayLength = items.length;
  const gridContain = document.getElementById('grid-contain');

    const highlightedItem = () => {
        return items[highlightedItemNumber];
    }
    
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch(e.key) {
                case 'ArrowRight':
                    if(highlightedItemNumber > 2) {
                        gridContain?.scroll({
                            top: 0,
                            left: 200,
                            behavior: 'smooth'
                        });
                    }
                    if(highlightedItemNumber < arrayLength - 3) {
                        setHighlightedItemNumber(highlightedItemNumber + 3);
                    } else if(arrayLength % 3 !== 0 && highlightedItemNumber < arrayLength) {
                        setHighlightedItemNumber(arrayLength - 1);
                    }
                    break;
                case 'ArrowLeft':
                    if(highlightedItemNumber > 2) {
                        setHighlightedItemNumber(highlightedItemNumber - 3);
                        gridContain?.scroll({
                            top: 0,
                            left: -200,
                            behavior: 'smooth'
                        });
                    } else if(highlightedItemNumber > 0) {
                        // Change focus to CategoryBar
                    }
                    break;
                case 'ArrowUp':
                    if((highlightedItemNumber) % 3 === 0) {
                        // Out of bounds top
                    } else if(highlightedItemNumber > 0) {
                        setHighlightedItemNumber(highlightedItemNumber - 1);
                    }
                    break;
                case 'ArrowDown':
                    if((highlightedItemNumber + 1) % 3 === 0) {
                        // Change focus to BottomOrderDetails
                    } else if(highlightedItemNumber < arrayLength -1) {
                        setHighlightedItemNumber(highlightedItemNumber + 1);
                    }
                    break;
                case 'Enter':
                    setEnterPress(true);
                    break;
            }
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            console.log("unbind")
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [highlightedItemNumber, setHighlightedItemNumber, gridContain, arrayLength]);

  return(
    <div className="grid-container" id='grid-contain'>
      { items.map((item: any, key) => {
        return (
          <div key={key}>
            <ItemCard 
              type='item' 
              scale={250}
              name={item.name} 
              imgSrc={item.imgSrc} 
              price={item.price}
              item={item}
              toggleModal={toggleModal}
              addItemToOrder={addItemToOrder}
              highlightedItem={highlightedItem().name}
              enterPress={enterPress}
              setEnterPress={setEnterPress} 
            />
          </div>
        );
      })}  
    </div>
  )
}

export default ItemGrid