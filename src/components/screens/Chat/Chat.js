import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Rooms from '../Rooms/Rooms';
import './chat.css';
import Messages from '../Messages/Messages';
let socket;
const Chat = ({ location, history }) => {
    const token = localStorage.getItem('authToken');
    const myname = localStorage.getItem("username")
    const [room, setRoom] = useState('');
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://127.0.0.1:5000';

    useEffect(() => {
        const { room } = queryString.parse(location.search);
      
        setRoom(room);
   
        socket = io(ENDPOINT);


        console.log('ill join')
        socket.emit('join', { room, token }, () => {

        });

        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ENDPOINT, location.search]);

    useEffect(() => {

        socket.on('message', (message) => {
            console.log(message);
            console.log(messages)
            setMessages(messages => [...messages, message]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
       
        if (message) {
            var text = {}
            text.message=message
            text.username=myname
            console.log(text);
            socket.emit('sendMessage', text, () => setMessage(''));
        }
    }

  
    return (
        <div className="full-box">

            <div className="chats">
                <Rooms history={history} />
            </div>

            <div className="chat-container">
                <div className="chat-header">
                    <h2>{room}</h2>
                </div>
                <div className="chat-box">
                    <Messages messages={messages} name={myname} />
                    <input value={message} onChange={(event) => setMessage(event.target.value)} className="chat-input" type="text"
                        onKeyPress={event => event.key === 'Enter' ?  sendMessage(event) : null} />
                    <button onClick={event => sendMessage(event)} className="chat-button">Send</button>
                </div>



            </div>

        </div>
    )
}

export default Chat;
