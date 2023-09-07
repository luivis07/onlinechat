import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createChatRoom } from '../utils/reducers';
import socket from '../utils/socket';

const CreateChatroom = () => {
    const dispatch = useDispatch();
    const roomNameRef = useRef('');
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('roomCreated', (data) => {
            dispatch(createChatRoom(data));
            navigate('/');
        });
        return () => {
            socket.off('roomCreated');
        };
    }, [dispatch, navigate]);

    const createRoom = (event) => {
        event.preventDefault();
        socket.emit('createRoom', {
            name: roomNameRef.current.value
        });
    };

    return (
        <div>
            <form onSubmit={createRoom}>
                <label>Room Name</label>
                <input type="text" ref={roomNameRef} required></input>
                <button>Create</button>
            </form>
        </div>
    );
}

export default CreateChatroom