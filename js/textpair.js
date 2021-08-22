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
    
    axios(options)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
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


const axios = require(`axios`);
const APIKEY = `***REMOVED***`; //API KEY
const URL = `https://labs.goo.ne.jp/api/textpair`;
// const SENTECE = process.argv[2];
// const OUTPU_TYPE = `katakana`; //or `hiragana`

const options = {
    method: 'post',
    url: URL,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Type': `application/json`
    },
    data: {
        app_id: APIKEY,
        request_id: 'u22',
        text1: "僕は大人になったらペンギンを飼いたい",
        text2: "僕は大人になったらアザラシを飼いたい"
    }
};
