import React, { createContext } from 'react';
import { Socket, io } from 'socket.io-client';

export interface SocketConnectionContextProviderProps {
    children: React.ReactNode;
}

export interface SocketConnectionType {
    socket: Socket;
}

const socketConnection = io();

export const SocketConnectionContext = createContext<SocketConnectionType>({socket: socketConnection});

const SocketConnectionContextProvider = (props: SocketConnectionContextProviderProps) => {
    return (
        <SocketConnectionContext.Provider value={{socket: socketConnection}}>
            { props.children }
        </SocketConnectionContext.Provider>
    )
}

export default SocketConnectionContextProvider;
