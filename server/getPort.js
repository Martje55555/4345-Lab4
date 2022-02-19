//require('dotenv').config();
const portFinder = require('portfinder');
const config = require('./config/default.json');

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

p.then((result) => {
    config.app.PORT = result;
});