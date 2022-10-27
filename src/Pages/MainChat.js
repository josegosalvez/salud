import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../firebase/firebaseConfig';
import { ChatContext } from '../context/chat';
import Moment from 'react-moment';

const MainChat = () => {
  const navigate = useNavigate();
  const {user, persisUser, signOut} = useContext(AuthContext);
  const [messageToSave, setMessageToSave] = useState("");
  const {sendMessage, getChatHistory, chatData, loading, updateChatHistory} = useContext(ChatContext);

  useEffect(() =>{
      if(persisUser() == false){
          return navigate('/admin/login');
      }
      getChatHistory();
  }, []);

  const signUserOut = () => {
      signOut();
      navigate('/admin/login');
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {email} = user;
      await sendMessage(email, messageToSave)
      updateChatHistory();
      setMessageToSave("");
  }

  if (loading) {
        return <div className='container'>Loading chat...</div>
  }

  const chatHistory = chatData.length > 0 ? chatData.sort((a,b) => {
      return a.time - b.time}):null

  return (
    <div className='chat-container'>
        <div className='chat-grid'>
            <div className='sidebar'>
                <p>Signed in as {user.email}</p>
                <p onClick={signUserOut} className='sign-out'>Sign out</p>
            </div>
            <div className='chat'>
                {/*usuario chat*/ }
                {chatHistory ? chatHistory.map((c) =>{
                   return c.from == user.email ? (
                        <div key={c.time} className='user-chat'>
                            <div className='chat-info'>
                                {c.from} on <span><Moment format="MMMM DD, YYYY HH:mm">{c.time}</Moment></span>
                            </div>
                            {c.message}
                        </div>) : (
                        <div key={c.time} className='sender-chat'>
                            <div className='chat-info'>
                                {c.from} on <span><Moment format="MMMM DD, YYYY HH:mm">{c.time}</Moment></span>
                            </div>
                            {c.message}
                        </div>
                        )
                }):null}
            </div>
            </div>
        <div className='chat-form-container'>
            <form onSubmit={handleSubmit} className='chat-form'>
                <div className='chat-input-container'>
                    <input
                        className='chat-input'
                        type="text"
                        value={messageToSave}
                        onChange={(e) =>{setMessageToSave(e.target.value)}}
                    />
                    <input onClick={handleSubmit}
                        className='chat-send'
                        type='submit'
                        value='Send'>
                    </input>
                </div>
            </form>
        </div>
    </div>
  )
};

export default MainChat;