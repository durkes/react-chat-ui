import { useState, useEffect } from 'react';
import './App.css';

const chatAPI = {};
function sendMessage(msgObj) {
  const newMessage = chatAPI.newMessage;

  // this logic is not robust and assumes errors never happen :) just for demo
  if (!newMessage) {
    return alert('Something went wrong!');
  }

  newMessage(msgObj);
}

function App() {
  return (
    <div id="App">
      <header>Chat</header>
      <ChatContainer />
      <UserInput />
    </div>
  );
}

function ChatContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatAPI.newMessage = (msgObj) => {
      setMessages(messages.concat([msgObj]));
    };
  });

  return (
    <main>
      {messages && messages.map(msgObj => <MessageItem key={msgObj.id} message={msgObj} />)}
    </main>
  );
}

function MessageItem(props) {
  return (
    <div>
      {props.message.body}
    </div>
  );
}

function UserInput() {
  const [msgBody, setMsgBody] = useState('');

  function handleChange(e) {
    setMsgBody(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const msgObj = {
      id: Date.now(), // rudimentary id assignment for demo only
      user: 'user1',
      body: msgBody
    };

    sendMessage(msgObj);
    setMsgBody('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={msgBody} onChange={handleChange} />
      <button>Send</button>
    </form>
  );
}

export default App;
