let redeemmodel = (() => {
    let cost = new Symbol();
    let message = new Symbol();
    let name = new Symbol();
    class redeemModel{
        constructor(obj){
            if(typeof obj === "object"){
                this[cost] = obj.cost;
                this[message] = obj.message;
                this[name] = obj.name;
            } else {
                this[cost] = null;
                this[message] = null;
                this[name] = null;
            }
            Object.seal(this);
        }

        getName(){
            return this[name];
        }

        setName(nameArg){
            this[name] = nameArg;
        }

        getCost(){
            return this[cost];
        }

        setCost(costArg){
            this[cost] = costArg;
        }

        getMessage(){
            return this[message];
        }

        setMessage(messageArg){
            this[message] = messageArg;
        }

        toJSObject(){
            return {
                cost: this[cost],
                name: this[name],
                message: this[message]
            };
        }
        serialize(){
            return JSON.stringify(toJSObject);
        }
    }
    return redeemModel;
})();

module.exports = redeemmodel;