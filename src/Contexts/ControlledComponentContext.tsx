import React, { createContext, useState } from 'react';

export interface ControlledComponentContextProviderProps {
    children: React.ReactNode;
}
export interface ControlledComponentType { 
    controlled: string, 
    setControlled: CallableFunction
};
export const ControlledComponentContext = createContext<ControlledComponentType>({controlled:'welcomePage', setControlled:()=>{}});

const ControlledComponentContextProvider = (props:ControlledComponentContextProviderProps) => {
    const [controlled, setControlled] = useState<string>('welcomePage');  

    return (  
        <ControlledComponentContext.Provider value={{controlled, setControlled} as ControlledComponentType}>
            { props.children }
        </ControlledComponentContext.Provider>
    );
}
 
export default ControlledComponentContextProvider;
