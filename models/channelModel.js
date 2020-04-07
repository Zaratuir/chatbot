const pointsModel = require('./pointsModel');
const commandModel = require('./commandModel');
const viewrModel = require('./viewerModel');

let channelmodel = (()=>{
    let points = new Symbol();
    let commands = new Symbol();
    let defaultPoints = new Symbol();
    let commandFunctions = new Symbol();
    let viewers = new Symbol();
    class channelModel{
        constructor(obj){
            this[points] = new Map();
            this[viewers] = new Map();
            this[commands] = new Map();
            this[commandFunctions] = new Map();
            if(typeof obj === "object"){
                this[defaultPoints] = obj.defaultPoints;
                for(let key in obj.points){
                    this[points].set(key,new pointsModel(obj.points[key]));
                }
                for(let key in obj.commands){
                    this[commands].set(key,new commandModel(obj.commands[key]));
                }
                for(let key in obj.commandFunctions){
                    this[commandFunctions].set(key,obj.commandFunctions[key]);
                }
                for(let key in obj.viewers){
                    this[viewers].set(key,new viewerModel(obj.viewers[key]));
                }
            } else {
                this[defaultPoints] = null;
            }
            Object.seal(this);
        }

        getPointsMap(){
            return this[points];
        }
        
        setPointsMap(pointMap){
            this[points] = pointMap;
        }

        getPoints(key){
            return this[points].get(key);
        }

        setPoints(key,pointsObj){
            this[points].set(key,pointsObj);
        }

        getViewers(){
            return this[viewers];
        }

        setViewers(viewerMap){
            this[viewers] = viewerMap;
        }

        getViewer(key){
            return this[viewer].get(key);
        }

        setViewer(key,viewerObj){
            this[viewers].set(key,viewerObj);
        }

        getCommands(){
            return this[commands];
        }

        setCommands(commandMap){
            this[commands] = commandMap;
        }

        getCommand(key){
            return this[commands].get(key);
        }

        setCommand(key,commandObj){
            this[commands].set(commandObj);
        }

        getCommandFunctions(){
            return this[commandFunctions];
        }

        setCommandFunctions(commandFunctMap){
            this[commandFunctions] = commandFunctMap;
        }

        getCommandFunction(key){
            return this[commandFunctions].get(key);
        }

        setCommandFunction(key,funct){
            this[commandFunctions].set(key,funct);
        }

        getDefaultPoints(){
            return this[defaultPoints];
        }

        setDefaultPoints(pointType){
            this[defaultPoints] = pointType;
        }
    }

    return channelModel;
})();

module.exports = channelmodel;