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
                                amount={menu.amount}
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
                            <div key={burger.name} className="singleItemBlock">
                                <FlatItemCard
                                    name={burger.name}
                                    imgSrc={burger.imgSrc}
                                ></FlatItemCard>
                                <Stepper
                                    increment={increment}
                                    decrement={decrement}
                                    amount={burger.amount}
                                />
                            </div>
                        )
                    })}
                    {drinks.map((drink) => {
                        return (
                            <div className="singleItemBlock">
                                <FlatItemCard
                                    name={drink.name}
                                    imgSrc={drink.imgSrc}
                                ></FlatItemCard>
                                <Stepper
                                    increment={increment}
                                    decrement={decrement}
                                    amount={drink.amount}
                                />
                            </div>
                        )
                    })}
                    {sides.map((side) => {
                        return (
                            <div className="singleItemBlock">
                                <FlatItemCard
                                    name={side.name}
                                    imgSrc={side.imgSrc}
                                ></FlatItemCard>
                                <Stepper
                                    increment={increment}
                                    decrement={decrement}
                                    amount={side.amount}
                                />
                            </div>
                        )
                    })}
                    {desserts.map((dessert) => {
                        return (
                            <div className="singleItemBlock">
                                <FlatItemCard
                                    name={dessert.name}
                                    imgSrc={dessert.imgSrc}
                                ></FlatItemCard>
                                <Stepper
                                    increment={increment}
                                    decrement={decrement}
                                    amount={dessert.amount}
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
