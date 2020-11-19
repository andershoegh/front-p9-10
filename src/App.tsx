import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.scss'
import OrderDetails from './Components/BottomOrderDetails/OrderDetails'
import MainPage from './Components/Pages/MainPage/MainPage'
import WelcomePage from './Components/Pages/WelcomePage/WelcomePage'
import OrderOverviewPage from './Components/Pages/OrderOverviewPage'
import MenuSelection from './Components/Pages/MenuSelection/MenuSelection'
import CancelModal from './Components/CancelModal/CancelModal'
import advertisement from './Resources/Images/advertisement.svg'
import { DummyOrder } from './Utils/Order'

export type MenuItem = {
    type: 'burger' | 'drink' | 'side' | 'dessert' | 'menu'
    name: string
    imgSrc: string
    price: number
    amount?: number
}

export type Menu = {
    type: 'menu'
    burger: MenuItem
    drink: MenuItem
    side: MenuItem
    amount?: number
}

export type Order = {
    menuItems: MenuItem[]
    menus: Menu[]
}

const App = () => {
    const [order, setOrder] = useState<Order>({ menuItems: [], menus: [] });
    const [category, setCategory] = useState<string>('Burgers');
    const [selectedBurger, setSelectedBurger] = useState<MenuItem>(DummyOrder.burgers[0])
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false)

    console.log(order)

    const addSingleItemToOrder = (item: MenuItem) => {
        setOrder({ ...order, menuItems: [...order.menuItems, item] })
    }

    const addMenuToOrder = (menu: Menu) => {
        setOrder({ ...order, menus: [...order.menus, menu] })
    }

    const cancelModal = (toggle: boolean) => {
      setShowCancelModal(toggle);
    }

    const clearOrder = () => {
      setOrder({ menuItems: [], menus: [] });
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
                            <MainPage addItemToOrder={addSingleItemToOrder}  setCategory={setCategory} category={category} setSelectedBurger={setSelectedBurger} />
                        </>
                    </Route>
                    <Route path="/menuselection">
                        <MenuSelection selectedItem={selectedBurger} addItemToOrder={addMenuToOrder} />
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
                        order={order}
                        toggleModal={cancelModal}
                    />

                </Route>
                <CancelModal showModal={showCancelModal} toggleModal={cancelModal} clearOrder={clearOrder} />

            </div>
        </Router>
    )
}

export default App
