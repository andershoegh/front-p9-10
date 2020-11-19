import * as React from 'react';
import './FinishedOrderPage.scss';
import '../OrderOverviewPage/OrderOverviewPage'
import { Order } from '../../../App';

export interface FinishedOrderPageProps {
    order: Order
}
 
const FinishedOrderPage: React.SFC<FinishedOrderPageProps> = ({ order }) => {
    console.log(order)
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
                </div>
                <div className="receipt-address">
                    Selma LagerLöfs vej 300, 9220, Aalborg
                </div>
                <div className="receipt-phone">
                   Tel.: 98 12 76 34
                </div>
                <div className="receipt-header">
                   Cash Receipt
                   <br/>
                   receipt No. #{Math.round((Math.random() + Number.EPSILON) * 100)}       
                </div>
                <div className="bought-items">
        list of bought items
                </div>
            </div>
        </div>
     );
}
 
export default FinishedOrderPage;