const peer = new Peer('', { host: 'localhost', port: 9000, path: '/peerjs' });

let peerIdInput = document.querySelector('.id-input');
let myId = null;
let peerConn = null;

peer.on('open', id => {
    myId = id;
    console.log(`My Peer Id is: ${id}`);
    document.querySelector('.chat-id').innerHTML += id;

});

peer.on('connection', conn => {
    conn.on('data', receiveMessage);
});

function connect() {
    const peerId = peerIdInput.value;
    peerConn = peer.connect(peerId);
    peerConn.on('open', () => {
        console.log('connected to peer', peerId);
        // updateUI()
    });
}

function sendMessage() {
    if (!peerConn) {
        throw new Error('Not connected to a peer');
    }

    const message = {
        sender: myId,
        text: document.querySelector('#textarea').value.trim(),
        dateSent: new Date()
    };

    if (!message.text.length) {
        alert('You cannot send an empty message!');
        return false;
    }

    createMessageComponent(message);
    peerConn.send(message);
}

function receiveMessage(message) {
    createMessageComponent(message);
}

function createMessageComponent({ sender, text, dateSent }, ) {
    const chatContent = document.querySelector('#chat-content');
    const cardContentDiv = createElement({
        attrs: {
            class: 'card-content white-text',
            title: dateSent,
            left: 0
        }
    });
    const senderSpan = createElement({
        name: 'span',
        text: sender
    });
    const messageDiv = createElement({ text });
    const cardContentChildren = [
        senderSpan, messageDiv
    ];
    cardContentChildren.forEach(element => cardContentDiv.appendChild(element));
    chatContent.appendChild(cardContentDiv);
}

function createElement({ name = 'div', attrs = {}, text = '' }) {
    const element = document.createElement(name);

    Object.keys(attrs).forEach(key => {
        element.setAttribute(key, attrs[key]);
    });

    if (text.length) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }

    return element;
}
