'use strict'

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

axios(options)
.then((res) => {
    console.log(res.data);
})
.catch((err) => {
    console.log(err);
});