import * as React from 'react';
import  { newItem }  from '../../../App';
import { Burgers } from '../../../Utils/ProductItems'
import OrderDetails from '../../BottomOrderDetails/OrderDetails';

export interface MainPageProps {
    addItemToOrder: (item: newItem) => void;

}
 
const MainPage: React.SFC<MainPageProps> = (props: MainPageProps) => {
    
    return ( 
        <div>
            <button onClick={()=>props.addItemToOrder(Burgers[1])}>Test</button>
            
        </div>
     );
}
 
export default MainPage;