import React from 'react'
import './Stepper.scss'

export interface StepperProps {
    decrement: () => void
    increment: () => void
    amount: number
}

const Stepper: React.FC<StepperProps> = ({ decrement, increment, amount }) => {
    return (
        <div className="stepper">
            <button onClick={decrement} className="stepperItem minus">
            </button>
            <div className="stepperCount">{amount}</div>
            <button onClick={increment} className="stepperItem plus">
            </button>
        </div>
    )
}

export default Stepper