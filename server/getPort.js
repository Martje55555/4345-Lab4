const portFinder = require('portfinder');
const config = require('../config/default.json');

// Ephemeral Port is defined to be from range 1024–65535.
portFinder.basePort = 1024;
portFinder.highestPort = 65535;

const getPortNum = async () => {
    let p = 0;
    await portFinder.getPortPromise()
        .then((port) => {
            config.app.PORT = port;
            p = port;
        })
        .catch((err) => {
            console.log(err);
        });
    if(p != 0) {
        console.log(p);
        return p;
    }
    else {
        getPortNum()
    }
}

module.exports = { getPortNum };