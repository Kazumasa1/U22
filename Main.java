package api;

public class Main {
	public static void main(String[] args) {
        // 比較される文字列 text1
        String text1 = "僕は大人になったらペンギンを飼いたい";
        // 比較する文字列 text2
        String text2 = "僕は大人になったらアザラシを飼いたい";
		// 送信先URL
        String strPostUrl = "https://labs.goo.ne.jp/api/textpair";
        // テキストペアへ渡すJSON文字列
        //  String JSON = "{\"app_id\":\"4aa76f88af4589c65864b283bacd69bd7cc7c0c897ea4416b9890d819b453795\", \"request_id\":\"u22\", \"text1\":\"高橋さんはアメリカに出張に行きました。\", \"text2\":\"山田さんはイギリスに留学している。\"}"; 
         String JSON = "{\"app_id\":\"4aa76f88af4589c65864b283bacd69bd7cc7c0c897ea4416b9890d819b453795\", \"request_id\":\"u22\", \"text1\":\"" + text1 + "\", \"text2\":\"" + text2 + "\"}"; 
        // テキストペアへ
         TextPair TextPairSendJSON = new TextPair();
        String result = TextPairSendJSON.callPost(strPostUrl, JSON);
        // 結果の表示
        System.out.println(result);
	}
}
