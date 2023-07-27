const http = require('http');
const fs = require('fs')
const url = require('url');

function reqLogger(req, res, next) {
  const {method, url, headers} = req
  console.log(`${method} ${url} - IP: ${req.socket.remoteAddress}`)
  next();
}

const server = http.createServer((req, res) => {

   const page = url.parse(req.url).pathname;

   reqLogger(req, res, () => {
    if (page === "/") {
     res.writeHead(200, { 'Content-Type': 'text/plain' });
     res.end('Hello Node.js!');
    } else if (page === "/file") {
     fs.readFile('data.txt', function (err, data) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    })
  } else if (page === "/api/user") {
   res.writeHead(200, {
    'Content-Type': 'application/json'
   });
    const user = {
     name: "Kira Kosarin",
     email: "kirakos@gmail.com",
     age: 25
    }
    res.end(JSON.stringify(user));
  } else {
   res.writeHead(404, { 'Content-Type': 'text/plain' });
   res.end('Not Found');
 }
 })
})


const PORT = 3000

server.listen(PORT, () => 
 console.log(`Server running on port ${PORT}`
))
