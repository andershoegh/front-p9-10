import React, { useState } from 'react';
import  { newItem, menuItem }  from '../../../App';
import * as Products from '../../../Utils/ProductItems'
import OrderDetails from '../../BottomOrderDetails/OrderDetails';
import ItemGrid from '../../ItemGrid/ItemGrid'
import OrderSelectionModal from '../../OrderSelectionModal/OrderSelectionModal'
import CategoryBar from '../../CategoryBar/CategoryBar';


export interface MainPageProps {
    addItemToOrder: (item: newItem) => void;
    setCategory: (category: string) => void;
    category: string;

}
 
const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<menuItem>(Products.Burgers[0]);
    type categories = 'Burgers' | 'Drinks' | 'Sides' | 'Desserts';
    const [selectedCategory, setSelectedCategory] = useState<categories>('Burgers');

    const toggleModal = (toggle: boolean, item: menuItem) => {
        setShowModal(toggle);
        setSelectedItem(item);
    }

    const handleMenu = (isMenu: boolean) => {
      if(!isMenu) {
        props.addItemToOrder(selectedItem as unknown as newItem);
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
                category='Burgers' items={Products[selectedCategory]} />
            <OrderSelectionModal showModal={showModal} toggleModal={toggleModal} handleMenu={handleMenu} />
        </div>
     );
}
 
export default MainPage;