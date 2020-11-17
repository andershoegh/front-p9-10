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
    type categories = 'Burgers' | 'Drinks' | 'Sides' | 'Desserts';
    const [selectedCategory, setSelectedCategory] = useState<categories>('Burgers');

    const toggleModal = (toggle: boolean, item?: MenuItem) => {
        setShowModal(toggle);
        if(item) {
          setSelectedItem(item);
        }
    }

    const handleMenu = (isMenu: boolean) => {
      if(!isMenu) {
        addItemToOrder(selectedItem);
      } else {
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
                category={category} 
                items={Products[category as keyof ProductKeys]} />
            <OrderSelectionModal 
              showModal={showModal} 
              toggleModal={toggleModal}
              handleMenu={handleMenu} 
            />
        </div>
     );
}
 
export default MainPage;