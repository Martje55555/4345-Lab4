const config = require('../config/default.json');
const WebSocket = require('ws');
const { getPortNum } = require('./getPort.js');

const connect = async () => {
    const p = await getPortNum();
    
    const wss = new WebSocket.Server({ port: p })
    console.log(`Socket connection listening on port ${p}`)
    wss.on('connection', (ws) => {
        console.log('connection successful');
        ws.send("Welcome!");

        ws.on('message', (data) => {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    console.log(data.toString());
                    client.send(data.toString());
                }
            });
        });
    });
};

connect();
