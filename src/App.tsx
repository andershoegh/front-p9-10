import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import OrderOverviewPage from './Components/Pages/OrderOverviewPage'
import WelcomePage from './Components/Pages/WelcomePage'
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
export type Menu = {
    side: Side
    burger: Burger
    drink: Drink
    type: 'menu'
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

const App = () => {
    const [drinks, setDrinks] = useState<Drink[]>([...DummyOrder.drinks])
    const [burgers, setBurgers] = useState<Burger[]>([...DummyOrder.burgers])
    const [sides, setSides] = useState<Side[]>([...DummyOrder.sides])
    const [menus, setMenus] = useState<Menu[]>([...DummyOrder.menus])
    const [desserts, setDesserts] = useState<Dessert[]>([
        ...DummyOrder.desserts,
    ])

    const addItemToOrder = (item: newItem) => {
        switch (item.type) {
            case 'drink':
                setDrinks([...drinks, item as Drink])
                break
            case 'burger':
                setBurgers([...burgers, item as Burger])
                break
            case 'side':
                setSides([...sides, item as Side])
                break
            case 'menu':
                setMenus([...menus, item as Menu])
                break
            case 'dessert':
                setDesserts([...desserts, item as Dessert])
                break
            default:
                console.log('Error adding item!')
        }
    }

    return (
        <Router>
            <div className="App">
                <img
                    className="advertisement"
                    src={advertisement}
                    alt="Advertisement of corn dog"
                />{' '}
            </div>
            <Switch>
                <Route path="/mainpage">
                    <></>
                </Route>
                <Route path="/menuselection">
                    <></>
                </Route>
                <Route path="/orderoverview">
                    <OrderOverviewPage
                        desserts={desserts}
                        menus={menus}
                        drinks={drinks}
                        burgers={burgers}
                        sides={sides}
                    />
                </Route>
                <Route path="/" component={WelcomePage} />
            </Switch>
        </Router>
    )
}

export default App
