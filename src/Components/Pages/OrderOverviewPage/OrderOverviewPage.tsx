import React, {useState} from 'react'
import { Order } from '../../../App'
import FlatItemCard from '../../FlatItemCard/FlatItemCard'
import './OrderOverviewPage.scss'
import Stepper from '../../Stepper/Stepper'
import NoteModal from '../../NoteModal/NoteModal'

export interface OrderOverviewPageProps {
    order: Order;
    setOrder: CallableFunction
}
export interface OrderNoteData{
    type: string;
    index: number;
}

const OrderOverviewPage: React.FC<OrderOverviewPageProps> = ({ order, setOrder }) => {
    const [modal, setModal]  = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<string>('');
    const [orderNoteDetails, setOrderNoteDetails] = useState<OrderNoteData>({index:-1, type:''})
    
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

    }
    return (
        <>
            <NoteModal showModal={modal} toggleModal={toggleModal} setOrderNote={setOrderNote} item={currentItem} prevNote={orderNoteDetails.index>-1 ? order[orderNoteDetails.type as keyof Order][orderNoteDetails.index].note : ''}/>
            <div className="order-overview">
                { (order.menus && order.menus.length > 0) && 
                    <>
                        <div className="headline">MENUS</div>
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
