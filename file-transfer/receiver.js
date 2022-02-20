const net = require("net");
const fs = require("fs");
const remote_server = process.argv[2];
const socket = remote_server ? net.connect(3001, remote_server) : net.connect(3001);

let ostream = fs.createWriteStream("./receiver/lab4.pdf");
let date = new Date();
let size = 0;
let elapsed;

socket.on('data', chunk => {
  size += chunk.length;
  elapsed = new Date() - date;
  socket.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB of data was sent. Total elapsed time is ${elapsed / 1000}s`)
  process.stdout.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB of data was sent. Total elapsed time is ${elapsed / 1000}s`);
  ostream.write(chunk);
});
socket.on("end", () => {
  console.log(`\nFinished getting file. speed was: ${((size / (1024 * 1024)) / (elapsed / 1000)).toFixed(2)} MB/s`);
  process.exit();
});