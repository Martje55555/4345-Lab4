const config = require('../config/default.json');
const WebSocket = require('ws');
const portFinder = require('portfinder');

// Ephemeral Port is defined to be from range 1024–65535.
portFinder.basePort = 1024;
portFinder.highestPort = 65535;


const wss = new WebSocket.Server({ port: 1024 })
//console.log(config.app.PORT);
//console.log(wss);
wss.on('connection', (ws) => {
    ws.send('Welcome!');
    console.log('New User Connected!')
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log(data.toString());
                client.send(data.toString());
            }
        });
    });
});
