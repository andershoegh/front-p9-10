import React, { useMemo } from 'react'
import './OrderDetails.scss'
import { MenuItem, Menu, Order } from '../../App';
import { useHistory } from 'react-router-dom';

export interface OrderDetailsProps {
   order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {

    const history = useHistory();

    const getItemsPrice = (items: MenuItem[]) =>
        items.reduce((total: number, item: MenuItem) => {
            const amount: number = item.amount ? item.amount as number : 1;
            return total + (item.price * amount);
        }, 0);
    
    const getMenusPrice = (menus: Menu[]) =>  menus.reduce((total: number, menu: Menu) => {
            const amount: number = menu.amount ? menu.amount as number : 1;
            return total + (menu.burger.price + menu.drink.price + menu.side.price) * amount;
        },  0);
   
    const menuItemsCost: number = useMemo(()=> {
        return getItemsPrice(order.menuItems);
    }, [order]);
    
    const menusCost =  useMemo(()=> getMenusPrice(order.menus), [order]);

    const vat = useMemo(() => {
        const price: number = menuItemsCost + menusCost
        return price - price / 1.25
    }, [menuItemsCost, menusCost])

    const getItemsAmount = useMemo(() =>  {
        const reduceMenuAndItemsAmount = (total: number, item: MenuItem|Menu) =>{
            return total + (item.amount? item.amount : 1);
        };
       return order.menus.reduce(reduceMenuAndItemsAmount, 0) + order.menuItems.reduce(reduceMenuAndItemsAmount, 0)
    }, [order]);
    
    const handleCancel = ()=>{
        history.push('/');
    }
    const handleFinish = ()=>{
        history.push('/orderoverview');
    }

    return (
        <div className="order-details-wrapper">
            <div className="order-details-header">YOUR ORDER - TAKE AWAY</div>
            <div className="order-details">
                <div>
                    <p>{'VAT ' + vat + 'DKK'}</p>
                </div>
                <div>
                    <p>{'Price ' + (menuItemsCost + menusCost) + 'DKK'} </p>
                </div>
                <div>
                    <p> {'Items ' + getItemsAmount}</p>
                </div>
            </div>

            <div className="order-details-button-wrapper">
                <button className="cancel-btn" onClick={handleCancel}>CANCEL ORDER</button>
                <button className="finish-btn" onClick={handleFinish}>FINISH ORDER</button>
            </div>
        </div>
    )
}

export default OrderDetails
