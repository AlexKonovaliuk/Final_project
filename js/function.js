//gallery
$(document).ready(function () {
    var $li = $('.gallery__list').find('> li'),
        $links = $li.find('> a'),
        $lightbox = $('.gallery__lightbox'),
        $next = $('.next'),
        $prev = $('.prev'),
        $overlay = $('.gallery__overlay'),
        liIndex,
        targetImg;

//preload img
    var imgSources = [
        'img/image01.jpg',
        'img/image02.jpg',
        'img/image03.jpg',
        'img/image04.jpg',
        'img/image05.jpg',
        'img/image06.JPG',
        'img/image07.jpg',
        'img/image08.jpg',
        'img/image09.jpg',
        'img/image10.jpg',
        'img/image11.jpg',
        'img/image12.jpg',
        'img/image13.jpg',
        'img/image14.jpg',
        'img/image14.jpg',
        'img/image15.JPG',
        'img/image16.jpg',
        'img/image17.jpg',
        'img/image18.jpg',
        'img/image19.jpg',
        'img/image20.jpg',
        'img/image21.jpg',
        'img/image22.jpg',
        'img/image23.jpg',
        'img/image24.JPG',
        'img/image25.jpg',
        'img/image26.jpg',
        'img/image27.jpg',
        'img/image28.jpg',
        'img/image29.jpg',
        'img/image30.jpg'
    ];

    var imgs = [];
    for (var i = 0; i < imgSources.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = imgSources[i];
    }

    function replaceImg(src) {
        $lightbox.find('img').attr('src', src);
    }

    function getHref(index) {
        return $li.eq(index).find('>a').attr('href');
    }

    function closeLigtbox() {
        $lightbox.fadeOut();
    }

    $overlay.click(closeLigtbox);

    $links.click(function(e) {
        e.preventDefault();
        targetImg = $(this).attr('href');
        liIndex = $(this).parent().index();
        replaceImg(targetImg);
        $lightbox.fadeIn();
    });

    $next.click( function() {
        if ( (liIndex + 1) < $li.length ) {
            targetImg = getHref(liIndex + 1);
            liIndex ++;
        } else {
            targetImg = getHref(0);
            liIndex = 0;
        }
        replaceImg(targetImg);
    });

    $prev.click( function() {
        if ( (liIndex) > 0 ) {
            targetImg = getHref(liIndex - 1);
            liIndex --;
        } else {
            targetImg = getHref($li.length - 1);
            liIndex = $li.length - 1;
        }
        replaceImg(targetImg);
    });
});



//rereser
(function () {
    var tableNumber,
        dateReserve,
        timeReserve,
        peopleReserve,
        nameReserve,
        phoneReserve,
        wishesReserve,
        arrayReserved = [];


//show table number
    $('.table__input').click(function () {
        tableNumber = $(this).val();
        $(".selected__table-input").val(tableNumber);
    });

    $('.label__table').click(function () {
        if($(this).hasClass('booked'))
            $(".selected__table-input").val('Стол занят');
    });



    $('.reserve__form').submit(function takeVal() {
        console.log("ff");

        dateReserve = $('.date__reserve').val();
        timeReserve = $('.time__reserve').val();
        peopleReserve = $('.people__reserve').val();
        nameReserve = $('.reserve__name').val();
        phoneReserve = $('.reserve__phone').val();
        wishesReserve = $('.reserve__wishes').val();

        var tableDateTime = {table : tableNumber, date : dateReserve, timee : timeReserve};


        console.log(tableDateTime);

        if (localStorage.getItem('arrayReserved')) {
            arrayReserved = JSON.parse(localStorage.getItem('arrayReserved'));
        }

        var checkParam = function () {
            var allOkay = true;
            for (var j = 0; j < arrayReserved.length; j++){
                if (tableDateTime.table == arrayReserved[j].table){
                    if (tableDateTime.date == arrayReserved[j].date) {
                        if (tableDateTime.timee == arrayReserved[j].timee ) {
                            console.log(tableDateTime.timee);
                            console.log(arrayReserved[j].timee);
                            allOkay = false;
                        }
                    }
                }
            }
            if (allOkay) {
                return true;
            } else {
                return false;
            }
        }

        if (checkParam()) {
            arrayReserved.push(tableDateTime);
            localStorage.setItem('arrayReserved', JSON.stringify(arrayReserved));
        } else {
            alert('Этот стол занят на выбранную дату ' + dateReserve + ', выберите, пожалуйста, другой стол.');
            return false;
        }
    });


})();
