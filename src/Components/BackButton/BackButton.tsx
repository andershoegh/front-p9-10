import * as React from 'react';
import { useHistory } from 'react-router-dom';
import './BackButton.scss'

export interface BackButtonProps {
    
}
 
const BackButton: React.SFC<BackButtonProps> = () => {
    const history = useHistory();
    return ( 
        <div onClick={history.goBack} className="back-card">
            <div className="back-arrow">
            </div>
            <p>
                BACK
            </p>
            
        </div>
     );
}
 
export default BackButton;