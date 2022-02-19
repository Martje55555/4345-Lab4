const config = require('../config/default.json');
const WebSocket = require('ws');
const portFinder = require('portfinder');

// Ephemeral Port is defined to be from range 1024–65535.
portFinder.basePort = 1024;
portFinder.highestPort = 65535;


getPortNum = async () => {
    await portFinder.getPortPromise()
        .then((port) => {
            config.app.PORT = port;
        })
        .catch((err) => {
            console.log(err);
        });
    return config.app.PORT;
}

const p = getPortNum();
console.log(p);

p.then((result) => {
    config.app.PORT = result;
})
    .then(() => {
        //console.log(config.app.PORT);
        const wss = new WebSocket.Server({ port: config.app.PORT })
        console.log(config.app.PORT);
        wss.on('connection', (ws) => {
            console.log('here');
            ws.on('message', (data) => {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        console.log(data.toString());
                        client.send(data.toString());
                    }
                });
            });
        });

    })
    .catch((e) => {
        console.log(e);
    });




