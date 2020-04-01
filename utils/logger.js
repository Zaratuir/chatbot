const loggerSettings = require('../settings/loggerSettings.json');
class logger{
    debug = false;
    constructor(settings){
        if(!settings){
            settings = loggerSettings;
        }
        if(!settings.debug){
            settings.debug = loggerSettings.debug;
        }
        if(settings.debug){
            this.debug = settings.debug;
        }
    };

    logMessage(message){
        if(this.debug){
            console.log(message);
        }
    }
}

module.exports = new logger();