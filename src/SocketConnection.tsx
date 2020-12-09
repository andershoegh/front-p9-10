import { Socket, io } from 'socket.io-client';
import { receiveNote } from './Components/NoteModal/NoteModal';

let socketConnection: Socket;

export const connect = () => {
    socketConnection = io();
};

export const listen = () => {
    if(socketConnection) {
        socketConnection.on('tablet navigation', (input: string) => {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': input}));
        });

        socketConnection.on('note input', (input: string) => {
            receiveNote(true, input);
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });

        socketConnection.on('phone connected', (input: string) => {
            console.log('interaction type received from server');
            window.dispatchEvent(new CustomEvent('interaction type', { detail: input }));
        });
    }
};

export const emit = (event: string, data: string | boolean) => {
    socketConnection.emit(event, data);
}