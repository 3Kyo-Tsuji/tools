<?php
echo '入力された値：' . $_POST['password'] . '<br>';
$hash = 'Hashされた値：' .password_hash($_POST['password'], PASSWORD_DEFAULT);
echo $hash;
