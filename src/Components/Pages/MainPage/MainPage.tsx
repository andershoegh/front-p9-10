import * as React from 'react';
import  { newItem }  from '../../../App';
import { Burgers } from '../../../Utils/ProductItems'
import Carousel from '../../Carousel/Carousel';

export interface MainPageProps {
    addItemToOrder: (item: newItem) => void;

}
 
const MainPage: React.SFC<MainPageProps> = (props: MainPageProps) => {
    
    return ( 
        <div>
            <div className="carousel-wrapper">
                <Carousel />
            </div>
            <button onClick={()=>props.addItemToOrder(Burgers[1])}>Test</button>
            
        </div>
     );
}
 
export default MainPage;