import * as React from 'react'
import { Link } from 'react-router-dom'
import './InteractionTile.scss'

interface InteractionTileProps {
    icon: () => {}
    text: string
    link: string
}

const InteractionTile: React.FC<InteractionTileProps> = ({
    icon,
    text,
    link,
}) => {
    return (
        <Link to={link}>
            <div className="tile">
                <div className="tileIcon">{icon()}</div>
                <div className="tileText">{text}</div>
            </div>
        </Link>
    )
}

export default InteractionTile
