import React, {  useContext, useEffect, useMemo, useRef, useState } from 'react'
import './OrderDetails.scss'
import { Order } from '../../App';
import { useHistory } from 'react-router-dom';
import { ControlledComponentContext } from '../../Contexts/ControlledComponentContext';

export interface OrderDetailsProps {
   order: Order
   toggleModal: CallableFunction
   vat: number
   cost: number
   itemsAmount: number
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order, toggleModal, vat, cost, itemsAmount}) => {

    const history = useHistory();
    const { controlled, setControlled } = useContext(ControlledComponentContext);
    const [highlightedNumber, setHighlightedNumber] = useState(0);
    const orderButtons = useRef<HTMLDivElement>(null)

    const highlightedItem = useMemo(()=> {
        if(orderButtons.current){
            return orderButtons.current.children[highlightedNumber];
        }
    }, [ highlightedNumber, orderButtons ] );
    
    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent)=>{
            if(orderButtons.current){
                const buttons =  orderButtons.current.children;
                const num = highlightedNumber;
        
                switch(e.key){
                    case 'ArrowUp':
                        setControlled( num > 0 ? 'itemGrid': 'category');
                        break;
                    case 'ArrowRight':
                        if(num<buttons.length-1 && !buttons[1].classList.contains('empty-basket')){
                            setHighlightedNumber(num+1);
                        }
                        break;
                    case 'ArrowLeft': 
                        if(num > 0){
                            setHighlightedNumber(num-1);
                        }
                        break;
                    case 'Enter':
                        const clickable =  buttons[num] as HTMLDivElement;
                        setControlled(num > 0 ? 'orderOverview' : 'cancelModal');
                        clickable.click();
                }
            }
        }
        if(controlled === 'orderDetails'){
            window.addEventListener('keydown', handleKeyDown);
        }
        return ()=>
            window.removeEventListener('keydown', handleKeyDown);

    }, [orderButtons, controlled, highlightedNumber, highlightedItem, setHighlightedNumber, setControlled]);

    useEffect(()=>{
        if(controlled === 'category'){
            setHighlightedNumber(0);
        }else if(controlled === 'itemGrid' && orderButtons.current){
            const finishBtn = orderButtons.current.children[1];
            if(finishBtn.classList.contains('empty-basket')){
                setHighlightedNumber(0);
            }else{
                setHighlightedNumber(1);
            }
        }

        if(orderButtons.current){
            const num = highlightedNumber;
            const buttons = orderButtons.current.children;
            for(let i = 0; i < buttons.length; i++){
                if(controlled === 'orderDetails' && i === num){
                    buttons[i].classList.add('highlighted');
                }else{
                    buttons[i].classList.remove('highlighted');  
                }
            }
        }
    },[controlled, setHighlightedNumber, orderButtons, highlightedNumber]);


    const handleFinish = ()=>{
        if(history.location.pathname ==='/orderoverview'){
            history.push('/finishedorder')
        }else{
            history.push('/orderoverview');
        };
    }
    const emptyClass = useMemo(()=>{ 
        return order.menuItems.length === 0 
            && order.menus.length === 0 
            ? 'empty-basket' : ''}
        , [ order ]) ;

    return (
        <div className="order-details-wrapper">
            <div className="order-details-header">YOUR ORDER - TAKE AWAY</div>
            <div className="order-details">
                <div>
                    <p>{'VAT ' + vat + 'DKK'}</p>
                </div>
                <div>
                    <p>{'Price ' + (cost) + 'DKK'} </p>
                </div>
                <div>
                    <p> {'Items ' + itemsAmount}</p>
                </div>
            </div>

            <div className="order-details-button-wrapper" ref={orderButtons}>
                <button className="cancel-btn" onClick={() => toggleModal(true)} >CANCEL ORDER</button>
                <button className={"finish-btn " + emptyClass} onClick={handleFinish}>FINISH ORDER</button>
            </div>
        </div>
    )
}

export default OrderDetails
