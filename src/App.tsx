import React, { useState } from 'react'
import './App.scss'
import OrderDetails from './Components/BottomOrderDetails/OrderDetails';
import { Burgers, Sides, Desserts, Drinks }  from './Utils/ProductItems'
import { DummyOrder }  from './Utils/Order'

export type itemType = 'burger' | 'dessert' | 'side' | 'drink' | 'menu';

function isMenuItem(arg: any): arg is MenuItem {
    return arg && arg.itemType && arg.itemType !== 'menu';
}
function isMenu(arg: any): arg is Menu {
    return arg && arg.burger && arg.drink;
}

enum orderKeys { 
    burger = 'burgers', 
    dessert = 'desserts',
    side = 'sides',
    drink = 'drinks',
    menu= 'menus'
};


export interface MenuItem {
    name: string;
    imgSrc: string;
    price: number;
    itemType: itemType;
    amount?:number;
}

export interface Menu {
    burger: MenuItem;
    drink: MenuItem;
    side: MenuItem;
    amount: number;
}
export interface Order {
    menus: Array<Menu>;
    burgers: Array<MenuItem>;
    sides: Array<MenuItem>;
    drinks: Array<MenuItem>;
    desserts: Array<MenuItem>;
}

export interface theOrder {
    
}

const App = () => {

    const [order, setOrder] = useState<Order>(DummyOrder);

    const addItem = (item: MenuItem | Menu) => {
        if(isMenuItem(item)){
            // Findes der et ens produkt? Hvis ja, inkrementér amount:
            const newArray: any = order[orderKeys[item.itemType]];
            let newObj = false;
            newArray.forEach((obj: MenuItem)=>{
                if(obj.name === item.name && obj.amount ){
                    //if looped object has same name as item to be added. increment one 
                    obj.amount += 1;
                    newObj= true;
                }
            })
            
            
            const sameItemArray = order[orderKeys[item.itemType]].filter((item: MenuItem, index: number)=>{
                return true
            })
            // Hvis ikke, tilføj et item med amount 1
        } else if   
    }


    // const addItemToOrder =(item: MenuItem | Menu) =>{
    //     if(item.itemType !== 'menu'){
    //         console.log('not menu' , order[orderKeys[item.itemType]], item)
    //         const sameItem = order[].filter
    //         const sameItem = order[orderKeys[item.itemType]].filter((el: MenuItem) => {
    //             if( isMenuItem(item) && el.name === item.name){
    //                     if(el.hasOwnProperty('size') && item.hasOwnProperty('size') && el.size === item.size)){
    //                         return true;
    //                     }else{
    //                         return false;
    //                     }
    //                 }else{
    //                     return false;
    //                 }  
    //         });
    //         console.log(sameItem);
    //     }else{
    //         console.log('menu!');
    //     }
    // }
    return (
        <div className="App">
            <h1>Testing</h1>
            <button onClick={()=>addItemToOrder(Burgers[1])}>not Menu</button>
            <button onClick={()=>addItemToOrder({
                burger: Burgers[0], 
                drink: Drinks[0], 
                side: Sides[0],
                amount: 1,
                size: 'small',
                itemType: 'menu'
                })}>Menu!!</button>
            <OrderDetails />
        </div>
    )
}

export default App
