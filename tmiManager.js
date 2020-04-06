const tmiService = require('./tmiService');
const tmiSettings = require('./settings/tmiSettings');
const commandService = require('./services/commandService');
const events = require('./utils/eventsManager');
const logger = require('./utils/logger');
const fm = require('./utils/fileManager');

class tmiManager{
    tmiClientSettings = {};
    tmiClients = {};
    watchers = [];
    postCommandsTimeout;
    checkWatchersTimeout;
    pointsCycle = 60000;

    constructor(){
        this.addTMIClient = this.addTMIClient.bind(this);
        this.connectClient = this.connectClient.bind(this);
        this.connectClient = this.connectClient.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.checkWatchers = this.checkWatchers.bind(this);
        this.postCommands = this.postCommands.bind(this);
        let bots = fm.getDirArray('./settings/bots').then((bots) => {
            let bot;
            for(bot of bots){
                
                this.addTMIClient(setting);
            }
            this.checkWatchers();
        }).catch((e)=> logger.logMessage(e));
    }

    postCommands(channel){
        clearTimeout(this.postCommandsTimeout);
        this.postMessage(channel,"This stream is not nearly as awesome as my costreamers: Kastia13 and StormGirl92. Come join all of us at http://www.multitwitch.tv/kastia13/stormgirl92/zaratuir")
        this.postMessage(channel,"The commands allowed are: !commands, !echo {msg}, !dice {die type} {count}, !points, and !redeem");
        this.postCommandsTimeout = setTimeout(this.postCommands,300000,channel);
    }

    checkWatchers(){
        clearTimeout(this.checkWatchersTimeout);
        let now = Date.now();
        for(var myuser in this.watchers){
            let user = this.watchers[myuser];
            if(now > user.nextUpdate){
                user.points = user.points + 1;
                user.nextUpdate = user.nextUpdate + this.pointsCycle;
                //logger.logMessage(user.userName + " has earned another point.");
            }
        }
        this.checkWatchersTimeout = setTimeout(this.checkWatchers, 100);
    }

    addTMIClient(clientSettings){
        if(Object.keys(this.tmiClientSettings).length > 0){
            for(var client of this.tmiClientSettings){
                if(client.clientID === clientSettings.clientID){
                    throw new Error("TMI Client Already Exists for " + client.clientID);
                }
            }
        }
        this.tmiClientSettings[clientSettings.clientID] = clientSettings;
        this.tmiClients[clientSettings.clientID] = new tmiService.Client(clientSettings);
        this.tmiClients[clientSettings.clientID].userList = [];
	this.tmiClients[clientSettings.clientID].connected = false;
        if(clientSettings.active){
            this.connectClient(clientSettings.clientID);
        }
    }

    connectClient(client){
        this.tmiClients[client].connect();
        this.tmiClients[client].on("connected", (port,address) =>{
            for(let channel of this.tmiClientSettings[client].channels){
                this.postCommands(channel);
		this.tmiClients[client].connected = true;
            }
        });
        this.tmiClients[client].on("message", this.handleMessage.bind(this));
        this.tmiClients[client].on("join", this.handleJoin.bind(this));
        this.tmiClients[client].on("part", this.handleJoin.bind(this));
        this.tmiClients[client].on("diconnected", this.handleDisconnect.bind(this));
    }

    handleDisconnect(reason){
        logger.logMessage("Disconnected because " + reason);
        this.tmiClients[client].connect();
    }

    handleJoin(channel,username,self){
        if(self) return;
        username = username.toLowerCase();
        logger.logMessage(username + " has connected.");
        if(!this.watchers[username]){
            let user = {
                userName: username,
                points: 0,
                nextUpdate: Date.now() + this.pointsCycle
            }
            this.watchers[username] = user;
        }
        //logger.logMessage(channel,username + " has entered the fight.");
    }

    handlePart(channel,username,self){
        if(self) return;
        logger.logMessage(username + " has disconnected.");
        //this.postMessage(channel,username + " couldn't handle the fight.");
    }

    handleMessage(channel, tags, message, self){
        if(self) return;
        let username = tags['display-name'].toLowerCase();        
        if(!this.watchers[username]) {
            this.handleJoin(channel,username,self);
        }
        if(message.indexOf("!") === 0){
            logger.logMessage(username + " input command: " + message);
            let words = message.split(" ");
            switch(words[0].toLowerCase()){
                case "!givepoints":
                    if((username === "zaratuir" || username === "kastia13" || username === "bowser_jc") && words.length > 2){
                        let givename = words[1].toLowerCase();
                        let points = 0;
                        if(!this.watchers[givename]){
                            this.postMessage(channel,givename + " is not a watcher at the moment.");
                            return;
                        } else {
                            try {
                                let points = parseInt(words[2]);
                            } catch (e) {
                                this.postMessage(channel,words[2] + " is not a valid number of points.");
                                return;
                            }
                            this.watchers[words[1].toLowerCase()].points += parseInt(words[2]);
                            this.postMessage(channel,username + " has given " + words[1] + " " + words[2] + " points.");
                        }
                    }
                break;
                case "!kaswantspoints":
                    this.postMessage(channel,"Kas can't have anymore points! She's abusive with them!");
                break;
                case "!echo":
                    words.splice(0,1);
                    let returnMessage = words.join(" ");
                    this.postMessage(channel,username + " has requested me to echo his message: " + returnMessage);
                break;
                case "!dice":
                    let int = 6;
                    let diceType = "d6";
                    let iterations = 1;
                    if(words.length > 1){
                        diceType = words[1];
                        switch(words[1]){
                            case "d20":
                                int = 20;
                            break;
                            case "d12":
                                int = 12;
                            break;
                            case "d10":
                                int = 10;
                            break;
                            case "percentile":
                                int = 100;
                            break;
                            case "d8":
                                int = 8;
                            break;
                            case "d4":
                                int = 4;
                            break;
                            default:
                                diceType = "d6";
                                int = 6;
                        }
                    }
                    if(words.length > 2){
                        try{
                            iterations = parseInt(words[2]);
                        } catch (e){
                            null;
                        }
                    }
                    let value = 0;
                    for(var i = 1; i <= iterations; i++){
                        value += parseInt((Math.random() * int) + 1)
                    }
                    logger.logMessage("The result was " + value);
                    this.postMessage(channel,username + " has rolled " + iterations + " " + diceType+". The total result is " + value);
                break;
                case "!commands":
                    this.postCommands();
                break;
                case "!points":
                case "!point":
                    this.postMessage(channel,username + " has " + this.watchers[username].points + " points.");
                break;
                case "!redeem":
                    if(words.length === 1){
                        this.postMessage(channel,"You can redeem points with the redeem command followed by one of the following: pushups(15 pts), pullups(15pts), spinach(1pt)");
                    } else {
                        let pointCost = 0;
                        switch(words[1]){
                            case "pushups":
                            case "pullups":
                                pointCost = 15;
                            break;
                            case "spinach":
                                pointCost = 1;
                            break;
                            default:
                                this.postMessage(channel,words[1] + " is not something points can be redeemed for.");
                                return;
                        }
                        if(this.watchers[username].points < pointCost){
                            this.postMessage(channel,username + " has tried to make " + channel.replace('#','') + " do " + words[1] + ", but doesn't have enough points.");
                        } else {
                            events.emit("pointsRedeemed", {pointType: "points", cost:pointCost, action:words[1]});
                            this.watchers[username].points = this.watchers[username].points - pointCost;
                            this.postMessage(channel,username + " has redeemed " + pointCost + " points to make " + channel.replace("#","") + " do " + words[1] + ".");
                        }
                    }
                break;
                default:
                    this.postMessage(channel,username + " has requested an illegal command. Rude.");
            }
        }
    }

    postMessage(client, message){
        logger.logMessage(message + " posted in " + client);
	if(this.tmiClients[client].connected){
		this.tmiClients[client].say(client, message);
	}
    }

    updateSettings(){
    }
}

module.exports = tmiManager;
