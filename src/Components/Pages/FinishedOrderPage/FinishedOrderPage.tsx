import * as React from 'react';
import './FinishedOrderPage.scss';
import '../OrderOverviewPage/OrderOverviewPage';
import { Order } from '../../../App';
import FLAIcon from '../../../Resources/Icons/FLAIcon';

export interface FinishedOrderPageProps {
    order: Order
    vat: number
    cost: number
    itemsAmount: number
}
 
const FinishedOrderPage: React.SFC<FinishedOrderPageProps> = ({ order, cost }) => {
    return ( 
        <div className="finish-page">
            <div className="header">
                Thank you for your order
            </div>
            <div className="sub-header">
                It's currently being prepared
            </div>
            <div className="receipt">
                <div className="receipt-restaurant">
                    FLA Restaurant
                    <div className="restaurant-icon">
                        <div>{FLAIcon()}</div>
                    </div>
                </div>
                <div className="restaurant-details">
                    Selma LagerLöfs vej 300, 9220, Aalborg
                    <br/>
                    Tel.: 98 12 76 34
                </div>
                <div className="receipt-header">
                   Cash Receipt No. #{Math.round((Math.random() + Number.EPSILON) * 100)}       
                </div>
                <div className="bought-items">
                    <div   className="table">
                        <div className="table-header">
                            <div className="desc">DESC</div>
                            <div className="amount">QTY</div>
                            <div className="price">DKK</div>
                        </div>
                        <div className="table-body">
                            {order.menus &&
                                order.menus.map(menu=>{  
                                    return ( 
                                        <div className="table-row" key={menu.burger.name}>
                                            <div className="table-cell item">
                                                <div className="menu-name">
                                                    {menu.burger.name + ' Menu'}
                                                </div>
                                                <div className="menu-items">
                                                    { menu.side.name }
                                                    <br/>
                                                    { menu.drink.name }
                                                </div>
                                            </div>
                                            <div className="table-cell amount">
                                                {menu.amount}
                                            </div>
                                            <div className="table-cell price">
                                               {(menu.amount as number*(menu.burger.price + menu.drink.price + menu.side.price))}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {order.menuItems &&
                                order.menuItems.map(item=>{  
                                    return ( 
                                        <div className="table-row" key={item.name}>
                                            <div className="table-cell item">
                                                <div className="menu-name">
                                                    { item.name }
                                                </div>
                                            </div>
                                            <div className="table-cell amount">
                                                {item.amount}
                                            </div>
                                            <div className="table-cell price">
                                               {(item.amount as number*(item.price))}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="sum-up">
                    <div className="total">Total</div>
                    <div className="total-price"> {cost} DKK</div>
                </div>
                <div className="thanks">
                    Thank you for choosing FLA Restaurant!
                </div>
            </div>
        </div>
     );
}
 
export default FinishedOrderPage;