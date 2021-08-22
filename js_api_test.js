// XMLHttpRequestオブジェクトの作成
var request = new XMLHttpRequest();

// URLを開く
request.open('GET', URL, true);

// レスポンスが返ってきた時の処理を記述 
request.onload = function () {
  // レスポンスが返ってきた時の処理
}

// リクエストをURLに送信
request.send();