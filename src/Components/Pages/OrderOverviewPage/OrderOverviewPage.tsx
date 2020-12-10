import React, {useContext, useEffect, useState} from 'react'
import { MenuItem, Order } from '../../../App'
import FlatItemCard from '../../FlatItemCard/FlatItemCard'
import './OrderOverviewPage.scss'
import Stepper from '../../Stepper/Stepper'
import NoteModal from '../../NoteModal/NoteModal'
import { ControlledComponentContext } from '../../../Contexts/ControlledComponentContext'

export interface OrderOverviewPageProps {
    order: Order;
    setOrder: CallableFunction
}
export interface OrderNoteData{
    type: string;
    index: number;
}
function indexClosestToEnd(array: MenuItem[]): number{
    const length = array.length;
    if(length > 4){
        for(let i = length; i>length-4; i--){
            if(i % 4 === 0 || i % 4 === 3){
                return i * 2 - 1;
            }
        }
    }
    return length < 2 ? 1 : length * 2 - 1;
}
const OrderOverviewPage: React.FC<OrderOverviewPageProps> = ({ order, setOrder }) => {
    const [modal, setModal]  = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<string>('');
    const [orderNoteDetails, setOrderNoteDetails] = useState<OrderNoteData>({index:-1, type:''})
    const [higlightedItem, setHiglightedItem] = useState(
        {
            index: indexClosestToEnd(order.menuItems), 
            area: (order.menuItems.length ?  ('singleItems') : ( order.menus.length ? 'menus' : 'backButton'))
        }
    );
 
    const [ right, setRight ] = useState(true);
    const { controlled, setControlled } = useContext(ControlledComponentContext);
    const orderContainer = document.querySelector('.order-overview');

    useEffect(()=>{
        const menusSteppers = document.querySelectorAll('.menuDisplay button');
        const singleItemSteppers = document.querySelectorAll('.singleItems button');
        const backButton = document.querySelector('.back-card');
        if(higlightedItem.area === 'menus'){
            const { index } = higlightedItem;
            const newVal = index === 1  || ( index % 3 === 1);

            if(newVal !== right && index % 3 !== 2)
                setRight(newVal);
        }
        const handleKeyDown = (e: KeyboardEvent) =>{
            const { index, area } = higlightedItem;
            
            switch(e.key){
                case 'ArrowUp':
                    if(area === 'singleItems'){
                        const hasElAbove = (index - 8) >= 0;
                        
                        if(menusSteppers.length>0 || hasElAbove){
                            const newIdx = hasElAbove ?  index-8 : menusSteppers.length-1 ;
                            const newArea = hasElAbove ? area : 'menus' ;
                            setHiglightedItem({index: newIdx, area: newArea});
                        }else{
                            setHiglightedItem({index, area: 'backButton'});
                        }
                    } else if(index >= 0 ){
                        if(index < 2){
                            setHiglightedItem({index, area: 'backButton'});
                        }else{
                            const note = index % 3 === 2;
                            const newIdx = index - (note ? (right ? 1 : 2) : (right ? 2 : 1)); 
                            setHiglightedItem({index: newIdx, area});
                        }
                    }
                    break;
                case 'ArrowDown':
                    if(area === 'singleItems'){
                        const hasElBelow = (index + 8) < (singleItemSteppers.length);
                        const newIdx = hasElBelow ? index + 8 : index;
                        if(hasElBelow){
                            setHiglightedItem({index: newIdx, area});
                        }else{
                            setControlled('orderDetails');
                        }
                    }else if(area === 'menus'){
                        if(index < menusSteppers.length-1){
                            const note = index % 3 === 2;
                            const newIdx = index + (note ? (right ? 2 : 1) : (right ? 1 : 2)); 
                            setHiglightedItem({index: newIdx, area});
                        }else if(index === menusSteppers.length-1){
                            if(singleItemSteppers.length){
                                const newIdx = singleItemSteppers.length >= 8 ? (right ? 8-1 : 8-2) : singleItemSteppers.length-1;
                                setHiglightedItem({area: 'singleItems', index: newIdx});
                            }else{
                                setControlled('orderDetails');
                            }
                        }
                    }else if(area === 'backButton'){
                        const newArea = order.menus.length ? 'menus' : order.menuItems ? 'singleItems' : 'orderDetails';
                        if(newArea !== 'orderDetails'){
                            setHiglightedItem({index, area: newArea});
                        }else{
                            setControlled(newArea);
                        }
                    }
                    break;
                case 'ArrowRight':
                    if(area === 'menus'){
                        if(index % 3 === 0){ //This is minus buttons
                            setHiglightedItem({index: index+1, area});
                        }
                    }else if(area === 'singleItems'){
                        if( index=== 0||(index % 8 !== 7 && index < singleItemSteppers.length-1)){
                            setHiglightedItem({index: index+1, area});
                        }
                    }
                    break;
                case 'ArrowLeft':
                    if(area === 'menus'){
                        if(index % 3 === 1){
                            setHiglightedItem({index: index-1, area});
                        }
                    }else if(area === 'singleItems'){
                        if(index % 8 !== 0 && index > 0){
                            setHiglightedItem({index: index-1, area});
                        }
                    }
                    break;
                case 'Enter':
                    const clickable = (area === 'menus' ?
                          menusSteppers[index]
                        : area === 'singleItems' ? 
                          singleItemSteppers[index]
                        : backButton) as HTMLDivElement;
                    clickable.click();
            }
        }
        if(controlled === 'orderOverview'){
            window.addEventListener('keydown', handleKeyDown);
        }
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [higlightedItem, controlled, setControlled, right, setRight, order])

    useEffect(()=>{ // UseEffect that sets the styling
        const combinedNodeList = document.querySelectorAll('.menuDisplay button, .singleItems button, .back-card');
        combinedNodeList.forEach(el=>{
                el.classList.remove('highlighted');
        });

        if(controlled === 'orderOverview'){
            const { index, area } = higlightedItem;
            const backButton: HTMLDivElement|null = document.querySelector('.back-card');
            const nodeList = area === 'menus' ? document.querySelectorAll('.menuDisplay button') : document.querySelectorAll('.singleItems button');
            
            if(area === 'backButton'){
                backButton?.classList.add('highlighted');
            }else{
                const block = area === 'menus' ? 'end' : 'center';
                nodeList[index]?.scrollIntoView({ behavior: 'smooth', block});
                nodeList[index]?.classList.add('highlighted');
            }
        }
    },[controlled, setControlled, higlightedItem, order]);

    useEffect(()=>{
        const { area, index }  = higlightedItem;
        const theOrder = area === 'menus' ? order.menus : order.menuItems;
        const multiplier = area === 'menus' ? 3 : 2;
        const maxIndex = theOrder.length*multiplier-1;
        if(area !== 'backButton' && maxIndex < index){
            setHiglightedItem({area, index: maxIndex});
        }
    }, [ order, higlightedItem]);
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

    const setOrderNote = ( note: string)=>{
        const { type, index } = orderNoteDetails;
        if(index > -1){
            let newOrder = [...order[type as keyof Order]];
            newOrder[index].note = note;
            setOrder({...order, [type as keyof Order]: newOrder});
        }
    }

    const toggleModal = (item?: string)=> {
        setCurrentItem(item ? item : '');
        setModal(oldModal => {
            if(oldModal){
                setOrderNoteDetails({index:-1, type:''});
            }
            return !oldModal;
        });
    }
    const stepperToggleModal = (item: any, index: number)=>{
        const itemName =  item.type === 'menu' ? item.burger.name + ' Menu' : item.name;
        const type = item.type === 'menu' ? 'menus': 'menuItems';
        setOrderNoteDetails({index, type});
        toggleModal(itemName);
        setControlled(controlled !== 'none' ? 'noteModal' : 'none');
    }
    return (
        <>
            <NoteModal showModal={modal} toggleModal={toggleModal} setOrderNote={setOrderNote} item={currentItem} prevNote={orderNoteDetails.index>-1 ? order[orderNoteDetails.type as keyof Order][orderNoteDetails.index].note : ''}/>
            <div className="order-overview">
                { (order.menus && order.menus.length > 0) && 
                    <>
                        <div className="headline menus-wrapper">MENUS</div>
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
                                                editClass={menu.hasOwnProperty('note') && menu.note !== ''}
                                                toggleModal={()=>stepperToggleModal(menu, index)}
                                                
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
        </>
    )
}

export default OrderOverviewPage
