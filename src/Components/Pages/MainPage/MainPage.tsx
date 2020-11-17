import React, { useState } from 'react';
import  {  MenuItem }  from '../../../App';
import * as Products from '../../../Utils/ProductItems'
import OrderDetails from '../../BottomOrderDetails/OrderDetails';
import ItemGrid from '../../ItemGrid/ItemGrid'
import OrderSelectionModal from '../../OrderSelectionModal/OrderSelectionModal'
import CategoryBar from '../../CategoryBar/CategoryBar';


export interface MainPageProps {
    addItemToOrder: (item: MenuItem) => void;
    setCategory: (category: string) => void;
    category: string;

}
interface ProductsKeys {
    Burgers: MenuItem[]
    Desserts: MenuItem[]
    Sides: MenuItem[]
    Drinks: MenuItem[]
}
const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem>(Products.Burgers[0]);
    type categories = 'Burgers' | 'Drinks' | 'Sides' | 'Desserts';
    const [selectedCategory, setSelectedCategory] = useState<categories>('Burgers');

    const toggleModal = (toggle: boolean, item: MenuItem) => {
        setShowModal(toggle);
        setSelectedItem(item);
    }

    const handleMenu = (isMenu: boolean) => {
      if(!isMenu) {
        props.addItemToOrder(selectedItem as unknown as MenuItem);
      }
    }
    
    return ( 
        <div>
            <div className="category-wrapper">
                <CategoryBar setCategory={props.setCategory} category={props.category}/>
            </div>
            <ItemGrid 
                toggleModal={toggleModal} 
                addItemToOrder={props.addItemToOrder}
                category={props.category} 
                items={Products[props.category as keyof ProductsKeys]} />
            <OrderSelectionModal showModal={showModal} toggleModal={toggleModal} handleMenu={handleMenu} />
        </div>
     );
}
 
export default MainPage;