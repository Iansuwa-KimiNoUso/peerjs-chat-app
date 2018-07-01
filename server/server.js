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
    const message = {
        sender: myId,
        text: '',
        dateSend: new Date()
    };
    if (!peerConn) {
        throw new Error('Not connected to a peer');
    }
    const text = document.querySelector('#textarea').value;

    if (!text.length) {
        alert('You cannot send an empty message!'); 
        return false;
    }

    message.text = text.trim();
    peerConn.send(message);
}

function receiveMessage(message) {
    console.log(message);
    conversationMessage = null;
    //document.querySelector('#conversation').innerHTML += 
}
