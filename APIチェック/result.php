<?php
try {

    // curlの処理を始めるためのコネクションを開く
    $curl = curl_init();
    // 最大ページ数を指定
    $maxPage = 60;
    $url = "";

    $header = [];

    foreach ($_POST['header'] as $key => $value) {
        $param = $_POST['headerParam'][$key];
        $header[] = "{$value}: {$param}";
    }

    // HTTP通信のRequest-設定情報をSetする
    curl_setopt($curl, CURLOPT_URL, $_POST['url']);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $_POST['method']);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    // curl(HTTP通信)を実行後、レスポンスをjson形式で取得
    $response = curl_exec($curl);
    $result = json_decode($response, true);

    curl_close($curl);

    print('<pre>');
    print_r($result);
    print('</pre>');
    exit;


} catch (Exception $ex) {
    exit;
} finally {
    // 5. curlの処理を終了 => コネクションを切断
    curl_close($curl);
}

/**
 * DBに登録できる形式にdatetimeを変換
 */
function convDateTime ($input) {
    // 未入力の場合は「NULL」の文字列を返す(SQLにするため)
    if (empty($input)) {
        return 'NULL';
    }
    $date = new DateTime($input);
    return "'" . $date->format('Y-m-d H:i:s') . "'";
}