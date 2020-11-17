import React from 'react'
import { Order } from '../../App'
import FlatItemCard from '../FlatItemCard/FlatItemCard'
import './OrderOverviewPage.scss'
import Stepper from '../Stepper/Stepper'

export interface OrderOverviewPageProps {
    order: Order
}

const OrderOverviewPage: React.FC<OrderOverviewPageProps> = ({ order }) => {
    const increment = () => {
        // Increment item in state with setState
        console.log('Increment')
    }

    const decrement = () => {
        // Decrement item in state with setState
        console.log('Decrement')
    }

    return (
        <div>
            <div className="headline">MENU</div>
            {order.Menus &&
                order.Menus.map((menu) => {
                    return (
                        <div className="menuDisplay">
                            <div className="menuCard">
                                <div className="menuCardItems">
                                    <FlatItemCard
                                        name={menu.burger.name}
                                        imgSrc={menu.burger.imgSrc}
                                    ></FlatItemCard>
                                    <FlatItemCard
                                        name={menu.drink.name}
                                        imgSrc={menu.drink.imgSrc}
                                    ></FlatItemCard>
                                    <FlatItemCard
                                        name={menu.side.name}
                                        imgSrc={menu.side.imgSrc}
                                    ></FlatItemCard>
                                </div>
                            </div>
                        </div>
                    )
                })}
            <div className="headline">SINGLE ITEMS</div>
            {order.MenuItems && (
                <div className="singleItems">
                    {order.MenuItems.map((menuItem) => {
                        return (
                            <div
                                key={menuItem.name}
                                className="singleItemBlock"
                            >
                                <FlatItemCard
                                    name={menuItem.name}
                                    imgSrc={menuItem.imgSrc}
                                ></FlatItemCard>
                                <Stepper
                                    increment={increment}
                                    decrement={decrement}
                                />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default OrderOverviewPage
