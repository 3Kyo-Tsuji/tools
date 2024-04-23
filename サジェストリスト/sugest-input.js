function suggestGenerate(input) {
    // サジェスト用のロストを作成
    document.getElementById(input).insertAdjacentHTML('afterend', '<ul id="suggest-list-' + input + '" class="suggest-list"></ul>');

    // テキスト入力があった際の挙動 ※JSの場合
    document.getElementById(input).addEventListener("input", (e) => {
        const word = e.target.value;
        const list = [
            'apple',
            'banana',
            'orange',
            'melon'
        ];

        const suggestBox = document.getElementById('suggest-list-' + input);
        suggestBox.innerHTML = '';
        for (const suggest of list) {
            if (word !== '' && 0 <= suggest.indexOf(word)) {
                let li = document.createElement('li');
                // サジェストされたアイテムをクリックした際の挙動
                li.onclick = function () {
                    document.getElementById(input).value = suggest;
                    suggestBox.innerHTML = '';
                }
                let txt = document.createTextNode(suggest);
                li.appendChild(txt);
                suggestBox.appendChild(li);
            }
        }
    });

    // // テキスト入力があった際の挙動 ※PHPも使用する場合
    // document.getElementById(input).addEventListener("input", (e) => {
    //     // 動的にフォームを作成し非同期のPHPでデータを取得
    //     const fd = new FormData();
    //     fd.append('q', e.target.value);
    //     const param = {
    //         method: "POST",
    //         body: fd
    //     }
    //     // 非同期でタグを取得
    //     fetch("tagSearch.php", param)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             const suggestBox = document.getElementById('suggest-list-' + input);
    //             suggestBox.innerHTML = '';
    //             // 取得した内容をリストに追加
    //             for (const suggest of json) {
    //                 let li = document.createElement('li');
    //                 // サジェストされたアイテムをクリックした際の挙動
    //                 li.onclick = function () {
    //                     document.getElementById(input).value = suggest;
    //                     suggestBox.innerHTML = '';
    //                 }
    //                 let txt = document.createTextNode(suggest);
    //                 li.appendChild(txt);
    //                 suggestBox.appendChild(li);
    //             }
    //         });
    // });
}

