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
// let toTextFileArray = '';
let toTextFileArray = [];

recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
        // toTextFileArray += transcript;
        // toTextFileArray += ',';
        // console.log(toTextFileArray);
        toTextFileArray.push(transcript);
        finalTranscript += transcript += '<br>';
    } else {
        interimTranscript = transcript;
    }
    }
    resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';

}

function start(){

    recognition.start();
}

//JSON.stringify(inputTextFileArray)

function toTextFile(){

    // let blob = new Blob([toTextFileArray] ,{type:"text/plan"});
    let blob = new Blob([toTextFileArray] ,{type:"text/plan"});
    // let blob = new Blob(['よろしくお願いします\n最近はアボカドの種を捨てないで取っといて水耕栽培をしています\n育て始めて6ヶ月たってやっと歯が出てきました'],{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    let meeting_name = document.getElementById("meeting-title");
    link.download = meeting_name.value;
    link.click();

    // console.log(document.getElementById("result-div"));


}


const text = document.getElementById("text-file");
let inputTextFileArray = [];

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
        // text.value = reader.result;
        inputTextFileArray += reader.result;
        inputTextFileArray = inputTextFileArray.split(',');
        console.log(inputTextFileArray);
        console.log(inputTextFileArray2);
        console.log(inputTextFileArray.length);
    }
});

// setTimeout(textAdd, 40000);

function textAdd(){
    // ここに読み込みが完了したら実行したい処理を記述する
    var text1 = document.createElement("span");
    text1.innerHTML = "2回目：アボカドの種を捨てないで取っといて水耕栽培をしています";
    var x = document.getElementById("checker-text");
    x.style.color = 'red';
    x.appendChild(text1);
}


// for (let )