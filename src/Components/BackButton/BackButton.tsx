import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ControlledComponentContext } from '../../Contexts/ControlledComponentContext';
import './BackButton.scss'

export interface BackButtonProps {
    
}
 
const BackButton: React.FC<BackButtonProps> = () => {
    const history = useHistory();
    const { controlled, setControlled } = React.useContext(ControlledComponentContext);

    const handleBack= ()=>{
        setControlled(controlled !== 'none' ? 'itemGrid' : 'none');
        history.goBack();  
    };
    
    return ( 
        <div onClick={handleBack} className="back-card">
            <div className="back-arrow">
            </div>
            <p>
                BACK
            </p>
            
        </div>
     );
}
 
export default BackButton;