import React, { useState, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
import FinishedOrderPage from './Components/Pages/FinishedOrderPage/FinishedOrderPage'

export type MenuItem = {
    type: 'burger' | 'drink' | 'side' | 'dessert' | 'menu'
    name: string
    imgSrc: string
    price: number
    amount?: number
    note?: string
}

export type Menu = {
    type: 'menu'
    burger: MenuItem
    drink: MenuItem
    side: MenuItem
    amount?: number
    note?: string
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
    const getItemsPrice = (items: MenuItem[]) =>
    items.reduce((total: number, item: MenuItem) => {
        const amount: number = item.amount ? item.amount as number : 1;
        return total + (item.price * amount);
    }, 0);

    const getMenusPrice = (menus: Menu[]) =>  menus.reduce((total: number, menu: Menu) => {
            const amount: number = menu.amount ? menu.amount as number : 1;
            return total + (menu.burger.price + menu.drink.price + menu.side.price) * amount;
        },  0);

    const menuItemsCost: number = useMemo(()=> {
        return getItemsPrice(order.menuItems);
    }, [order]);

    const menusCost =  useMemo(()=> getMenusPrice(order.menus), [order]);

    const vat = useMemo(() => {
        const price: number = menuItemsCost + menusCost
        return price - price / 1.25
    }, [menuItemsCost, menusCost])

    const getItemsAmount = useMemo(() =>  {
        const reduceMenuAndItemsAmount = (total: number, item: MenuItem|Menu) =>{
            return total + (item.amount? item.amount : 1);
        };
    return order.menus.reduce(reduceMenuAndItemsAmount, 0) + order.menuItems.reduce(reduceMenuAndItemsAmount, 0)
    }, [order]);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/(menuselection|orderoverview)">
                        <BackButton />
                    </Route>
                    <Route path="/finishedorder">
                        <></>
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
                        <OrderOverviewPage order={order} setOrder={setOrder} />
                    </Route>
                    <Route path="/finishedorder">
                        <FinishedOrderPage order={order}
                            vat={vat}
                            cost={ menuItemsCost + menusCost }
                            itemsAmount={getItemsAmount}/>
                    </Route>
                    <Route path="/">
                        <WelcomePage />
                    </Route>
                </Switch>
                <Route path="/(mainpage|menuselection|orderoverview)">
                    <OrderDetails
                        order={order}
                        toggleModal={cancelModal}
                        vat={vat}
                        cost={ menuItemsCost + menusCost }
                        itemsAmount={getItemsAmount}
                    />

                </Route>
                <CancelModal showModal={showCancelModal} toggleModal={cancelModal} clearOrder={clearOrder} />

            </div>
        </Router>
    )
}

export default App
