import React from 'react'
import './Stepper.scss'

export interface StepperProps {
    decrement: () => void
    increment: () => void
}

const Stepper: React.FC<StepperProps> = ({ decrement, increment }) => {
    return (
        <div className="stepper">
            <button onClick={decrement} className="stepperItem">
                -
            </button>
            <div>{}</div>
            <button onClick={increment} className="stepperItem">
                +
            </button>
        </div>
    )
}

export default Stepper
