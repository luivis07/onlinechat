import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setRooms } from '../utils/reducers';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import socket from '../utils/socket';

const Join = () => {
    const rooms = useSelector((state) => state.rooms);
    const dispatch = useDispatch();
    const username = useSelector((state) => state.username);
    const userNameRef = useRef('');
    const navigate = useNavigate();
    const [selectedRoom, setRoom] = useState('');
    const joinRoom = (event) => {
        event.preventDefault();
        const newUsername = userNameRef.current.value;
        dispatch(setUsername(newUsername));
        navigate(`/chatroom/${selectedRoom.id}`);
    };
    useEffect(() => {
        socket.on('roomList', (rooms) => {
            dispatch(setRooms(rooms));
        });
        return () => {
            socket.off('roomList');
        };
    }, [dispatch]);
    return (
        <div>
            <Link to='chatroom/create'>Create Room</Link>
            <div>
                <form onSubmit={joinRoom}>
                    <label>Username:</label>
                    <input type="text" ref={userNameRef} defaultValue={username} required />
                    <div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={rooms.map(r => {
                                return { label: r.name, id: r.id }
                            })}
                            onChange={(event, selectedRoom) => {
                                setRoom(selectedRoom);
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Rooms" />}
                        />
                    </div>
                    <button>Join</button>
                </form>
            </div>
        </div>
    );
}

export default Join