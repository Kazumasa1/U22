'use strict'

const startBtn = document.querySelector('#start-btn');
const resultDiv = document.querySelector('#result-div');

const meeting_status = document.getElementById('status');
const repeated_text = document.getElementById('repeated-text');
const recognition_btn_status = document.getElementById('recognition-btn');

let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();
let xhr = new XMLHttpRequest();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;



// APIに送信する文節の数の設定
// ↓ PHRASE_NUM = 5 の場合
// 文章,文章,文章,文章,文章
const PHRASE_NUM = 5;

// 読み込んだ過去の会議の文字列を格納する配列
let past_meeting_array = [];
// 'past_meeting_array'に格納した文字列にアクセスするid
let past_str_id = 0;

// 現在、音声入力で入力されている回数
let talk_count = 0;
// サーバーにAPIのリクエストした回数
let request_count = 0;

// サーバーにリスエストする文節を一時保管する文字列
let add_new_str = "";
// サーバーにAPIのリクエストする音声入力した新しい文節を格納する
let request_new_phrase = "";

// result-divに表示する文字列を格納する
let resultDiv_phrase = '';

// ファイルで書き出す文章を格納する配列
let export_textfile = [];


// 音声入力中の処理
recognition.onresult = (event) => {
    
    // 音声入力中にresult-divに表示する文字列を格納する
    let resultDiv_phrase_loading = '';


    for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;

        // 音声入力で会話の区切れがあるか？
        if (event.results[i].isFinal) {
            
            export_textfile += (transcript + ',');
            add_new_str += (transcript + ',');
            resultDiv_phrase += transcript += '<br>';

            // 現在、音声入力されている文節の数が'PHRASE_NUM'で設定された数に等しい or 多いか？
            if (talk_count >= PHRASE_NUM) {
                
                talk_count = 0;
                past_str_id = 0;
                request_count = 0;
                request_new_phrase = add_new_str;
                add_new_str = "";
                       
                // サーバーにリクエストする関数を呼び出す関数
                const requestAPI_inter = setInterval(() =>{

                    requestAPI();

                    // APIにリクエストした回数が過去の会議の文節の数と等しい or 多いか？
                    if (request_count >= past_meeting_array.length) {
                        
                        clearInterval(requestAPI_inter);
                    }
                },250);
            }else {

                talk_count++;
            }

        }else {

            resultDiv_phrase_loading = transcript;
        }
    }  

        // 認識した音声を'result-div'に表示　かつ　音声入力中の内容を灰色で表示する
        resultDiv.innerHTML 
            = resultDiv_phrase + '<i style=\"color:#ddd;\">' + resultDiv_phrase_loading + '</i>';   
}





// サーバーにAPIのリクエストを送信する関数
function requestAPI() {
    
    // APIで比較する文字列を格納する配列
    let json_to_textpair = [
        past_meeting_array[past_str_id] + ',',
        request_new_phrase
    ];
    
    // サーバーに送るAPIのリクエスト情報 
    xhr.open('POST', 'response');
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    xhr.send( json_to_textpair );

    xhr.onreadystatechange = function() {
     
        if(xhr.readyState === 4 && xhr.status === 200) {
     
            // サーバーからのレスポンスを格納する変数
            let respond_api_data = String(xhr.responseText);
            // 重複の発生からの経過間隔
            let status_count = 0;

            // 重複が発生しているか？
            if (respond_api_data == "bad_speech") {

                resultDiv.style.color = 'red';
                meeting_status.innerHTML = "状態：以下の内容が重複しました！！！";
                meeting_status.style.color = 'red';
                repeated_text.innerHTML = String(request_new_phrase).replace(/,/g,'<br>');
                // 重複が発生した状態を保持する間隔を設定する
                status_count = past_meeting_array.length - 1;

            } else {
                
                // 重複が発生してから'past_meeting_array.length - 1'単位経過したか？
                if (status_count <= 0) {
                    
                    resultDiv.style.color = 'black';
                    meeting_status.innerHTML = "状態：正常です";
                    meeting_status.style.color = 'black';
                    repeated_text.innerHTML = '';
                    status_count = 0;

                } else{

                    status_count--;

                }
            }
        }
    }
    past_str_id++;
    request_count++;
}





// 録音ボタンのステータス
let recognition_status = "off";
// 録音開始ボタンが押された時の関数
function start(){

    if (recognition_status == "off") {
        
        recognition_status = "on";
        recognition.start();
        recognition_btn_status.innerHTML = "録音停止";
    } else {
        
        recognition_status = "off";
        recognition.stop();
        recognition_btn_status.innerHTML = "録音開始";
    }
}





// ファイルで書き出すボタンがクリックされたときの処理
function exportTextFile(){

    let blob = new Blob([export_textfile] ,{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    let meeting_name = document.getElementById("meeting-title");
    link.download = meeting_name.value;
    link.click();

}





// ファイルを選択するフォームからファイルが読み込まれたときの処理
const text = document.getElementById("text-file");
//ダイアログでファイルが選択された時の関数
text.addEventListener("change", function (event) {
    
    let input_textfile = [];
    // sliceメソッドで開始するid
    let slice_st = 0;
    // sliceメソッドで終了するid
    let slice_ed = PHRASE_NUM;
    const file = event.target.files;
    
    //FileReaderの作成
    const reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
    
    //読込終了後の処理
    reader.onload = function () {
        
        input_textfile += reader.result;
        input_textfile = input_textfile.split(',');    
        
        // 読み込まれた文章の文節数が'PHRASE_NUM'で設定された数より少ない or 等しいか？
        if(input_textfile.length <=  PHRASE_NUM) {
            // 選択されたテキストファイルの文字列の数が比較文字数以下のときの処理

            // 読み込まれたテキストファイルをそのまま代入する
            past_meeting_array += input_textfile;

        }else {
            // 選択されたテキストファイルの文字列の数が比較文字数より多いときの処理

            // 読み込まれたテキストファイルの文章を'PHRASE_NUM'で割って文節に分けた数
            let past_meeting_array_len = Math.floor(input_textfile.length / PHRASE_NUM);

            // 読み込まれたテキストファイルの文節数回ループ
            for (let i = 0; i <=  past_meeting_array_len; i++) {
                
                past_meeting_array.push(input_textfile.slice(slice_st, slice_ed));
                slice_st = slice_ed;
                slice_ed += PHRASE_NUM;

            }
        }
    }
});