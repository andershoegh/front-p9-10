import React from 'react'
import './Stepper.scss'

export interface StepperProps {
    decrement: () => void
    increment: () => void
    amount: number
    toggleModal?: () => void
    editClass?: boolean
}

const Stepper: React.FC<StepperProps> = ({ decrement, increment, amount, toggleModal, editClass}) => {
    return (
        <div className="stepper-wrapper">
            <div className="stepper">
                <button onClick={decrement} className="stepperItem minus">
                </button>
                <div className="stepperCount">{amount}</div>
                <button onClick={increment} className="stepperItem plus">
                </button>
            </div>
            { (toggleModal && editClass !== undefined) &&
                <button className={"note-btn " + (editClass ? 'edit' : 'add')} onClick={toggleModal}>
                    {(editClass ? 'Edit ' : '') + 'Note'}
                </button>
            }
            
        </div>
      
    )
}

export default Stepper
