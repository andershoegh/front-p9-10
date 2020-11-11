import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import WelcomePage from './Components/Pages/WelcomePage'
import advertisement from './Resources/Images/advertisement.svg'

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
type Menu = {
    side: Side
    burger: Burger
    drink: Drink
    type: 'menu'
}

type newItem = {
    type: 'burger' | 'drink' | 'menu' | 'side'
}

const App = () => {
    const [drinks, setDrinks] = useState<Drink[]>([])
    const [burgers, setBurgers] = useState<Burger[]>([])
    const [sides, setSides] = useState<Side[]>([])
    const [menus, setMenus] = useState<Menu[]>([])

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
                    <></>
                </Route>
                <Route path="/">
                    <WelcomePage />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
