import React, { useState } from 'react';
import  {  MenuItem }  from '../../../App';
import * as Products from '../../../Utils/ProductItems'
import ItemGrid from '../../ItemGrid/ItemGrid'
import OrderSelectionModal from '../../OrderSelectionModal/OrderSelectionModal'
import CategoryBar from '../../CategoryBar/CategoryBar';


export interface MainPageProps {
    addItemToOrder: CallableFunction;
    setCategory: CallableFunction;
    category: string;
    setSelectedBurger: CallableFunction;
}
interface ProductKeys {
    Burgers: MenuItem[]
    Desserts: MenuItem[]
    Sides: MenuItem[]
    Drinks: MenuItem[]
}
const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
    const { addItemToOrder, setCategory, category, setSelectedBurger } = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem>(Products.Burgers[0]);

    const toggleModal = (toggle: boolean, item?: MenuItem) => {
        setShowModal(toggle);
        if(item) {
          setSelectedItem(item);
        }
    }

    const handleMenu = (isMenu: boolean) => {
      if(!isMenu) {
        console.log('add item')
        addItemToOrder(selectedItem);
      } else {
        console.log('set selected')
        setSelectedBurger(selectedItem);
      }
    }
    
    return ( 
        <div>
            <div className="category-wrapper">
                <CategoryBar setCategory={setCategory} category={category}/>
            </div>
            <ItemGrid 
                toggleModal={toggleModal} 
                addItemToOrder={addItemToOrder}
                items={Products[category as keyof ProductKeys]}
            />
            <OrderSelectionModal 
              showModal={showModal} 
              toggleModal={toggleModal}
              handleMenu={handleMenu}
              imgSrc={selectedItem.imgSrc} 
            />
        </div>
     );
}
 
export default MainPage;