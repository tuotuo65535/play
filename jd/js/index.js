window.onload = function () {
    search();
    banner();
    downTime();
}

//搜索
var search = function () {
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var top = document.body.scrollTop; /*谷歌*/
        var opacity = 0;
        if (top > height) {
            opacity = 0.85;
        } else {
            opacity = 0.85 * (top/height);
        }
        search.style.background = 'rgba(216,80,92,' + opacity + ')';
    }
}

//轮播图
var banner = function () {
    /*大容器*/
    var banner  = document.querySelector('.jd_banner');
    /*轮播图宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');
    
    /*过渡*/
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransform = 'all 0.2s';
    }
    
    /*清除过渡*/
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransform = 'none';
    }

    /*位移*/
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX +'px)'; //移当前屏幕的宽度
        imageBox.style.webkitTransform = 'translateX(' + translateX +'px)'; //移当前屏幕的宽度
    }

    /*无缝滚动*/
    var index = 1;
    var timer = setInterval(function () {
        index ++;
        addTransition();
        setTranslateX(-index*width);
    }, 3000);
    imageBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index*width);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        setPoint();
    });

    /*点盒子对应改变*/
    var setPoint = function () {
        /*index 1-8*/
        for (var i=0; i<points.length; i++) {
            points[i].classList.remove('now');
        }
        points[index-1].classList.add('now');
    }

    /*滑动*/
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart', function (e) {
        /*记录开始的位置*/
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        /*清除定时器*/
        clearInterval(timer);
        /*计算滑动位移，并给图片设定样式*/
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = -index*width + distanceX;
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend', function (e) {
        /*判断吸附还是切换图片，如果大于1/3,则切换，否则吸附*/
        if (isMove) {
            if (Math.abs(distanceX) < width/3) {
                addTransition();
                setTranslateX(-index*width);
            } else {
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                addTransition();
                setTranslateX(-index*width);
            }
        }

        clearInterval(time);
        timer = setInterval(function () {
            index ++;
            addTransition();
            setTranslateX(-index*width);
        }, 3000);
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
}

//倒计时
var downTime = function () {

}