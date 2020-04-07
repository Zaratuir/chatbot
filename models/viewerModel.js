const userPointsModel = require('./userPointsModel');

let viewermodel = (()=>{
    class viewerModel{
        constructor(obj){
            
        }

        setPoints(pointType,pointModel){
            this[points].set(pointType,pointModel);
        }

        getPoints(pointType){
            return this[points].get(pointType);
        }

        getUserPointsMap(){
            return this[points];
        }

        setUserPointsMap(pointsMap){
            valid = true;
            if(!pointsMap instanceof Map){
                valid = false;
            } else {
                for(let [key,value] of pointsMap){
                    if(!value instanceof userPointsModel || typeof key !== "string"){
                        valid = false;
                        break;
                    }
                }
            }
            if(!valid){
                throw("Method setUserPoints expects type map of userPointsModel");
            }
        }
    }
})();