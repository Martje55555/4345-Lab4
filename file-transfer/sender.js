const net = require("net");
const fs = require("fs");

let server, istream = fs.createReadStream("./sender/lab4.pdf");

server = net.createServer(socket => {
    socket.pipe(process.stdout);
    istream.on("readable", function () {
        let data;
        while (data = this.read()) {
            socket.write(data);
        }
    })
    istream.on("end", function(){
        socket.end();
    })
    socket.on("end", () => {
        server.close(() => { console.log("\nTransfer is done!") });
    })
})

server.listen(3001, '0.0.0.0');

