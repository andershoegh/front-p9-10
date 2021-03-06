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
  let cardStyle = ' card';
  const route = './products/' + imgSrc;
  const  { controlled, setControlled } = useContext(ControlledComponentContext);

  const onClickAction = useCallback((e?) => {
    const addToCartAnimation = (e: Event) => {
      const node = e.currentTarget as HTMLDivElement;
      const rect = node.getBoundingClientRect();
      const targetRect = (document.querySelector('.order-details') as HTMLDivElement).getBoundingClientRect();
      const cln = node.cloneNode(true) as HTMLDivElement;
      const app = document.getElementById('root')?.firstChild as HTMLDivElement;
      cln.classList.add('ghost-element');
      cln.style.left = rect.left + 'px';
      cln.style.top = rect.top + 'px';
      app.appendChild(cln);
      setTimeout(()=> {
        cln.style.left = '50%';
        cln.style.top = targetRect.top + (targetRect.height/2) +'px';
        cln.style.opacity = '0';
        cln.style.transform = 'translateX(-50%)';
      }, 10);
    
      setTimeout(()=>{
        app.removeChild(cln);
      }, 500);
     
      }
    switch (type) {
      case 'category':
        if(onClick) {
          onClick();
        }
        break;
      case 'item':
        if(toggleModal && item?.type === 'burger') {
          toggleModal(true, item);
          setControlled(controlled !== 'none' ? 'orderSelectionModal' : 'none');
        } else if(addItemToOrder && item) {
          if(e){
            addToCartAnimation(e)
          }
          addItemToOrder(item);
        
        } else if(setSelectedItem && item) {
          setSelectedItem(item);
        }
        
        break;
      case 'order selection':
        if(orderSelection) {
          if(name === 'Single' && e){
            addToCartAnimation(e);
          }
          orderSelection(name);
        }
    }
  },[ addItemToOrder, item, toggleModal, orderSelection, onClick, type, name, setSelectedItem, controlled, setControlled]);

  useEffect(() => {
      if(enterPress && name === highlightedItem && setEnterPress) {
        setEnterPress(false);
        onClickAction();
      }
  }, [enterPress, highlightedItem, setEnterPress, item, onClickAction, name]);
  
  const divScale = {
      width: (scale / 10.2) + 'vmin',
      height: (scale / 10.2) + 'vmin',
      fontSize: ''
  }

  if(type !== 'item') {
    layout = 'text-container';
    divScale.fontSize = (scale / 90) + 'vmin';
  } else {
    layout = 'text-container-centered';
    if (name.length > 24) {
      divScale.fontSize = (scale / 230) + 'vmin';
    } else {
      divScale.fontSize = (scale / 170) + 'vmin';
    }
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