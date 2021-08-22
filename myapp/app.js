'use strict'

const axios = require(`axios`);
const APIKEY = `3fc105ef737703a488c43d4f400cf29027ca05cb4843fe06114f403e67fa3bdc`; //API KEY
const BASE_URL = `https://labs.goo.ne.jp/api/hiragana`;
const SENTECE = process.argv[2];
const OUTPU_TYPE = `katakana`; //or `hiragana`

const options = {
    method: 'post',
    url: BASE_URL,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Type': `application/json`
    },
    data: {
        app_id: APIKEY,
        sentence: SENTECE,
        output_type: OUTPU_TYPE
    }
};

axios(options)
.then((res) => {
    console.log(res.data);
})
.catch((err) => {
    console.log(err);
});