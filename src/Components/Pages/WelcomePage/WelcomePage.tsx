import React, { useContext } from 'react'
import './WelcomePage.scss'
import HandGesturesIcon from '../../../Resources/Icons/HandGesturesIcon'
import QRIcon from '../../../Resources/Icons/QRIcon'
import TouchIcon from '../../../Resources/Icons/TouchIcon'
import InteractionTile from '../../InteractionTile/InteractionTile'
import FLAIcon from '../../../Resources/Icons/FLAIcon'
import { ControlledComponentContext, ControlledComponentType } from '../../../Contexts/ControlledComponentContext'

export interface WelcomePageProps {
    
}

const WelcomePage: React.FC<WelcomePageProps> = () => {
    const { setControlled } = useContext<ControlledComponentType>(ControlledComponentContext);

    return (
        <div>
            <div className="restaurantIcon">
                <div>{FLAIcon()}</div>
            </div>
            <div className="interactionTiles">
                <InteractionTile
                    link="mainpage"
                    text={'TOUCH TO USE TOUCH INTERACTION'}
                    icon={TouchIcon}
                    onClick={()=>{setControlled('none')}}
                />
                <InteractionTile
                    link="mainpage"
                    text={'SCAN QR WITH PHONE TO USE SMARTPHONE CONTROLLER'}
                    icon={QRIcon}
                    onClick={()=>{setControlled('category')}}
                />
                <InteractionTile
                    link="mainpage"
                    text={'WAVE TO USE HAND GESTURES INTERACTION'}
                    icon={HandGesturesIcon}
                    onClick={()=>{setControlled('category')}}
                />
            </div>
        </div>
    )
}

export default WelcomePage
