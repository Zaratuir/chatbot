let userpointsmodel = (() => {
    let points = new Symbol();
    let lastUpdated = new Symbol();
    class userPointsModel{
        constructor(points){
            if(typeof points !== "number"){
                throw("userPointsModel constructor takes only a number of points.");
            }
            this[points] = points;
            this[lastUpdated] = now();
            Object.seal(this);
        }

        getPoints(){
            return this[points];
        }

        setPoints(pointsVal){
            this[points] = pointsVal;
        }

        addPoints(pointsVal){
            this[points] += pointsVal;
        }

        subtractPoints(pointsVal){
            this[points] -= pointsVal;
        }

        getLastUpdated(){
            return this[lastUpdated];
        }

        setLastUpdated(lastUpdatedVal){
            this[lastUpdated] = lastUpdatedVal;
        }

        toJSObject(){
            return {"points":this[points]};
        }

        serialize(){
            return JSON.stringify(this.toJSObject);
        }
    }
})();

module.exports = userpointsmodel;