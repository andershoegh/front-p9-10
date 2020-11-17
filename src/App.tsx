import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import OrderDetails from './Components/BottomOrderDetails/OrderDetails'
import MainPage from './Components/Pages/MainPage/MainPage'
import WelcomePage from './Components/Pages/WelcomePage/WelcomePage'
import OrderOverviewPage from './Components/Pages/OrderOverviewPage'
import advertisement from './Resources/Images/advertisement.svg'
import { DummyOrder } from './Utils/Order'

export type Drink = {
    name: string
    imgSrc: string
    price: number
    type: 'drink'
    amount: number
}
export type Burger = {
    name: string
    imgSrc: string
    price: number
    type: 'burger'
    amount: number
}
export type Side = {
    name: string
    imgSrc: string
    price: number
    type: 'side'
    amount: number
}

export type Dessert = {
    name: string
    imgSrc: string
    price: number
    type: 'dessert'
    amount: number
}

export type newItem = {
    type: 'burger' | 'drink' | 'menu' | 'side' | 'dessert'
}

export type MenuItem = {
    type: 'burger' | 'drink' | 'side' | 'dessert' | 'menu'
    name: string
    imgSrc: string
    price: number
}

export type Menu = {
    type: 'menu'
    burger: MenuItem
    drink: MenuItem
    side: MenuItem
}

export type Order = {
    MenuItems: MenuItem[]
    Menus: Menu[]
}
export type Products = 'Burgers' | 'Drinks' | 'Menus' | 'Sides' | 'Desserts';

const App = () => {
    const [order, setOrder] = useState<Order>({ MenuItems: [], Menus: [] })

    console.log(order)

    const addSingleItemToOrder = (item: MenuItem) => {
        setOrder({ ...order, MenuItems: [...order.MenuItems, item] })
    }

    const addMenuToOrder = (menu: Menu) => {
        setOrder({ ...order, Menus: [...order.Menus, menu] })
    }

    return (
        <Router>
            <div className="App">
                <img
                    className="advertisement"
                    src={advertisement}
                    alt="Advertisement of corn dog"
                />
                <Switch>
                    <Route path="/mainpage">
                        <>
                            <MainPage addItemToOrder={addItemToOrder}  setCategory={setCategory} category={category}/>
                        </>
                    </Route>
                    <Route path="/menuselection">
                        <></>
                    </Route>
                    <Route path="/orderoverview">
                        <OrderOverviewPage order={order} />
                    </Route>
                    <Route path="/">
                        <WelcomePage />
                    </Route>
                </Switch>
                <Route path="/(mainpage|menuselection|orderoverview)">
                    <OrderDetails
                        drinks={drinks}
                        burgers={burgers}
                        sides={sides}
                        menus={menus}
                        desserts={desserts}
                    />
                </Route>
            </div>
        </Router>
       
    )
}

export default App
