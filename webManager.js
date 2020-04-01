const http = require('http');
const express = require('express');
const session = require('express-session');
const webSettings = import('settings/webSettings.json');

class WebManager{
    port = 8080;
    app;
    sessionSettings = {
        saveUninitialized:false,
        secret:"$ecr3t!",
        resave:false
    };
    routerSettings = {
        caseSensitive: true,
        mergeParams: true,
        strict: false
    }
    server;
    constructor(settings){
        if(settings === undefined){
            settings = webSettings;
        }
        if(!settings.port){
            settings.port = webSettings.port;
        }
        if(!settings.session){
            settings.sessionSettings = webSettings.sessionSettings;
        }
        if(settings.port){
            this.port = settings.port;
        }
        if(settings.session){
            this.sessionSettings = settings.sessionSettings;
        }
        if(!settings.routerSettings){
            settings.routerSettings = webSettings.routerSettings;
        }
        if(settings.routerSettings){
            this.routerSettings = settings.routerSettings;
        }
        this.app = express();
        let sessionParser = session(this.sessionSettings);
        this.app.use(express.static('public'));
        this.app.use(sessionParser);
        this.app.use(express.Router(this.routerSettings));

    }
}

module.exports = WebManager;