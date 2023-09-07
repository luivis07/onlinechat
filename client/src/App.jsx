import React from 'react';
import Join from './components/Join';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatroom from './components/Chatroom';
import CreateChatroom from './components/CreateChatroom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chatroom/create" element={<CreateChatroom />} />
        <Route path="/chatroom/:id" element={<Chatroom />} />
      </Routes>
    </Router>
  );
}

export default App