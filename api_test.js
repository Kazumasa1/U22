const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: '6qSBPhfVNU7Q-4_u3yg1dbYruo9IUWafo6IuyLWwiFxR',
  }),
  serviceUrl: 'https://api.jp-tok.speech-to-text.watson.cloud.ibm.com/instances/59117c1c-fab4-43b6-9803-ad4fe6e3ca62',
});

const getModelParams = {
  modelId: 'ja-JP_BroadbandModel',
};

speechToText.getModel(getModelParams)
  .then(speechModel => {
    console.log(JSON.stringify(speechModel, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });





// <script type="text/javascript">
//   var speech_count = 0;
//   document.getElementById("start_recognition").onclick = function vr_function() {
//     var result_text = document.getElementById('result_text');
//     while (result_text.firstChild) {
//       result_text.removeChild(result_text.firstChild);
//     }
//     SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = 'ja';
//     recognition.interimResults = true;
//     recognition.continuous = true;
//     recognition.onresult = function(event) {
//       var results = event.results;
//       if (document.getElementById('interim_result') == null) {
//         var interim = document.createElement('d' + 'iv');
//         interim.setAttribute('class', 'results');
//         interim.setAttribute('id', 'interim_result');
//         document.getElementById('result_text').appendChild(interim);
//       }
//       for (var i = event.resultIndex; i < results.length; i++) {
//         if (results[i].isFinal) {
//           speech_count++;
//           result_line = "<font size='4'>" + results[i][0].transcript + "</font>";
//           document.getElementById('interim_result').innerHTML = result_line;
//           document.getElementById('interim_result').setAttribute('id', 'result' + speech_count);
//           document.getElementById('search_param').setAttribute('value', results[i][0].transcript);
//           document.googleform.submit();
//           document.getElementById('status').innerHTML = "status: searched!";
//           recognition.stop();
//           return;
//         } else {
//           document.getElementById('interim_result').innerHTML = "<font size='4' color='gray'>" + results[i][0].transcript + "</font>";
//           flag_speech = 1;
//         }
//       }
//     }
//     document.getElementById('status').innerHTML = "status: recording...";
//     recognition.start();
//   }
// </script>

// <!DOCTYPE html>
// <html>
//   <head>
//   <!-- <script>
//     const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
//     const { IamAuthenticator } = require('ibm-watson/auth');

//     const speechToText = new SpeechToTextV1({
//       authenticator: new IamAuthenticator({
//         apikey: '6qSBPhfVNU7Q-4_u3yg1dbYruo9IUWafo6IuyLWwiFxR',
//       }),
//       serviceUrl: 'https://api.jp-tok.speech-to-text.watson.cloud.ibm.com/instances/59117c1c-fab4-43b6-9803-ad4fe6e3ca62',
//     });

//     const getModelParams = {
//       modelId: 'en-US_BroadbandModel',
//     };

//     speechToText.getModel(getModelParams)
//       .then(speechModel => {
//         console.log(JSON.stringify(speechModel, null, 2));
//       })
//       .catch(err => {
//         console.log('error:', err);
//       });
//   </script> -->
//   </head>
//   <body>
//     <div>

//         <!-- <button　id="start_recognition">start</button> -->
//         <input type="submit" id="start_recognition" value="start">
//         <input type="submit" id="stop_recognition" value="stop">
//         <!-- <button>stop</button> -->
//     </div>
//     <div style="height: 80px;">
//       <div style="border:1px solid #000;" id="result_text"></div>
//     </div>

//     <form name="googleform" target="newtab" action="http://www.google.co.jp/search" method="GET" style="display:none;">
//       <input type="hidden" name="hl" value="ja">
//       <!-- <input type="hidden" name="q" id="search_param" maxLength="255" size="30"> -->
//     </form>
//     <!-- <div style="border:1px solid #000;"> -->
//       <!-- <div id="result_text"></div> -->
//       <!-- <input type="submit" id="start_recognition" value="音声入力でGoogle検索開始！" style="color:#000; background-color:#ff9b00cf;"> -->
//     <!-- </div> -->
//     <br>
//     <div id="status">
// status: stop
// </div>

// <script type="text/javascript">
//   var speech_count = 0;
//   document.getElementById("start_recognition").onclick = function vr_function() {
//     var result_text = document.getElementById('result_text');
//     while (result_text.firstChild) {
//       result_text.removeChild(result_text.firstChild);
//     }
//     SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = 'ja';
//     recognition.interimResults = true;
//     recognition.continuous = true;
//     recognition.onresult = function(event) {
//       var results = event.results;
//       if (document.getElementById('interim_result') == null) {
//         var interim = document.createElement('d' + 'iv');
//         interim.setAttribute('class', 'results');
//         interim.setAttribute('id', 'interim_result');
//         document.getElementById('result_text').appendChild(interim);
//       }
//       for (var i = event.resultIndex; i < results.length; i++) {
//         if (results[i].isFinal) {
//           speech_count++;
//           result_line = "<font size='4'>" + results[i][0].transcript + "</font>";
//           document.getElementById('interim_result').innerHTML = result_line;
//           document.getElementById('interim_result').setAttribute('id', 'result' + speech_count);
//           document.getElementById('search_param').setAttribute('value', results[i][0].transcript);
//           document.googleform.submit();
//           document.getElementById('status').innerHTML = "status: searched!";
//           recognition.stop();
//           return;
//         } else {
//           document.getElementById('interim_result').innerHTML = "<font size='4' color='gray'>" + results[i][0].transcript + "</font>";
//           flag_speech = 1;
//         }
//       }
//     }
//     document.getElementById('status').innerHTML = "status: recording...";
//     recognition.start();
//   }
//   document.getElementById("stop_recognition").onclick = function vr2_function() {

//     recognition.stop();
//     document.getElementById('status').innerHTML = "status: recording...";
//     // recognition.start();
//   }
// </script>
//   </body>
// </html>