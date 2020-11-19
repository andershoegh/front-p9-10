import React from 'react'
import { Order } from '../../../App'
import FlatItemCard from '../../FlatItemCard/FlatItemCard'
import './OrderOverviewPage.scss'
import Stepper from '../../Stepper/Stepper'

export interface OrderOverviewPageProps {
    order: Order;
    setOrder: CallableFunction
}

const OrderOverviewPage: React.FC<OrderOverviewPageProps> = ({ order, setOrder }) => {
    const increment = (type: string, index: number) => {
        let newOrder = {...order};
        const newNumber : number = newOrder[type as keyof Order][index].amount as number + 1;
        newOrder[type as keyof Order][index].amount = newNumber;
        setOrder({...newOrder})
    }

    const decrement = (type: string, index: number) => {
        let newOrder = {...order};
        const newNumber : number = newOrder[type as keyof Order][index].amount as number - 1;
        newOrder[type as keyof Order][index].amount = newNumber;
        if(newNumber<1){
            newOrder[type as keyof Order].splice(index, 1);
        }
        setOrder({...newOrder});
    }

    return (
        <div className="order-overview">
            { (order.menus && order.menus.length > 0) && 
                <>
                    <div className="headline">MENUS</div>
                        {order.menus.map((menu, index) => {
                            return (
                                <div className="menuDisplay" key={'burger-'+ index}>
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
                                            increment={()=>increment('menus', index)}
                                            decrement={()=>decrement('menus', index)}
                                            amount={menu.amount as number}
                                        />
                                </div>
                            )
                        })}
                </>
            }
           
            {(order.menuItems && order.menuItems.length > 0) && (
                <>
                    <div className="headline">SINGLE ITEMS</div>
                    <div className="singleItems">
                        {order.menuItems.map((menuItem, index) => {
                            return (
                                <div
                                    key={menuItem.name}
                                    className="singleItemBlock"
                                >
                                    <FlatItemCard
                                        name={menuItem.name}
                                        imgSrc={menuItem.imgSrc}
                                    ></FlatItemCard>
                                    <Stepper
                                        increment={()=>increment('menuItems', index)}
                                        decrement={()=>decrement('menuItems', index)}
                                        amount={menuItem.amount as number}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
            {(!(order.menuItems && order.menuItems.length > 0) && !(order.menus && order.menus.length > 0)) &&
                <div className="cart-empty">
                    <p className="txt">
                        Food basket is empty
                    </p> 
                </div>

            }
        </div>
    )
}

export default OrderOverviewPage
