const tmi = require('tmi.js');

class tmiService extends tmi.Client {
    channelConfigs = new Map(); //This should be a map of channel config objects.
    constructor(superConfig,channelConfigs){
        if(!channelConfigs instanceof Map){
            throw("Config is not a map");
        }
        channelConfigs.get
        this.channelConfigs = channelConfigs;
    }
}

module.exports = tmiService;