import React, { useEffect, useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './OrderSelectionModal.scss'
import ItemCard from '../ItemCard/ItemCard'
import { ControlledComponentContext } from '../../Contexts/ControlledComponentContext'

export interface OrderSelectionModalInterface {
    showModal: boolean
    toggleModal: CallableFunction
    handleMenu: CallableFunction
    imgSrc: string;
}

const OrderSelectionModal: React.FC<OrderSelectionModalInterface> = (props) => {
    const { showModal, toggleModal, handleMenu, imgSrc } = props;
    const { controlled, setControlled } = useContext(ControlledComponentContext);
    const [highlightedDiv, setHighlightedDiv] = useState('cardDiv');
    const [highlightedCard, setHighlightedCard] = useState(0);
    const history = useHistory();
    const modal = document.getElementById("modal")!;
    const cancelBtnRef = useRef<HTMLButtonElement>(null);
    const cardDivRef = useRef<HTMLDivElement>(null);
    let btnStyle = '';

    const orderSelection = (type: string) => {
        if (type === 'Single') {
            toggleModal(false);
            handleMenu(false);
            console.log('do stuff')
        } else if (type === 'Menu') {
            toggleModal(false);
            handleMenu(true);
            history.push('/menuselection');
        }
    }

    if(modal) {
        if (showModal) {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    }

    useEffect(() => {
        const modalKeyPress = (e: KeyboardEvent) => {    
            if(cardDivRef.current && cancelBtnRef.current){
                const cards = cardDivRef.current.children;
                const btn = cancelBtnRef.current;
                const cardNum = highlightedCard

                switch(e.key) {
                    case 'ArrowRight':
                        if(highlightedDiv === 'cardDiv' && cardNum < cards.length) {
                            setHighlightedCard(cardNum + 1);
                        }
                        break;
                    case 'ArrowLeft':
                        if(highlightedDiv === 'cardDiv' && cardNum > 0) {
                            setHighlightedCard(cardNum - 1);
                        }
                        break;
                    case 'ArrowDown':
                        if(highlightedDiv === 'cardDiv') {
                            setHighlightedDiv('btnDiv');
                        }
                        break;
                    case 'ArrowUp':
                        if(highlightedDiv === 'btnDiv') {
                            setHighlightedDiv('cardDiv');
                        }
                        break;
                    case 'Enter':
                        if(highlightedDiv === 'cardDiv') {
                            const clickable = cards[cardNum] as HTMLDivElement;
                            setControlled(cardNum > 0 ? 'menuSelection' : 'itemGrid');
                            clickable.click();
                        } else if(highlightedDiv === 'btnDiv') {
                            setControlled('itemGrid');
                            btn.click();
                        }
                        break;
                }
            }
        }
        if(controlled === 'orderSelectionModal') {
            window.addEventListener('keydown', modalKeyPress);
        } 
        return () =>
            window.removeEventListener('keydown', modalKeyPress);
    }, [controlled, setControlled, cardDivRef, cancelBtnRef, highlightedDiv, highlightedCard, setHighlightedCard, setHighlightedDiv]);

    useEffect(() => {
        if(controlled !== 'orderSelectionModal') {
            setHighlightedDiv('cardDiv');
            setHighlightedCard(0);
        }

        if(cardDivRef.current && cancelBtnRef.current) {
            const cards = cardDivRef.current.children;
            const btn = cancelBtnRef.current;
            const num = highlightedCard;

            if(controlled === 'orderSelectionModal'){
                if(highlightedDiv === 'cardDiv'){
                    btn.classList.remove('highlighted');
                    for(let i = 0; i < cards.length; i++) {
                        if(num === i){
                            cards[i].classList.add('highlighted');
                        } else {
                            cards[i].classList.remove('highlighted');
                        }
                    }
                } else if(highlightedDiv === 'btnDiv') {
                    cards[num].classList.remove('highlighted');
                    btn.classList.add('highlighted');
                }
            }
        }
    }, [controlled, setHighlightedDiv, setHighlightedCard, cardDivRef, cancelBtnRef, highlightedCard, highlightedDiv])

    return (
        <div id="modal">
            <div className="modal-content">
                <h2>Select an option</h2>
                <div className="selection-box" ref={cardDivRef}>
                    <ItemCard 
                        type='order selection'
                        scale={250}
                        name='Single' 
                        imgSrc={imgSrc} 
                        orderSelection={orderSelection}
                    />
                    <ItemCard 
                        type='order selection'
                        scale={250}
                        name='Menu' 
                        imgSrc='frenchFries.jpg' 
                        orderSelection={orderSelection}
                    />
                </div>
                <button className={btnStyle} ref={cancelBtnRef} onClick={() => toggleModal(false)}>CANCEL</button>
            </div>
        </div>
    )
}

export default OrderSelectionModal