import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import OrderDetails from './Components/BottomOrderDetails/OrderDetails'
import MainPage from './Components/Pages/MainPage/MainPage'
import WelcomePage from './Components/Pages/WelcomePage/WelcomePage'
import advertisement from './Resources/Images/advertisement.svg'
import { DummyOrder } from './Utils/Order'

type Drink = {
    name: string
    imgSrc: string
    price: number
    type: 'drink'
}
type Burger = {
    name: string
    imgSrc: string
    price: number
    type: 'burger'
}
type Side = {
    name: string
    imgSrc: string
    price: number
    type: 'side'
}
type Dessert = {
    name: string
    imgSrc: string
    price: number
    type: 'dessert'
}
type Menu = {
    side: Side
    burger: Burger
    drink: Drink
    type: 'menu'
}

export type newItem = {
    type: 'burger' | 'drink' | 'menu' | 'side' | 'dessert'
}

const App = () => {
    const [drinks, setDrinks] = useState<Drink[]>([...DummyOrder.drinks])
    const [burgers, setBurgers] = useState<Burger[]>([...DummyOrder.burgers])
    const [sides, setSides] = useState<Side[]>([...DummyOrder.sides])
    const [desserts, setDesserts] = useState<Dessert[]>([
        ...DummyOrder.desserts,
    ])
    const [menus, setMenus] = useState<Menu[]>([...DummyOrder.menus])

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
            case 'dessert':
                setDesserts([...desserts, item as Dessert])
                break
            case 'menu':
                setMenus([...menus, item as Menu])
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
                />
                <Switch>
                    <Route path="/mainpage">
                        <>
                            <MainPage addItemToOrder={addItemToOrder} />
                        </>
                    </Route>
                    <Route path="/menuselection">
                        <></>
                    </Route>
                    <Route path="/orderoverview">
                        <></>
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
