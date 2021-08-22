<%@page contentType="text/html; charset=UTF-8" %>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
    <meta charset="UTF-8">
    <title>重複チェッカー！</title>
    <link rel="stylesheet" href="./destyle.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <h1>重複チェッカー（仮）</h1>
    <div id="how-to-use">
        <h2>使用方法</h2>
        <p></p>
    </div>

    <div id="button-line">
        <button id="#start-btn" class="button-box" onclick="start()">
            <img src="./images/microphone.png" alt="録音開始ボタン">
            <p>録音開始</p>
        </button>

        <input class="button-box" type="file" id="text-file" name="files[]" multiple> 
        <!-- <div class="button-box">
            <img src="./images/input.png" alt="過去の会話を読み込むボタン">
            <p>過去の会話を読み込む</p>
        </div> -->
        <!-- <button class="button-box">
            <img src="./images/input.png" alt="過去の会話を読み込むボタン">
            <p>過去の会話を読み込む</p>
        </button> -->

        <button class="button-box" onclick="toText()">
            <img src="./images/output.png" alt="ファイルを書き出すボタン">
            <p>ファイルで書き出す</p>
        </button>

        
    </div>

    <div id="contents">
        <div class="tab">
            <div id="meeting-name">
                <input type="text" value="会議名：">
            </div>
            <div id="checker">
                <p>チェッカー</p>
            </div>
            <div id="log">
                <!-- <p>ログ</p> -->
            </div>
        </div>

        <div id="result-div" class="main-contents-area"></div>
        <div id="checker-text" class="checker-area"></div>
        <div class="log-area"></div>
    </div>
    <script src="main.js"></script>
</body>
</html>