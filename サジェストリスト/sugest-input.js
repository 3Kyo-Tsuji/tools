function suggestGenerate(input) {
    // サジェスト用のロストを作成
    document.getElementById(input).insertAdjacentHTML('afterend', '<ul id="suggest-list-' + input + '" class="suggest-list"></ul>');

    // テキスト入力があった際の挙動
    document.getElementById(input).addEventListener("input", (e) => {
        // 動的にフォームを作成し非同期のPHPでデータを取得
        const fd = new FormData();
        fd.append('q', e.target.value);
        const param = {
            method: "POST",
            body: fd
        }
        // 非同期でタグを取得
        fetch("search.php", param)
            .then((response) => response.json())
            .then((json) => {
                const suggestBox = document.getElementById('suggest-list-' + input);
                suggestBox.innerHTML = '';
                // 取得した内容をリストに追加
                for (const suggest of json) {
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
            });
    });

    // タグ設定
    document.getElementById(input).addEventListener("keypress", (e) => {
        const id = '#suggest-list-' + input;
        // Enterキーで発火
        if (e.key === "Enter") {
            // selectされているリストの文字列をインプットにセット
            e.target.value = document.querySelector(id + ' .selected').textContent;
            // サジェストリストをクリア
            document.querySelector(id).innerHTML = '';
        }
    });

    // 方向キーが押された際の挙動
    document.getElementById(input).addEventListener("keyup", (e) => {
        const id = '#suggest-list-' + input;
        // 下キー
        if (e.key === "ArrowDown") {
            // 未選択の場合、サジェストリストにカーソル
            if (document.querySelector(id + ' .selected') === null) {
                if (document.querySelector(id + ' li') !== null) {
                    document.querySelector(id + ' li').classList.add('selected');
                }
            } else {
                const list = document.querySelectorAll(id + ' li');
                let selectFlg = false;
                for (let i = 0; i < list.length; i++) {
                    // selectedクラスがあればremove
                    if (list[i].classList.contains('selected')) {
                        if (i !== list.length - 1) {
                            list[i].classList.remove('selected');
                            selectFlg = true;
                        }
                    } else {
                        if (selectFlg) {
                            list[i].classList.add('selected');
                            selectFlg = false;
                        }
                    }
                }
            }
        // 上キー
        } else if (e.key === "ArrowUp") {
            const list = document.querySelectorAll(id + ' li');
            let selectFlg = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i].classList.contains('selected') && i !== 0) {
                    list[i].classList.remove('selected');
                    list[i - 1].classList.add('selected');
                }
            }
        }
    });


}

