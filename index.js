const WS = require('ws');
const eventManger = require('./utils/eventsManager');
const tmiManager = require('./tmiManager');

console.log(tmiManager);

myTMIManager = new tmiManager();

const wss = new WS.Server({
	port:3000
});

const serverState = {
	closing:false,
	wsArr:[]
}

wss.on('connection', onConnection);

function onConnection(ws){
	console.log('connected');
	serverState.wsArr.push(ws);
	ws.wsID = serverState.wsArr.length - 1;
	ws.send(JSON.stringify({id:ws.wsID,command:"setID"}));
	ws.on('message',onMessage);
	ws.on('close', onClose);
}

function onMessage(message){
	let validMsg = true;
	try{
		let msg = JSON.parse(message);
	} catch(e) {
		validMsg = false;
	}
	if(validMsg) {
		console.log('received: %s', msg.message);
		if(msg.message === "init close"){
			wss.clients.forEach(commitClose);
		}
	}
}

function commitClose(ws){
	if(ws.readyState === WS.OPEN){
		ws.send(JSON.stringify({id:ws.wsID,command:"close"}));
	}
}

function onClose(){
	console.log(arguments);
	console.log("Connection closed");
}

console.log('Done.');
