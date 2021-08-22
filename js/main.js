'use strict'

const startBtn = document.querySelector('#start-btn');
// const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');

let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = '';

recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
        finalTranscript += transcript += '<br>';
        console.log(transcript);
    } else {
        interimTranscript = transcript;
    }
    }
    resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';
}

var input_text_file = document.getElementById("text-file");

//ダイアログでファイルが選択された時
input_text_file.addEventListener("change",function(evt){

  var file = evt.target.files;

  //FileReaderの作成
  var reader = new FileReader();
  //テキスト形式で読み込む
  reader.readAsText(file[0]);
  
  //読込終了後の処理
  reader.onload = function(ev){
    //テキストエリアに表示する
    document.test.txt.value = reader.result;
  }
},false);

function start(){

    recognition.start();
}

function toText(){

    let blob = new Blob(['よろしくお願いします\n最近はアボカドの種を捨てないで取っといて水耕栽培をしています\n育て始めて6ヶ月たってやっと歯が出てきました'],{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '2021-07-17:新メニュー会議.txt';
    link.click();
}


// const sample = document.getElementById("sample");
// const text = document.getElementById("text")

// //ダイアログでファイルが選択された時
// sample.addEventListener("change", function (event) {

//     const file = event.target.files;

//     //FileReaderの作成
//     const reader = new FileReader();
//     //テキスト形式で読み込む
//     reader.readAsText(file[0]);

//     //読込終了後の処理
//     reader.onload = function () {
//         //テキストエリアに表示する
//         text.value = reader.result;
//     }
// });

// setTimeout(textAdd, 40000);

function textAdd(){
    // ここに読み込みが完了したら実行したい処理を記述する
    var text1 = document.createElement("span");
    text1.innerHTML = "2回目：アボカドの種を捨てないで取っといて水耕栽培をしています";
    var x = document.getElementById("checker-text");
    x.style.color = 'red';
    x.appendChild(text1);
}
