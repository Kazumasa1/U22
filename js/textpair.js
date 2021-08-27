'use strict'

const http = require('http');
const fs = require('fs');
const url = require('url');


const indexPage = fs.readFileSync('../index.html', 'UTF-8');
const styleCss = fs.readFileSync('../css/style.css', 'UTF-8');
const destyleCss = fs.readFileSync('../css/destyle.css', 'UTF-8');
const scriptJs = fs.readFileSync('main.js', 'UTF-8');

const axios = require(`axios`);
const APIKEY = `4aa76f88af4589c65864b283bacd69bd7cc7c0c897ea4416b9890d819b453795`; //API KEY
const URL = `https://labs.goo.ne.jp/api/textpair`;


// 読み込んだ過去の会議のテキストを格納
let old_meeting_text = "";
// 読み込んだ新しい会議のテキストを格納
let new_meeting_text = "";

// 類似度APIの値をmain.jsに返す値を格納
let respond_api = [];

let respond_api_max;

let respond_api_judge = "";

let options = {
    method: 'post',
    url: URL,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Type': `application/json`
    },
    data: {
        app_id: APIKEY,
        request_id: 'u22',
        text1: old_meeting_text,
        text2: new_meeting_text
    }
};

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(RouteSetting);
let data = [];

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    respond_api = [];
});

        

function RouteSetting(req, res) {
    
    data = [];
    
    //POSTデータを受けとる
    req.on('data', function(chunk) {data += chunk})
    .on('end', function() {
        
        data = String(data);
        data = data.split(',,');

        old_meeting_text = data[0];
        new_meeting_text = data[1];

        options = {
            method: 'post',
            url: URL,
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'Content-Type': `application/json`
            },
            data: {
                app_id: APIKEY,
                request_id: 'u22',
                text1: old_meeting_text,
                text2: new_meeting_text
            }
        };

        axios(options).then((res) => {

            respond_api.push(Number(res.data['score']));
            respond_api_max = respond_api.reduce(function(a, b) {
                return Math.max(a, b);
            });

            if (0.7 < respond_api_max) {
                respond_api = [];
                respond_api_judge = "bad_speech";
            } else {
                respond_api = [];
                respond_api_judge = "good_speech";
            }

        }).catch((err) => {
            // console.log(err);
            // console.log('err');
        });
    }
    
    )
    
    const url_parts = url.parse(req.url);
    switch (url_parts.pathname) {
        case '/':
        case '/index.html':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(indexPage);
            res.end();
            break;

        case '/images/microphone.png':
            res.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});
            let image = fs.readFileSync("../images/microphone.png", "binary");
            res.end(image, "binary");
            break;

        case '/images/output.png':
            res.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});
            let image2 = fs.readFileSync("../images/output.png", "binary");
            res.end(image2, "binary");
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
            console.log(respond_api_judge);
            res.write(String(respond_api_judge));
            res.end();
            break;
    }


}