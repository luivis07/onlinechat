import { useParams } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import socket from '../utils/socket';

const Chatroom = () => {
    const { id } = useParams();
    const username = useSelector((state) => state.username);
    const [messages, setMessages] = useState([]);
    const newMessage = useRef('');
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);
    useEffect(() => {
        socket.emit('joinRoom', id);
        return () => {
            socket.emit("leaveRoom", id);
        };
    }, []);
    const sendMessage = () => {
        socket.emit('message', {
            id: id,
            text: newMessage.current.value,
            sender: username,
            timestamp: Date.now()
        });
        newMessage.current.value = '';
    };
    return (
        <div>
            <Link to="/">View all rooms</Link>
            <div>
                <h2>Message History</h2>
                <div className="chatHistory">
                    {messages?.length > 0 ? messages.map((message, index) => (
                        <p key={index}>({message.displayTime}) {message.sender} : {message.text}</p>
                    )) : <p></p>}
                </div>
            </div>
            <div>
                <input type="text" ref={newMessage} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chatroom