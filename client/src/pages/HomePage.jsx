import React, { useState } from 'react'
import LeftSide from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSide from '../component/RightSide';
const HomePage = () => {
const[selectedUser,setSelectedUser]=useState(false);


  return (
    <div>HomePage
        <LeftSide />
        <ChatContainer />
        <RightSide />
    </div>
  )
}

export default HomePage