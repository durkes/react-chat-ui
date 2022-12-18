import { useState, useEffect, useRef } from 'react';
import chatAPI, { sendMessage } from './chatAPI.js';
import './App.css';

function App() {
  useEffect(() => {
    // useEffect will fire twice in StrictMode (on dev but not production)
    // https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
    chatAPI.start();
  });

  return (
    <div id="App">
      <header>Chat</header>
      <ChatContainer />
      <UserInput />
    </div>
  );
}

function ChatContainer() {
  const bottomElem = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatAPI.newMessage = (msgObj) => {
      setMessages(messages.concat([msgObj]));
    };

    // scroll down to see newest message
    bottomElem.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <main>
      {messages && messages.map(msgObj => <MessageItem key={msgObj.id} msgObj={msgObj} />)}
      <span ref={bottomElem}></span>
    </main>
  );
}

function MessageItem(props) {
  const msgObj = props.msgObj;
  const msgBody = msgObj.body;

  if (msgObj.user === 'bot') {
    return (
      <div className="message from" dangerouslySetInnerHTML={{ __html: msgBody }} />
    );
  }

  return (
    <div className="message to">
      {msgBody}
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

    if (!msgBody) {
      // blank message, do nothing
      return false;
    }

    const msgObj = {
      id: Date.now(), // rudimentary key assignment for demo only
      user: 'user',
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
