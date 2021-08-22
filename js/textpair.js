'use strict'

const http = require('http');
const fs = require('fs');
const url = require('url');

const indexPage = fs.readFileSync('../index.html', 'UTF-8');
// const otherPage = fs.readFileSync('./html/other.html', 'UTF-8');
const styleCss = fs.readFileSync('../css/style.css', 'UTF-8');
const destyleCss = fs.readFileSync('../css/destyle.css', 'UTF-8');
const scriptJs = fs.readFileSync('main.js', 'UTF-8');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(RouteSetting);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function RouteSetting(req, res) {
  const url_parts = url.parse(req.url);
  switch (url_parts.pathname) {
    case '/':
    case '/index.html':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(indexPage);
      res.end();
      break;
  
    case '/css/style.css':
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(styleCss);
    res.end();
    break;

    case '/css/destyle.css':
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(destyleCss);
    res.end();
    break;

    case '/js/main.js':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(scriptJs);
      res.end();
      break;

    default:
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('お探しのページは見つかりません。');
      break;
  }
}