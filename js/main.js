'use strict'

const startBtn = document.querySelector('#start-btn');
const resultDiv = document.querySelector('#result-div');

const meeting_status = document.getElementById('status');
const repeated_text = document.getElementById('repeated-text');
const recognition_btn_status = document.getElementById('recognition-btn');

let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();
var xhr = new XMLHttpRequest();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

let recognition_status = "off";

let finalTranscript = '';
let toTextFileArray = [];
let new_meeting_text_array = [];

const COMP_TEXT_LEN = 5;

let compTextArray = [];

let talk_count = 0;

let old_text_num = 0;

let post_count = 0;

let toAPI_text = [];

let status_count = 0;

let str_repeated_text = "";


recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
            
            toTextFileArray += transcript;
            toTextFileArray += ',';
            toAPI_text += (transcript + ',');
            finalTranscript += transcript += '<br>';
            
            if (talk_count >= COMP_TEXT_LEN) {
                
                talk_count = 0;
                old_text_num = 0;
                post_count = 0;
                new_meeting_text_array[0] = toAPI_text;
                toAPI_text = [];
                       
                const postFormInter = setInterval(() =>{
                    postForm();
                    if (post_count >= compTextArray.length) {
                        clearInterval(postFormInter);
                    }
                },250);
            }else {
                talk_count++;
            }

        }else {
            interimTranscript = transcript;
        }
    }  

        resultDiv.innerHTML = finalTranscript + '<i style=\"color:#ddd;\">' + interimTranscript + '</i>';
    
}

function postForm() {
    
    let json_to_textpair = [
        compTextArray[old_text_num] + ',',
        new_meeting_text_array
    ];
    
     
    xhr.open('POST', 'response');
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    
    
    xhr.send( json_to_textpair );
    
    xhr.onreadystatechange = function() {
     
        if(xhr.readyState === 4 && xhr.status === 200) {
     
            let respond_api_data = String(xhr.responseText);
            

            if (respond_api_data == "bad_speech") {
                resultDiv.style.color = 'red';
                meeting_status.innerHTML = "状態：以下の内容が重複しました！！！";
                meeting_status.style.color = 'red';
                repeated_text.innerHTML = String(new_meeting_text_array).replace(/,/g,'<br>');

                status_count = compTextArray.length - 1;        
            } else {
                
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
    old_text_num++;
    post_count++;
}

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

function toTextFile(){

    let blob = new Blob([toTextFileArray] ,{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    let meeting_name = document.getElementById("meeting-title");
    link.download = meeting_name.value;
    link.click();


}


const text = document.getElementById("text-file");
let inputTextFileArray = [];
let TextArray_len = 0;


let slice_st = 0;
let slice_ed = 0;

//ダイアログでファイルが選択された時
text.addEventListener("change", function (event) {

    
    
    const file = event.target.files;
    
    //FileReaderの作成
    const reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
    
    //読込終了後の処理
    reader.onload = function () {
        //テキストエリアに表示する
        inputTextFileArray += reader.result;
        inputTextFileArray = inputTextFileArray.split(',');
        TextArray_len = inputTextFileArray.length;
        
        
        if(TextArray_len <=  COMP_TEXT_LEN) {
            // 選択されたテキストファイルの文字列の数が比較文字数以下のときの処理
            slice_ed = TextArray_len;
            compTextArray += inputTextFileArray.slice(slice_st, slice_ed);
        }else {
            // 選択されたテキストファイルの文字列の数が比較文字数より多いときの処理
            slice_ed = COMP_TEXT_LEN;
            let itijiArray = [];
            
            let compTextArray_len = Math.floor(TextArray_len / COMP_TEXT_LEN);
            for (let i = 0; i <=  compTextArray_len; i++) {
                
                itijiArray = [];
                itijiArray += inputTextFileArray.slice(slice_st, slice_ed);
                compTextArray.push(itijiArray);
                slice_st = slice_ed;
                slice_ed += COMP_TEXT_LEN;
            }
        }
    }
});