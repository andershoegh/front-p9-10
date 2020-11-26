import React, { useEffect, useContext, useRef, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ControlledComponentContext } from '../../Contexts/ControlledComponentContext';
import './CancelModal.scss'

export interface CancelModalProps {
    showModal: boolean;
    toggleModal: CallableFunction;
    clearOrder: CallableFunction;
}

const CancelModal: React.FC<CancelModalProps> = (props) => {
    const { showModal, toggleModal, clearOrder } = props;
    const { controlled, setControlled } = useContext(ControlledComponentContext);
    const history = useHistory();
    const [highlightedNumber, setHighlightedNumber] = useState(1);
    const modal = document.getElementById('cancel-modal');
    const buttonsRef = useRef<HTMLDivElement>(null);

    if(modal) {
        if(showModal) {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    }

    const cancelClick = () => {
        toggleModal(false);
        clearOrder();
        history.push('/');
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(buttonsRef.current) {
                const buttons = buttonsRef.current.children;
                const num = highlightedNumber;
                
                switch(e.key) {
                    case 'ArrowLeft':
                        if(num > 0) {
                            setHighlightedNumber(num - 1);
                        }
                        break;
                    case 'ArrowRight':
                        if(num < buttons.length - 1) {
                            setHighlightedNumber(num + 1)
                        }
                        break;
                    case 'Enter':
                        const clickable = buttons[num] as HTMLDivElement;
                        setControlled(num > 0 ? 'orderDetails' : 'none');
                        clickable.click();
                        break;
                }
            }
        }
        if(controlled === 'cancelModal') {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () =>
            window.removeEventListener('keydown', handleKeyDown);
    }, [buttonsRef, setControlled, controlled, setHighlightedNumber, highlightedNumber])

    useEffect(() => {
        if(controlled !== 'cancelModal') {
            setHighlightedNumber(1);
        }

        if(buttonsRef.current) {
            const buttons = buttonsRef.current.children;
            const num = highlightedNumber;
            for(let i = 0; i < buttons.length; i++) {
                if(controlled === 'cancelModal' && i === num) {
                    buttons[i].classList.add('highlighted');
                } else {
                    buttons[i].classList.remove('highlighted');
                }
            }
        }
    }, [buttonsRef, highlightedNumber, controlled, setHighlightedNumber]);

    return (
        <div id="cancel-modal">
        <div className="modal-content">
            <h2>Are you sure you want to cancel your order?</h2>

            <div className="button-container" ref={buttonsRef}>
            <button className="no-button" onClick={cancelClick}>Cancel order</button>
            <button className="yes-button" onClick={() => toggleModal(false)}>Continue order</button>
            </div>
        </div>
        </div>
    )
}

export default CancelModal