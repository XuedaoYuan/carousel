/**
 * Created by XuedaoYuan on 2017/6/29 上午11:47.
 */
(function (window, document) {

    window.xdyuanCarouselInit = function (obj) {
        /*obj = {
         effectiveDeltaX:80,
         invalidDeltaY: 80,
         interval : 5000
         };*/


        var width = $('body').width(),

            timerout = null,
            lis = $(obj.containerIdentify+' > ul > li'),
            len = lis.length,
            ul = $(obj.containerIdentify+' > ul'),
            translateVal = 0,
            index = 0,
            firstprev = true,
            deltaX = 0,
            deltaY = 0,
            startX = 0,
            startY = 0,
            xdyuan_container = $(obj.containerIdentify),
            indexObj = obj.indexObj;

        var ol = $('<ol></ol>');
        xdyuan_container.append(ol);
        ol.css({
            position: 'absolute',
            right: 0,
            bottom: '5px'
            // width : 20 * len + 'px'
        });
        for (var i = 0; i < len; i++) {
            var li = $('<li></li>').html(i);
            ol.append(li);
        }

        var olis = $(obj.containerIdentify+' > ol > li');



        if (indexObj) {
            if (indexObj.isCenter) {
                ol.css({
                    left: '50%',
                    bottom: indexObj.bottom + 'px',
                    //right: indexObj.right,
                    'margin-left': -ol.width() / 2 + 'px'
                });
            } else {
                ol.css({
                    bottom: indexObj.bottom + 'px',
                    right: indexObj.right + 'px'
                });
            }
            if (indexObj.backgroundColor) {
                olis.css('background-color', indexObj.backgroundColor);
                olis.eq(0).css('background-color' , indexObj.currentBackgroundColor);

            }

        } else {
           ol.remove();
        }

        xdyuan_container.css({
            'width': width,
            'height': obj.contaner_height + 'px'
        });
        $(obj.containerIdentify+' img').attr({
            width: width + 'px',
            height: obj.contaner_height + 'px'
        });

        lis.each(function (index, ele) {
            if (index == len - 1) {
                ele.style.left = -width + 'px';
                return;
            }
            ele.style.left = index * width + 'px';
        });


        var timer = setInterval(nextHandler, obj.interval);

        function nextHandler() {
            index = index + 1;
           // console.log(translateVal);
            if (firstprev) {
                firstprev = false;
            }
            translateVal -= width;
            ul.css('transform', 'translate3d(' + translateVal + 'px , 0px, 0px)');
            changeColor();
            console.log(index);
            // index = index + 1;

            index = (index == len) ? 0 : index;
            changeColor();
            var li = $('li').eq(index);
            li.css('left', -translateVal);

        }

        function prevHandler() {
            index = index - 1;
            if (firstprev) {
                index = len - 1;
                firstprev = false;
            }
            translateVal += width;
            ul.css('transform', 'translate3d(' + translateVal + 'px , 0px, 0px)');
            changeColor();
            console.log(index);
            // index = index - 1;
            index = (index <= -1) ? len - 1 : index;

            var li = $('li').eq(index);
            li.css('left', -translateVal);

        }
        function changeColor() {
            if(indexObj){
                olis.eq(index).css('background-color',indexObj.currentBackgroundColor).siblings().css('background-color',indexObj.backgroundColor);
            }
        }


        lis.on('touchstart', function (e) {
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;

        });
        lis.on('touchmove', handleMove);

        function handleMove(e) {
            deltaX = e.changedTouches[0].pageX - startX;
            deltaY = e.changedTouches[0].pageY - startY;
        }

        lis.on('touchend', function () {
            timerout = setTimeout(function () {
                clearTimeout(timerout);
                if (Math.abs(deltaX) >= obj.effectiveDeltaX && Math.abs(deltaY) < obj.invalidDeltaY) {
                    clearInterval(timer);
                    if (deltaX > 0) {
                        //右滑 prev
                        prevHandler();
                    } else if (deltaX < 0) {
                        nextHandler();
                    }
                    timer = setInterval(nextHandler, obj.interval);

                }
            }, 100);
        });


    }

})(window, document);
