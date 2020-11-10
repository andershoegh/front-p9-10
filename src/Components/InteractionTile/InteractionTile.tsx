import * as React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import './InteractionTile.scss'

const InteractionTile: React.FC<{
    icon: () => {}
    text: string
    link: string
}> = ({ icon, text, link }) => {
    let match = useRouteMatch()
    console.log(match)
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
