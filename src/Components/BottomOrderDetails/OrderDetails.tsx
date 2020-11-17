import React, { useMemo } from 'react'
import './OrderDetails.scss'

type MenuItem = {
    name: string
    imgSrc: string
    price: number
    type: string
}
type Menu = {
    burger: MenuItem
    drink: MenuItem
    side: MenuItem
    type: 'menu'
}

export interface OrderDetailsProps {
    drinks: MenuItem[]
    burgers: MenuItem[]
    sides: MenuItem[]
    menus: Menu[]
    desserts: MenuItem[]
}

const OrderDetails: React.FC<OrderDetailsProps> = (
    props: OrderDetailsProps
) => {
    const { drinks, burgers, sides, menus, desserts } = props

    const getItemsPrice = (items: MenuItem[]) =>
        items.reduce((total: number, item: MenuItem) => total + item.price, 0)
    const getMenusPrice = (menus: Menu[]) => {
       return  menus.reduce((total: number, menu: Menu) => total + menu.burger.price + menu.drink.price + menu.side.price, 0);
    } 
   
    const menuItemsCost: number = useMemo(()=> {
        return getItemsPrice(drinks) + getItemsPrice(burgers) + getItemsPrice(sides) + getItemsPrice(desserts);
    }, [drinks, burgers, sides, desserts]);
    
    const menusCost =  useMemo(()=> getMenusPrice(menus), [menus]);

    const menuItemsCost: number = useMemo(() => {
        return (
            getItemsPrice(drinks) +
            getItemsPrice(burgers) +
            getItemsPrice(sides) +
            getItemsPrice(desserts)
        )
    }, [drinks, burgers, sides])

    const menusCost = useMemo(() => getMenusPrice(menus), [menus])

    const vat = useMemo(() => {
        const price: number = menuItemsCost + menusCost
        return price - price / 1.25
    }, [menusCost, menuItemsCost])

    const getItemsAmount = useMemo(() => {
        const propKeys: string[] = Object.keys(props)
        return propKeys.reduce(
            (total: number, key: string) =>
                total + props[key as keyof OrderDetailsProps].length,
            0
        )
    }, [props])

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
