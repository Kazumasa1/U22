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
// let respond_api = "";

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
        console.log(data);
        console.log(data.length);

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
            // console.log(api_data);
            // console.log(res.data);

            // respond_api = res.data;
            // console.log(api_data);
            // api_data = res.data;
            
            // console.log(api_data);
            // api_data = String(api_data);
            // api_data = api_data.toString();
            // respond_api = JSON.stringify(respond_api);

            console.log(res.data);
            // console.log(res.data['score']);

            // respond_api[respond_api_array_num] = res.data['score'];

            // respond_api = res.data['score'];
            // respond_api += res.data['score'] + ',';
            respond_api.push(Number(res.data['score']));
            console.log(respond_api);
            respond_api_max = respond_api.reduce(function(a, b) {
                return Math.max(a, b);
            });
            console.log(respond_api_max);
            if (0.7 < respond_api_max) {
                respond_api = [];
                respond_api_judge = "bad_speech";
                console.log("!!!!!");
            } else {
                respond_api = [];
                respond_api_judge = "good_speech";
                console.log("(-_-)");
            }

            // respond_api_array_num++;

            // respond_api += res.data['score'] + ',';
        }).catch((err) => {
            // console.log(err);
            console.log('err');
            // respond_api = [];
        });
    })
    
    
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
            // console.log(res.data);
            res.end();
            break;
            
        default:
            res.writeHead(200, {'Content-Type': 'text/plain'});
            
            // respond_api = JSON.stringify(respond_api);
            // console.log(respond_api);
            // respond_api = String(respond_api);
            // console.log(respond_api);
            res.write(String(respond_api_judge));
            // res.write();
            // res.write(String(res.data));
            // res.write(String(res.data));
            // res.write(String(res.data));
            // res.write(respond_api)
            res.end();
            // res.end('お探しのページは見つかりません。');
            // respond_api = "";
            break;
        }
}