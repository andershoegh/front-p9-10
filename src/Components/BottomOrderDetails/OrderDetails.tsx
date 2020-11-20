import React, { useMemo } from 'react'
import './OrderDetails.scss'
import { MenuItem, Menu, Order } from '../../App';
import { useHistory } from 'react-router-dom';

export interface OrderDetailsProps {
   order: Order
   toggleModal: CallableFunction
   vat: number
   cost: number
   itemsAmount: number
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order, toggleModal, vat, cost, itemsAmount}) => {

    const history = useHistory();

   
    
    const handleFinish = ()=>{
        if(history.location.pathname ==='/orderoverview'){
            history.push('/finishedorder')
        }else{
            history.push('/orderoverview');
        }
        ;
    }
    const emptyClass = useMemo(()=> order.menuItems.length === 0 && 
                                    order.menus.length === 0 && 
                                    history.location.pathname ==='/orderoverview'
                                    ? 'empty-basket' : '',
                                    [ order, history.location ]) ;
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

            <div className="order-details-button-wrapper">
                <button className="cancel-btn" onClick={() => toggleModal(true)} >CANCEL ORDER</button>
                <button className={"finish-btn " + emptyClass} onClick={handleFinish}>FINISH ORDER</button>
            </div>
        </div>
    )
}

export default OrderDetails
