'use strict'

const http = require('http');
const fs = require('fs');
const url = require('url');

// global.document = new JSDOM(html).window.document;
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;


const indexPage = fs.readFileSync('../index.html', 'UTF-8');
// const otherPage = fs.readFileSync('./html/other.html', 'UTF-8');
const styleCss = fs.readFileSync('../css/style.css', 'UTF-8');
const destyleCss = fs.readFileSync('../css/destyle.css', 'UTF-8');
const scriptJs = fs.readFileSync('main.js', 'UTF-8');

const axios = require(`axios`);
const APIKEY = `***REMOVED***`; //API KEY
const URL = `https://labs.goo.ne.jp/api/textpair`;
// const SENTECE = process.argv[2];
// const OUTPU_TYPE = `katakana`; //or `hiragana`


// 読み込んだ過去の会議のテキストを格納
let old_meeting_text = "";
// 読み込んだ新しい会議のテキストを格納
let new_meeting_text = "";

// 類似度APIの値をmain.jsに返す値を格納
let respond_api = "";

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
    
    // options = {
    //     method: 'post',
    //     url: URL,
    //     headers: {
    //         'Content-Type': `application/x-www-form-urlencoded`,
    //         'Content-Type': `application/json`
    //     },
    //     data: {
    //         app_id: APIKEY,
    //         request_id: 'u22',
    //         text1: api_data,
    //         text2: "僕は大人になったらアザラシを飼いたい"
    //     }
    // };
    // axios(options).then((res) => {
    //     console.log(res.data);
    //     console.log(api_data);
    //     api_data = res.data;
        
    //     console.log(api_data);
    //     // api_data = String(api_data);
    //     // api_data = api_data.toString();
    //     api_data = JSON.stringify(api_data);
    //     console.log(api_data);
    // }).catch((err) => {
    //     // console.log(err);
    //     console.log('err');
    // });
    
    // axios(options_main).then((res) => {
        //     console.log(res.data);
        //     }).catch((err) => {
            //     // console.log(err);
            //     console.log('err');
            //     });
            axios(options).then((res) => {
                // console.log(api_data);
                console.log(res.data);
                // console.log('kontiwa');
                // console.log(api_data);
                // api_data = res.data;
                
                // console.log(api_data);
                // api_data = String(api_data);
                // api_data = api_data.toString();
                // api_data = JSON.stringify(api_data);
                // console.log(api_data);
            }).catch((err) => {
                // console.log(err);
                console.log('err');
            });
        });
        
        
        // axios(options).then((res) => {
            //     console.log(res.data);
            //     api_data = res.data;
            //     console.log('test');
            
            //     // api_data = JSON.parse(JSON.stringify(res.data));
            // }).catch((err) => {
                //     // console.log(err);
                //     console.log('err');
                // });
                
                function RouteSetting(req, res) {
                    
                    data = [];
                    
                    //POSTデータを受けとる
                    req.on('data', function(chunk) {data += chunk})
                    .on('end', function() {
                        
                        // data = new Set(data);
                        // Array.from(data);

                        
                        // data = JSON.stringify(data);
                        data = String(data);
                        data = data.split(',,');
                        console.log(data);
                        // data = JSON.parse(data);
                        // data = JSON.stringify(data);
                        console.log('data[0]');
                        console.log(data[0]);
                        console.log('data[1]');
                        console.log(data[1]);

                        old_meeting_text = data[0];
                        new_meeting_text = data[1];
                        // console.log(data["text1"]);
                        // console.log(data["text1"][0]);
                        // console.log('dodaro');
                        // console.log(data[4]);
                        // console.log(data[0][0]['text1']);
                        // console.log(api_data);
                        // res.end(data);
                        // api_data = data;
                        // console.log(api_data);
                        
                        // axios(options).then((res) => {
                        //     console.log(api_data);
                        //     console.log(res.data);
                        //     console.log('kontiwa');
                        //     // console.log(api_data);
                        //     // api_data = res.data;
                            
                        //     // console.log(api_data);
                        //     // api_data = String(api_data);
                        //     // api_data = api_data.toString();
                        //     // api_data = JSON.stringify(api_data);
                        //     // console.log(api_data);
                        // }).catch((err) => {
                        //     // console.log(err);
                        //     console.log('err');
                        // });

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
                            console.log(res.data);

                            respond_api = res.data;
                            // console.log(api_data);
                            // api_data = res.data;
                            
                            // console.log(api_data);
                            // api_data = String(api_data);
                            // api_data = api_data.toString();
                            // api_data = JSON.stringify(api_data);
                            // console.log(api_data);
                        }).catch((err) => {
                            // console.log(err);
                            console.log('err');
                        });


                    })
                    // if ( data = 'mode-1') {
                    //     console.log('mode-1_ok');
                    // }
                    
                    
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
                            // respond_api = String(respond_api);
                            respond_api = JSON.stringify(respond_api);
                            res.write(respond_api)
                            res.end();
                            // res.end('お探しのページは見つかりません。');
                            break;
                    }
                }


                                    
                                    
                                        
                                        
                                        // const textpair = function() {
                                            
                                            //     console.log('node');
                                            //     // axios(options)
                                            //     //     .then((res) => {
                                                //     //         console.log(res.data);
                                                //     //     })
                                                //     //     .catch((err) => {
                                                    //     //         console.log(err);
                                                    //     //     });
                                                    // }
                                                    
                                                    // const text = document.getElementById("text-file");
                                                    // let inputTextFileArray = [];
                                                    // let compTextArray = [];
                                                    // let TextArray_len = 0;
                                                    
                                                    // const COMP_TEXT_LEN = 5;
                                                    
                                                    // let slice_st = 0;
                                                    // let slice_ed = 0;
                                                    
                                                    // //ダイアログでファイルが選択された時
                                                    // text.addEventListener("change", function (event) {
                                                        
                                                        //     const file = event.target.files;
                                                        
                                                        //     //FileReaderの作成
                                                        //     const reader = new FileReader();
                                                        //     //テキスト形式で読み込む
                                                        //     reader.readAsText(file[0]);
                                                        
                                                        //     //読込終了後の処理
                                                        //     reader.onload = function () {
                                                            //         //テキストエリアに表示する
                                                            //         // text.value = reader.result;
                                                            //         inputTextFileArray += reader.result;
                                                            //         inputTextFileArray = inputTextFileArray.split(',');
                                                            //         TextArray_len = inputTextFileArray.length;
                                                            
                                                            
                                                            //         if(TextArray_len <=  COMP_TEXT_LEN) {
                                                                //             // 選択されたテキストファイルの文字列の数が比較文字数以下のときの処理
                                                                //             slice_ed = TextArray_len;
                                                                //             compTextArray += inputTextFileArray.slice(slice_st, slice_ed);
                                                                //             console.log(compTextArray);
                                                                //             console.log('true');
                                                                //         }else {
                                                                    //             // 選択されたテキストファイルの文字列の数が比較文字数より多いときの処理
                                                                    //             slice_ed = COMP_TEXT_LEN;
                                                                    //             let itijiArray = [];
                                                                    
                                                                    //             let compTextArray_len = Math.floor(TextArray_len / COMP_TEXT_LEN);
                                                                    //             for (let i = 0; i <=  compTextArray_len; i++) {
                                                                        
                                                                        //                 // compTextArray.push(inputTextFileArray.slice(slice_st, slice_ed));
                                                                        //                 itijiArray += inputTextFileArray.slice(slice_st, slice_ed);
                                                                        //                 compTextArray.push(itijiArray);
                                                                        //                 slice_st = slice_ed;
                                                                        //                 slice_ed += COMP_TEXT_LEN;
                                                                        //             }
                                                                        //             console.log('false');
                                                                        //         }
                                                                        //         console.log(compTextArray);
                                                                        //         console.log(compTextArray[1]);
                                                                        //     }
                                                                        // });
                                                                        
                                                                        