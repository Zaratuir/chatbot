let ArgumentModel = require('./argumentModel');

let commandmodel = (()=>{
    let args = new Symbol();
    let message = new Symbol();
    let error = new Symbol();
    class commandModel{
        constructor(obj){
            if(typeof obj === "object"){
                this[args] = [];
                for(let i = 0; i < obj.args.length; i++){
                    this[args][i] = new ArgumentModel(obj[args][i]);
                }
                this[message] = obj.message;
                this[error] = obj.error;
            } else {
                this[args] = [];
                this[message] = null;
                this[error] = null;
            }
            Object.seal(this);
        }

        getArgs(){
            return this[args];
        }

        setArgs(argsArr){
            //TODO add type validation
            this[args] = argsArr;
        }

        getArg(i){
            return this[args][i];
        }

        setArg(i, arg){
            //TODO add type validation
            this[args][i] = arg;
        }

        getMessage(){
            return this[message];
        }

        setMessage(messageVal){
            //TODO add type validation
            this[message] = messageVal;
        }

        getError(){
            return this[error];
        }

        setError(err){
            //TODO add type validation
            this[error] = err;
        }

        toJSObject(){
            let obj = {};
            let objArgs = [];
            for(let i = 0; i < this[args].length; i++){
                objArgs.push(this[args].toJSObject());
            }
            obj.args = objArgs;
            obj.message = this[message];
            obj.error = this[error];
            return obj;
        }

        serialize(){
            return JSON.stringify(this.toJSObject());
        }
    }
    return commandModel;
})();

module.exports = commandmodel;