import React from 'react'
import { Link } from 'react-router-dom'
import './InteractionTile.scss'

interface InteractionTileProps {
    icon: () => {}
    text: string
    link: string
    onClick?: CallableFunction
}

const InteractionTile: React.FC<InteractionTileProps> = (props) => {
    const { icon, text, link, onClick } = props;

    return (
        <Link to={link}>
            <div className="tile" onClick={()=> onClick ? onClick() : null}>
                <div className="tileIcon">{icon()}</div>
                <div className="tileText">{text}</div>
            </div>
        </Link>
    )
}

export default InteractionTile