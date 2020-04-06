const redeemModel = require('./redeemModel');

let pointsmodel = (function(){
    let acquire = new Symbol();
    let redeemMap = new Symbol();
    let userMap = new Symbol();
    class pointsModel{
        constructor(obj){
            if(obj !== undefined){
                try{
                    this[acquire] = obj.acquired;
                    this[redeemMap] = new Map();
                    if(typeof obj.redeem === "object"){
                        for(redeems in obj.redeem){
                            this[redeemMap].set(redeems,new redeemModel(obj.redeem[redeems]));
                        }
                    }
                    this[userMap] = new Map();
                    if(typeof obj.userPoints === "object"){
                        for(user in obj.userPoints){
                            this[userMap].set(user,obj.userPoints[user]);
                        }
                    }
                } catch(e){
                    throw("Invalid constructor object.");
                }
            }
        }

        getAcquire(){
            return this[acquire];
        }

        setAcquire(acquired){
            if(typeof acquired === "number"){
                this[acquire] = acquired;
            } else {
                throw("Method setAcquire expects type number.");
            }
        }

        getRedeemMap(){
            return this[redeemMap];
        }

        setRedeemMap(redeemmap){
            let valid = true;
            if(!redeemmap instanceof Map()){
                valid = false;
            } else {
                for(let [key,obj] of redeemmap){
                    if(!obj instanceof redeemModel || typeof key !== "string"){
                        valid = false;
                        break;
                    }
                }
            }
            if(valid){
                this[redeemMap] = redeemmap;
            } else {
                throw("Method setRedeemMap expects type Map of redeemModel entries.");
            }
        }

        getRedeemModel(key){
            return this[redeemMap].get(key);
        }

        setRedeemModel(key,model){
            if(typeof key === "string" && model instanceof redeemModel){
                this[redeemMap].set(key,model);
            } else {
                throw("Method setRedeemModel expects two args: key and model which is an instance of redeemModel.");
            }
        }

        getUserPoints(){
            return this[userMap];
        }

        setUserPoints(usermap){
            valid = true;
            if(!usermap instanceof Map){
                valid = false;
            } else {
                for(let [key,value] of usermap){
                    if(typeof value !== "number" || typeof key !== "string"){
                        valid = false;
                        break;
                    }
                }
            }
            if(!valid){
                throw("Method setUserPoints expects type map of numbers");
            }
        }

        getUsersPoints(user){
            return this[userMap].get(user);
        }

        setUsersPoints(user,points){
            if(typeof user === "string" && typeof points === "number"){
                this[userMap].set(user,points);
            } else {
                throw("Method setUsersPoints expects two arguments: String user and Number points.")
            }
        }

        toJSObject(){
            let obj = {};
            obj.acquired = this[acquire];
            let redeemObj = {};
            for(let [key,value] of this[redeemMap]){
                redeemObj[key] = value.toJSObject();
            }
            obj.redeem = redeemObj;
            let userObj = {};
            for(let [key,value] of this[userMap]){
                userObj[key] = value;
            }
            obj.userPoints = userObj;
            return obj;
        }

        serialize(){
            JSON.stringify(this.toJSObject());
        }
    }

    return pointsmodel;
})();

module.exports = pointsmodel;