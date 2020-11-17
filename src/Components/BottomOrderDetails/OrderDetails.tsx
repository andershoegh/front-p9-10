import React, { useMemo } from 'react'
import './OrderDetails.scss'
import { MenuItem, Menu, Order } from '../../App';
// export type MenuItem = {
//     type: 'burger' | 'drink' | 'side' | 'dessert' | 'menu'
//     name: string
//     imgSrc: string
//     price: number
// }

// export type Menu = {
//     type: 'menu'
//     burger: MenuItem
//     drink: MenuItem
//     side: MenuItem
// }

// export type Order = {
//     MenuItems: MenuItem[]
//     Menus: Menu[]
// }



export interface OrderDetailsProps {
   order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = (
    props: OrderDetailsProps
) => {
    const { menus, menuItems } = props.order;

    const getItemsPrice = (items: MenuItem[]) =>
        items.reduce((total: number, item: MenuItem) => total + item.price, 0)
    const getMenusPrice = (menus: Menu[]) => {
       return  menus.reduce((total: number, menu: Menu) => total + menu.burger.price + menu.drink.price + menu.side.price, 0);
    } 
    const reduceMenuAndItemsAmount = (total: number, item: MenuItem|Menu) =>{
        return total + (item.amount? item.amount : 1);
    };
   
    const menuItemsCost: number = useMemo(()=> {
        return getItemsPrice(menuItems);
    }, [menuItems]);
    
    const menusCost =  useMemo(()=> getMenusPrice(menus), [menus]);

    const vat = useMemo(() => {
        const price: number = menuItemsCost + menusCost
        return price - price / 1.25
    }, [menusCost, menuItemsCost])

    const getItemsAmount = useMemo(() => {
        const propKeys: string[] = Object.keys(props.order);

        
        
        return menus.reduce(reduceMenuAndItemsAmount, 0) + menuItems.reduce(reduceMenuAndItemsAmount, 0);
    }, [menus, menuItems]);

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
                <button className="cancel-btn">CANCEL ORDER</button>
                <button className="finish-btn">FINISH ORDER</button>
            </div>
        </div>
    )
}

export default OrderDetails
