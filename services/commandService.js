commandModel = require('../models/commandModel');

class commandService{
    constructor(){

    }

    getMessage(model){
        if(!model instanceof commandModel){
            throw("Method getMessage requires a commandModel as it's argurment");
        }
        model.
    }
}

module.exports = commandService;