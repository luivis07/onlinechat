import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: { rooms: [], username: '' },
  reducers: {
    createChatRoom: (state, action) => {
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      }
    },
    setUsername: (state, action) => {
      return {
        ...state,
        username: action.payload
      }
    },
    setRooms: (state, action) => {
      return {
        ...state,
        rooms: action.payload,
      };
    }
  },
});

export const { createChatRoom, setUsername, setRooms } = mainSlice.actions;
export default mainSlice.reducer;