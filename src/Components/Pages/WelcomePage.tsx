import React from 'react'
import './WelcomePage.scss'
import HandGesturesIcon from '../../Resources/Icons/HandGesturesIcon'
import QRIcon from '../../Resources/Icons/QRIcon'
import TouchIcon from '../../Resources/Icons/TouchIcon'
import InteractionTile from '../InteractionTile/InteractionTile'
import FLAIcon from '../../Resources/Icons/FLAIcon'

export interface WelcomePageProps {}

const WelcomePage: React.FC<WelcomePageProps> = () => {
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
                />
                <InteractionTile
                    link="mainpage"
                    text={'SCAN QR WITH PHONE TO USE SMARTPHONE CONTROLLER'}
                    icon={QRIcon}
                />
                <InteractionTile
                    link="mainpage"
                    text={'WAVE TO USE HAND GESTURES INTERACTION'}
                    icon={HandGesturesIcon}
                />
            </div>
        </div>
    )
}

export default WelcomePage
