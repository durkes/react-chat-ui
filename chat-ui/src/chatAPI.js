const chatAPI = {};

export function sendMessage(msgObj) {
    const newMessage = chatAPI.newMessage;

    // this logic is not robust and assumes errors never happen :) just for demo
    if (!newMessage) {
        return alert('Something went wrong!');
    }

    newMessage(msgObj);

    if (msgObj.user !== 'bot') {
        chatBotReply();
    }
}

let isReady = false;
chatAPI.start = () => {
    if (isReady) {
        return true;
    }

    isReady = true;
    chatBotReply();
};

const botReplies = [
    'Hello. I\'m a chat bot. Send a message to see my next response.',
    'I will send you a message each time you reply. There is no backend for this demo. My replies are hardcoded.',
    'This app was built using React. If you\'re curious, you can check out the <a href="https://github.com/durkes/react-chat-ui" target="_blank">source code</a>.',
    'The interesting stuff is in the <a href="https://github.com/durkes/react-chat-ui/tree/main/chat-ui/src" target="_blank">chat-ui/src</a> directory.',
    'BTW, I can send parsed HTML, but you cannot. Sometimes it\'s good to be a bot :)',
    'This is my last unique message. I hope you enjoyed the demo and thanks for stopping by! Have a great day!',
];

function chatBotReply() {
    let msgBody = botReplies.shift();

    if (!msgBody) {
        msgBody = 'I don\'t want you to be lonely, so I will keep replying. It might get boring though...';
    }

    const msgObj = {
        id: Date.now() + 1, // rudimentary key assignment for demo only
        user: 'bot',
        body: msgBody
    };

    setTimeout(sendMessage, 1000, msgObj);
}

export default chatAPI;