const WS = require('ws');

const ws = new WS('ws://localhost:3000');

ws.on('open',onOpen);

ws.on('message',onMessage);

function onOpen(){
	console.log('Connection open');
	ws.send("Test Message");
	ws.send("init close");
}

function onMessage(data){
	console.log('received: %s', data);
	if(data === "init close"){
		ws.close();
	}
}

function onClose(){
	conosole.log('Connection closed.');
}
