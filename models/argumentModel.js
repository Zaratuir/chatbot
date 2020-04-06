let argumentmodel = (() => {
    let name = new Symbol();
    let required = new Symbol();
    let type = new Symbol();
    let defaultValue = new Symbol();
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
                    this[defaultValue] = obj.default;
                }
            } else if (typeof obj === "string"){
                this[name] = obj;
                this[required] = null;
                this[type] = null;
                this[defaultValue] = null;
            }
            Object.seal(this);
        }

        getName(){
            return this[name];
        }

        setName(nameVal){
            this[name] = nameVal;
        }

        getType(){
            return this[type];
        }

        setType(typeVal){
            // TODO: Must add validation. Need an enum for this.
            this[type] = typeVal;
        }
        
        getRequired(){
            return this[required];
        }

        setRequired(requiredVal){
            if(typeof requiredVal !== "boolean"){
                throw("Method setRequired takes a boolean value.");
            }
            this[required] = requiredVal;
        }

        getDefaultValue(){
            return this[defaultvalue];
        }

        setDefaultValue(defaultvalue){
            this[defaultValue] = defaultvalue;
        }

        toJSObject(){
            return{
                "name":this[name],
                "required":this[required],
                "type":this[type],
                "default":this[defaultValue]
            };
        }

        serialize(){
            JSON.stringify(this.toJSObject());
        }
    }
    return argumentModel;
})();

module.exports = argumentmodel;