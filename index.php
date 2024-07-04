<?php
$all = glob('*');
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tools一覧</title>
    <link rel="stylesheet" href="reset.css">
    <style>
        h1 {
            text-align: center;
            background: #333;
            color: #fff;
            font-size: 1.8rem;
            padding: 1rem 0;
        }

        a {
            text-decoration: none;
            color: #fff;
        }

        ul {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr))
        }

        li {
            text-align: center;
            background: #333;
            margin: 1rem;
            border-radius: 0.5rem;
            list-style: none;
        }

        li a {
            display: block;
            padding: 1rem;
        }

        li a:hover {
            background: #777;
            border-radius: 0.5rem;
        }

        @media screen and (max-width: 768px) {
            ul {
                display: flex;
                flex-direction: column;
            }
        }
    </style>
</head>

<body>
    <div>
        <h1>Tools</h1>
        <ul>
            <?php
            foreach ($all as $key => $value) {
                if (is_dir($value)) {
                    echo "<li><a href='{$value}'>{$value}</a></li>";
                }
            }
            ?>
        </ul>
    </div>

</body>

</html>