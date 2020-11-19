import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.scss'
import OrderDetails from './Components/BottomOrderDetails/OrderDetails'
import MainPage from './Components/Pages/MainPage/MainPage'
import WelcomePage from './Components/Pages/WelcomePage/WelcomePage'
import OrderOverviewPage from './Components/Pages/OrderOverviewPage/OrderOverviewPage'
import MenuSelection from './Components/Pages/MenuSelection/MenuSelection'
import CancelModal from './Components/CancelModal/CancelModal'
import advertisement from './Resources/Images/advertisement.svg'
import { DummyOrder } from './Utils/Order'
import BackButton from './Components/BackButton/BackButton'

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

    const setInitialOrder = () =>{
       setOrder({ menuItems: [], menus: [] });
    }
    const addSingleItemToOrder = (item: MenuItem) => {
        let sameIndex = null;
        order.menuItems.forEach((menuItem, index) =>{
            if(item.name === menuItem.name){
                sameIndex= index;
            }
        });
        let newMenuItems: MenuItem[] = [...order.menuItems];
        if(sameIndex !== null){
            newMenuItems[sameIndex].amount = newMenuItems[sameIndex].amount as number +1  ;
        }else{
            item.amount = 1;
        }
        const newOrder = sameIndex !== null ? { ...order, menuItems: newMenuItems } : { ...order, menuItems: [...newMenuItems, item] }
        setOrder(newOrder);
    }

    const addMenuToOrder = (menu: Menu) => {
        let sameIndex = null;
        order.menus.forEach((loopedMenu, index) =>{
            if( loopedMenu.burger.name === menu.burger.name &&
                loopedMenu.drink.name === menu.drink.name &&
                loopedMenu.side.name === menu.side.name ){
                sameIndex= index;
            }
        });
        let newMenus: Menu[] = [...order.menus];
        if(sameIndex !== null){
            newMenus[sameIndex].amount = newMenus[sameIndex].amount as number +1  ;
        }else{
            menu.amount = 1;
        }
        const newOrder = sameIndex !== null ? { ...order, menus: newMenus } : { ...order, menus: [...newMenus, menu] }
        setOrder(newOrder)
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
                <Switch>
                    <Route path="/(menuselection|orderoverview)">
                        <BackButton />
                    </Route>
                    <Route path='/'>
                        <img
                            className="advertisement"
                            src={advertisement}
                            alt="Advertisement of corn dog"
                        />
                    </Route>
                </Switch>
               
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
                        <OrderOverviewPage order={order} setOrder={setOrder}/>
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
