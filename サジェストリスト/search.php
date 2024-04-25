<?php
if ($_POST["q"]) {
    // $user = 'DB_USER';
    // $password = 'DB_PASSWORD';
    // $db = 'DB_NAME';
    // $host = 'DB_HOST';
    // $pdo = new PDO("mysql:host={$host};dbname={$db};charset=utf8", $user, $password);

    try {
        $query = $_POST["q"];
        // パラメータが来なければ空を返す
        if ($query == "") {
            echo json_encode([]);
        } else {
            // // タグを入力内容でLIKE検索(前方一致)
            // $sql = "SELECT tag FROM jbr_program WHERE tag LIKE '%{$query}%'";
            // $stmt = $pdo->prepare($sql);
            // $stmt->execute();
            // $result = $stmt->fetchAll(PDO::FETCH_COLUMN);

            $array = ['apple', 'banana', 'orange', 'melon'];

            $result = preg_grep("/{$_POST['q']}/", $array);

            // jsonに変換して返す
            echo json_encode(array_unique($result));
        }
    } catch (PDOException $e) {
        echo json_encode([]);
    }
} else {
    echo json_encode([]);
}