import React from 'react'
import { Burger, Dessert, Drink, Menu, Side } from '../../App'
import FlatItemCard from '../FlatItemCard/FlatItemCard'
import './OrderOverviewPage.scss'
import Stepper from '../Stepper/Stepper'

export interface OrderOverviewPageProps {
    burgers: Burger[]
    sides: Side[]
    desserts: Dessert[]
    menus: Menu[]
    drinks: Drink[]
}

const OrderOverviewPage: React.FC<OrderOverviewPageProps> = ({
    burgers,
    drinks,
    sides,
    menus,
    desserts,
}) => {
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
            {menus &&
                menus.map((menu) => {
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
                            <Stepper
                                increment={increment}
                                decrement={decrement}
                            />
                        </div>
                    )
                })}
            <div className="headline">SINGLE ITEMS</div>
            {burgers && drinks && sides && desserts && (
                <div className="singleItems">
                    {burgers.map((burger) => {
                        return (
                            <FlatItemCard
                                name={burger.name}
                                imgSrc={burger.imgSrc}
                            ></FlatItemCard>
                        )
                    })}
                    {drinks.map((drink) => {
                        return (
                            <FlatItemCard
                                name={drink.name}
                                imgSrc={drink.imgSrc}
                            ></FlatItemCard>
                        )
                    })}
                    {sides.map((side) => {
                        return (
                            <FlatItemCard
                                name={side.name}
                                imgSrc={side.imgSrc}
                            ></FlatItemCard>
                        )
                    })}
                    {desserts.map((dessert) => {
                        return (
                            <FlatItemCard
                                name={dessert.name}
                                imgSrc={dessert.imgSrc}
                            ></FlatItemCard>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default OrderOverviewPage
