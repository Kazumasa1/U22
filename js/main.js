'use strict'

const startBtn = document.querySelector('#start-btn');
// const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');

let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();
var xhr = new XMLHttpRequest();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = '';
// let toTextFileArray = '';
let toTextFileArray = [];
let new_meeting_text_array = [];

const COMP_TEXT_LEN = 5;

let compTextArray = [];

let talk_count = 0;

let old_text_num = 0;
let new_text_num = 0;

let post_count = 0;


// let json_to_textpair = [
//         compTextArray[old_text_num] + ',',
//         new_meeting_text_array[new_text_num] + ','
//     ];

recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    // console.log("load");
    if (event.results[i].isFinal) {
        talk_count++;
        toTextFileArray += transcript;
        toTextFileArray += ',';
        // console.log(toTextFileArray);
        // console.log(toTextFileArray[0]);
        finalTranscript += transcript += '<br>';
        // console.log(talk_count);
        
        if (talk_count >= COMP_TEXT_LEN) {
            talk_count = 0;
            old_text_num = 0;
            post_count = 0;
            new_meeting_text_array.push(toTextFileArray);
            // console.log("compTextArray:"+compTextArray.length);
            // console.log(new_meeting_text_array[0]);
            // for (let j = 0; j < Number(compTextArray.length); j++){
            // // for (let j = compTextArray.length; j < 0; j--){
                
            //     setInterval(postForm,250);
            //     // postForm();
            //     // console.log(old_text_num);
            //     old_text_num++;

                const postFormInter = setInterval(() =>{
                    postForm();
                    if (post_count >= compTextArray.length) {
                        clearInterval(postFormInter);
                    }
                },250);
            // }
            // new_text_num++;
            // console.log("if-test");
            // console.log(compTextArray.length);
        }
        // console.log("test");
        
        } else {
            interimTranscript = transcript;
        }
    }  
    resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';

}

// function admain() {
//     for (var i = 0; i < 2; i++) {
//       var httpObj = new XMLHttpRequest(); //この行を変更
//       httpObj.onreadystatechange = function () {
//         if (httpObj.readyState == 4) {
//           if (httpObj.status == 200) {
//            //複数回実行される
//           }
//         }
//       }
  
//       httpObj.open("get", "xmlhandler.ashx?id="+id[i], true);
//       httpObj.send(json_to_textpair);
//       break;
//     }
//   }

async function postForm() {
    
    let json_to_textpair = [
        compTextArray[old_text_num] + ',',
        new_meeting_text_array[new_text_num] + ','
    ];
    
     
    xhr.open('POST', 'response');
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    
    
    xhr.send( json_to_textpair );
    
    xhr.onreadystatechange = function() {
     
        if(xhr.readyState === 4 && xhr.status === 200) {
     
            // console.log( xhr.responseText );
            console.log( xhr.response );

            
        }
    }
    old_text_num++;
    post_count++;
}

// const postForm = value => {
//     let json_to_textpair = [
//         compTextArray[old_text_num] + ',',
//         new_meeting_text_array[new_text_num] + ','
//     ];
    
     
//     xhr.open('POST', 'response');
//     xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    

//     xhr.send( json_to_textpair );
    
//     xhr.onreadystatechange = function() {
     
//         if(xhr.readyState === 4 && xhr.status === 200) {
     
//             // console.log( xhr.responseText );
//             console.log( xhr.response );
          
//         }
//     }


// };

// postForm(); 

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
        // text.value = reader.result;
        inputTextFileArray += reader.result;
        inputTextFileArray = inputTextFileArray.split(',');
        TextArray_len = inputTextFileArray.length;
        
        
        if(TextArray_len <=  COMP_TEXT_LEN) {
            // 選択されたテキストファイルの文字列の数が比較文字数以下のときの処理
            slice_ed = TextArray_len;
            compTextArray += inputTextFileArray.slice(slice_st, slice_ed);
            // console.log(compTextArray);
            // console.log('true');
            // postForm();
        }else {
            // 選択されたテキストファイルの文字列の数が比較文字数より多いときの処理
            slice_ed = COMP_TEXT_LEN;
            let itijiArray = [];
            
            let compTextArray_len = Math.floor(TextArray_len / COMP_TEXT_LEN);
            for (let i = 0; i <=  compTextArray_len; i++) {
                
                itijiArray = [];
                // compTextArray.push(inputTextFileArray.slice(slice_st, slice_ed));
                itijiArray += inputTextFileArray.slice(slice_st, slice_ed);
                compTextArray.push(itijiArray);
                slice_st = slice_ed;
                slice_ed += COMP_TEXT_LEN;
            }
            // console.log(compTextArray);
            // console.log('false');
            // postForm();
        }
    }
});


function textAdd(){
    // ここに読み込みが完了したら実行したい処理を記述する
    var text1 = document.createElement("span");
    text1.innerHTML = "2回目：アボカドの種を捨てないで取っといて水耕栽培をしています";
    var x = document.getElementById("checker-text");
    x.style.color = 'red';
    x.appendChild(text1);
}


(function(){
    const log = console.log;
    console.log = function(...args){
      log(...args);
      const li = document.createElement('li');
      li.innerText = args[0];
      document.getElementById('out').appendChild(li);
    }
  })()