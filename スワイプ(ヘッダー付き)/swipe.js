// スワイプのみ
function swipe(id) {
    let maxWidth = window.innerWidth;

    let startX = 0;
    let endX = 0;
    let distX = 40;
    let touchType = '';
    let scrollX = 0;
    let length = 0;

    document.getElementById(id).classList.add('swipe');
    document.getElementById(id).parentNode.style.overflowX = 'hidden';
    const children = document.getElementById(id).children;
    length = children.length;
    children[0].classList.add('active');

    // 番組表部の最大幅を設定
    document.getElementById(id).style.minWidth = (maxWidth * length) + 'px';
    for (let i = 0; i < length; i++) {
        // 最大幅を設定
        children[i].style.maxWidth = maxWidth + 'px';
    }

    // スワイプはじめ
    document.getElementById(id).addEventListener('touchstart', (e) => {
        e.stopPropagation();
        startX = e.touches[0].pageX;
        document.getElementById(id).classList.add('scroll-stop');
    })

    // スワイプ中
    document.getElementById(id).addEventListener('touchmove', (e) => {
        // スワイプの距離を算出
        endX = e.changedTouches[0].pageX - startX;
        // 番組欄を移動
        document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + (scrollX + endX) + 'px, 0px, 0px)';
    })

    // スワイプ終了
    document.getElementById(id).addEventListener('touchend', (e) => {
        // スワイプされた方向を取得
        if (endX < -distX) {
            touchType = 'left';
            e.preventDefault();
        } else if (distX < endX) {
            touchType = 'right';
            e.preventDefault();
        } else {
            touchType = '';
            e.preventDefault();
        }

        document.getElementById(id).classList.remove('scroll-stop');

        // アクティブ要素のキー番号を取得
        const active = searchActive();
        // 両端もしくは動きの小さい場合
        if (touchType === "right" && active === 0 || touchType === "left" && active === (length - 1) || touchType === "") {
            scrollX = maxWidth * active * -1;
            document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + scrollX + 'px, 0px, 0px)';
            document.getElementById(id).style['-webkit-transition'] = '-webkit-transform 0.2s ease-out';
            document.addEventListener('webkitTransitionEnd', function (event) {
                event.target.style['-webkit-transition'] = null;
            })
            reset();
        } else if (touchType === "left") {
            // 左へスワイプ
            children[active].classList.remove('active');
            children[active + 1].classList.add('active');
            scrollX = maxWidth * (active + 1) * -1;
            document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + scrollX + 'px, 0px, 0px)';
            document.getElementById(id).style['-webkit-transition'] = '-webkit-transform 0.2s ease-out';
            document.addEventListener('webkitTransitionEnd', function (event) {
                event.target.style['-webkit-transition'] = null;
            })
            reset();
        } else if (touchType === "right") {
            // 右へスワイプ
            children[active].classList.remove('active');
            children[active - 1].classList.add('active');
            scrollX = maxWidth * (active - 1) * -1;
            document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + scrollX + 'px, 0px, 0px)';
            document.getElementById(id).style['-webkit-transition'] = '-webkit-transform 0.2s ease-out';
            document.addEventListener('webkitTransitionEnd', function (event) {
                event.target.style['-webkit-transition'] = null;
            })
            reset();
        }
    })

    // 現状アクティブの要素のキー番号を返す
    function searchActive() {
        for (let i = 0; i < length; i++) {
            if (children[i].classList.contains('active')) {
                return i;
            }
        }
    }

    function reset() {
        startX = 0;
        endX = 0;
        touchType = '';
    }
}

// 同時にヘッダーの印も動かす場合
function swipeWithHeader(id, headerId) {
    const header = document.getElementById(headerId);
    header.classList.add('swipe-header');
    header.children[0].insertAdjacentHTML('beforeend', '<div class="swipe-label"></div>');

    let maxWidth = window.innerWidth;

    let startX = 0;
    let endX = 0;
    let distX = 40;
    let touchType = '';
    let scrollX = 0;
    let length = 0;
    // ヘッダーの印の移動速度
    const headerSpeed = 20;

    document.getElementById(id).classList.add('swipe');
    document.getElementById(id).parentNode.style.overflowX = 'hidden';
    const children = document.getElementById(id).children;
    length = children.length;
    children[0].classList.add('active');

    if (children.length !== header.children.length) {
        console.error("ヘッダーと内容の数が違います");
    }

    // 番組表部の最大幅を設定
    document.getElementById(id).style.minWidth = (maxWidth * length) + 'px';
    for (let i = 0; i < length; i++) {
        // 最大幅を設定
        children[i].style.maxWidth = maxWidth + 'px';
    }

    // スワイプはじめ
    document.getElementById(id).addEventListener('touchstart', (e) => {
        e.stopPropagation();
        startX = e.touches[0].pageX;
        document.getElementById(id).classList.add('scroll-stop');
    })

    // スワイプ中
    document.getElementById(id).addEventListener('touchmove', (e) => {
        // スワイプの距離を算出
        endX = e.changedTouches[0].pageX - startX;
        // 要素を動かす
        document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + (scrollX + endX) + 'px, 0px, 0px)';
        document.getElementsByClassName('swipe-label')[0].style['-webkit-transform'] = 'translate3d(' + -(endX / headerSpeed) + 'px, 0px, 0px)';
    })

    // スワイプ終了
    document.getElementById(id).addEventListener('touchend', (e) => {
        // スワイプされた方向を取得
        if (endX < -distX) {
            touchType = 'left';
            // e.preventDefault();
        } else if (distX < endX) {
            touchType = 'right';
            // e.preventDefault();
        } else {
            touchType = '';
            e.preventDefault();
        }

        document.getElementById(id).classList.remove('scroll-stop');

        // アクティブ要素のキー番号を取得
        const active = searchActive();
        // 両端もしくは動きの小さい場合
        if (touchType === "right" && active === 0 || touchType === "left" && active === (length - 1) || touchType === "") {
            scrollX = maxWidth * active * -1;
            document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + scrollX + 'px, 0px, 0px)';
            document.getElementById(id).style['-webkit-transition'] = '-webkit-transform 0.2s ease-out';
            document.addEventListener('webkitTransitionEnd', function (event) {
                event.target.style['-webkit-transition'] = null;
            })
            reset();
        } else if (touchType === "left") {
            // 左へスワイプ
            children[active].classList.remove('active');
            const target = active + 1;
            children[target].classList.add('active');
            setHeaderActive(target);
            scrollX = maxWidth * target * -1;
            document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + scrollX + 'px, 0px, 0px)';
            document.getElementById(id).style['-webkit-transition'] = '-webkit-transform 0.2s ease-out';
            document.addEventListener('webkitTransitionEnd', function (event) {
                event.target.style['-webkit-transition'] = null;
            })
            reset();
        } else if (touchType === "right") {
            // 右へスワイプ
            children[active].classList.remove('active');
            const target = active - 1;
            children[target].classList.add('active');
            setHeaderActive(target);
            scrollX = maxWidth * target * -1;
            document.getElementById(id).style['-webkit-transform'] = 'translate3d(' + scrollX + 'px, 0px, 0px)';
            document.getElementById(id).style['-webkit-transition'] = '-webkit-transform 0.2s ease-out';
            document.addEventListener('webkitTransitionEnd', function (event) {
                event.target.style['-webkit-transition'] = null;
            })
            reset();
        }

        // スワイプ先のヘッダーに印をつけなおす
        function setHeaderActive(target) {
            const headerChildren = document.getElementById(headerId).children;
            for (const headerNav of headerChildren) {
                if (headerNav.getElementsByClassName('swipe-label')[0] !== undefined) {
                    headerNav.getElementsByClassName('swipe-label')[0].remove();
                }
            }
            headerChildren[target].insertAdjacentHTML('beforeend', '<div class="swipe-label"></div>');
        }
    })

    // 現状アクティブの要素のキー番号を返す
    function searchActive() {
        for (let i = 0; i < length; i++) {
            if (children[i].classList.contains('active')) {
                return i;
            }
        }
    }

    function reset() {
        startX = 0;
        endX = 0;
        touchType = '';
    }
}
