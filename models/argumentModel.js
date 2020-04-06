let argumentmodel = (() => {
    let name = new Symbol();
    let required = new Symbol();
    let type = new Symbol();
    let value = new Symbol();
    class argumentModel{
        constructor(obj){
            if(typeof obj === "object"){
                if(obj.required === false && typeof obj.default !== obj.type){
                    throw("This argument is not required and so must have a default value.");
                }
                this[name] = obj.name;
                this[required] = obj.required;
                this[type] = obj.type;
                if(obj.default){
                    this[value] = obj.default;
                }
            } else if (typeof obj === "string"){
                this[name] = obj;
            }
        }

        getName(){
            return this[name];
        }

        setName(nameVal){
            this[name] = nameVal;
        }
        
        getRequired(){
            return this[required];
        }

        setRequired(requiredVal){
            this[required] = requiredVal;
        }


    }
    return argumentModel;
})();

module.exports = argumentmodel;