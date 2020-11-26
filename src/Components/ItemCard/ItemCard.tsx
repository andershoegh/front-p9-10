import React, { useCallback, useContext, useEffect } from 'react'
import './ItemCard.scss'
import { MenuItem } from '../../App'
import { ControlledComponentContext } from '../../Contexts/ControlledComponentContext';

export interface ItemCardProps {
  type: string;
  scale: number;
  name: string;
  imgSrc: string;
  price?: number;
  item?: MenuItem;
  toggleModal?: CallableFunction;
  addItemToOrder?: CallableFunction;
  orderSelection?: CallableFunction;
  setSelectedItem?: CallableFunction;
  selectedItem?: string;
  highlightedItem?: string;
  onClick?: () => void;
  enterPress?: boolean;
  setEnterPress?: CallableFunction;
  parentComponent?: string;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { 
    type, 
    scale, 
    name, 
    imgSrc, 
    price, 
    item, 
    toggleModal, 
    addItemToOrder, 
    orderSelection, 
    setSelectedItem, 
    selectedItem, 
    highlightedItem, 
    onClick, 
    enterPress, 
    setEnterPress,
    parentComponent
  } = props;
  let layout = type !== 'item' ? 'text-container' : 'text-container-centered';
  let fontSize;
  let cardStyle = ' card';
  const route = './products/' + imgSrc;
  const  { controlled, setControlled } = useContext(ControlledComponentContext);

  const onClickAction = useCallback(() => {
    switch (type) {
      case 'category':
        if(onClick) {
          onClick();
        }
        break;
      case 'item':
        if(toggleModal && item?.type === 'burger') {
          toggleModal(true, item);
          setControlled('orderSelectionModal');
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
  },[ addItemToOrder, item, toggleModal, orderSelection, onClick, type, name, setSelectedItem]);

  useEffect(() => {
      if(enterPress && name === highlightedItem && setEnterPress) {
        setEnterPress(false);
        onClickAction();
      }
  }, [enterPress, highlightedItem, setEnterPress, item, onClickAction, name]);

  if(type !== 'item') {
    layout = 'text-container';
    fontSize = 0.8 * (scale / 120) + 'em';
  } else {
    layout = 'text-container-centered';
    if (name.length > 20) {
      fontSize = 0.8 * (scale / 280) + 'em';
    } else {
      fontSize = 0.8 * (scale / 200) + 'em';
    }
  }

  const divScale = {
    width: scale,
    height: scale,
    fontSize: fontSize
  }

  if((selectedItem || highlightedItem) && name) {
    if(name === highlightedItem && controlled === parentComponent) {
      cardStyle += ' highlighted'
    } else if( name === selectedItem) {
      cardStyle += ' selected'; 
    } else {
      cardStyle = ' card';
    }
  }
 

  return (
    <div 
      className={cardStyle}
      style={divScale}
      onClick={onClickAction}>
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