import * as React from 'react';
import  { newItem }  from '../../../App';
import { Burgers } from '../../../Utils/ProductItems'
import CategoryBar from '../../CategoryBar/CategoryBar';

export interface MainPageProps {
    addItemToOrder: (item: newItem) => void;
    setCategory: (category: string) => void;
    category: string;

}
 
const MainPage: React.SFC<MainPageProps> = (props: MainPageProps) => {
    
    return ( 
        <div>
            <div className="category-wrapper">
                <CategoryBar setCategory={props.setCategory} category={props.category}/>
            </div>
            <button onClick={()=>props.addItemToOrder(Burgers[1])}>Test</button>
            
        </div>
     );
}
 
export default MainPage;