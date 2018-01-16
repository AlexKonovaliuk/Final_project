//slider
$(document).ready(function() {
 $(".slider").each(function() {

 var repeats = Infinity, // кількість повторювань автоматичного прокручування
 interval = 6, // інтервал в секундах
 repeat = true, // чи треба автоматично прокручувати (true/false)
 slider = $(this),
 repeatCount = 0,
 elements = $(slider).find(".slider__item").length;

 $(slider)
 .append("<div class='slider__nav'></div>")
 .find(".slider__item").each(function() {
 $(slider).find(".slider__nav").append("<span data-slide='"+$(this).index()+"'></span>");
 $(this).attr("data-slide", $(this).index());
 })
 .end()
 .find("span").first().addClass("on");

 // add timeout

 if (repeat) {
 repeat = setInterval(function() {
 if (repeatCount >= repeats - 1) {
 window.clearInterval(repeat);
 }

 var index = $(slider).find('.on').data("slide"),
 nextIndex = index + 1 < elements ? index + 1 : 0;

 sliderJS(nextIndex, slider);

 repeatCount += 1;
 }, interval * 1000);
 }

 });
 });

function sliderJS(index, slider) { // slide
 var ul = $(slider).find(".slider__list"),
 bl = $(slider).find(".slider__item[data-slide=" + index + "]"),
 step = $(bl).width();

 $(slider)
 .find("span").removeClass("on")
 .end()
 .find("span[data-slide=" + index + "]").addClass("on");

 $(ul).animate({
 marginLeft: "-" + step * index
 }, 500);
}

$(document).on("click", ".slider .slider__nav span", function(e) { // slider click slider__navigate
 e.preventDefault();
 var slider = $(this).closest(".slider"),
 index = $(this).data("slide");

 sliderJS(index, slider);
});

//sticky
$(function(){
    $(window).scroll(function() {
        if($(this).scrollTop() >= 380) {
            $('.header__nav').addClass('sticky');
            $('body').css("padding-top", "40px");
        }
        else{
            $('.header__nav').removeClass('sticky');
            $('body').css("padding-top", "0px");
        }
    });
});

//lang switch
$('.lang__select').click(function(){
    $(this).toggleClass('open');
})

$('.lang__select li').click(function(){
    var setLang = $('.lang__select').data('location'),
        dataLangSelect = $(this).data('lang')
    $('.lang__select').data('location', dataLangSelect);
    $('.lang__select li').removeClass('active');
    $(this).toggleClass('active');
})

//mobile menu
$(document).ready(function($){
    /* prepend nav__mob */
    $('.header__nav').prepend('<div class="nav__mob fa fa-bars"><span>Menu</span></div>');

    /* toggle nav */
    $(".nav__mob").on("click", function(){
        $('.nav__list').addClass("hidden__link");
        $('.nav__list').addClass("hidden__sublink");
        $('.nav__list').slideToggle();
        $(this).toggleClass("mob__active");
    });

});

$(document).mouseup(function (e) {
    var container = $('.hidden__link');
    if (container.has(e.target).length === 0){
        container.slideUp(400);
    }
});

$('.hidden').click(function(){
    $('.hidden__link').slideUp(400);
});
$('.list__sublink').click(function(){
    $('.hidden__sublink').slideUp(400);
});



//slow scroll menu
$(document).ready(function(){
    $(".header__nav").on("click","a", function (event) { //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();  //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),  //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top - 100;  //анимируем переход на расстояние - top за 500 мс
        $('body,html').animate({scrollTop: top}, 1000);
    });
});


//slow scroll arrow up
$(document).ready(function(){
    // появление/затухание кнопки .arrow up
    $(function (){
        // прячем кнопку .arrow
        $(".arrow").hide();
        $(window).scroll(function (){
            if ($(this).scrollTop() > 400){
                $(".arrow").fadeIn();
            } else{
                $(".arrow").fadeOut();
            }
        });
        // при клике на ссылку плавно поднимаемся вверх
        $(".arrow a").click(function (){
            $("body,html").animate({
                scrollTop:0
            }, 1000);
            return false;
        });
    });
});

//spoiler slow up/down
// $(document).ready(function(){
//     $('.events__input').click(function(){
//         $(this).parent().children('.events__text').slideToggle(500);
//         return false;
//     });
// });
//
// $(document).ready(function(){
//     $('.menu__type').click(function(){
//         $(this).parent().children('.menu__text').slideToggle(800);
//         return false;
//     });
// });

//sharing
Share = {
    facebook: function() {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        Share.popup(url);
    },
    twitter: function() {
        url  = 'http://twitter.com/share?';
        Share.popup(url);
    },
    instagram: function() {
        url  = 'http://instagram.com/###?ref=badge';
        Share.popup(url)
    },

    popup: function(url) {
        window.open(url,'','toolbar=0,satus=0t,width=700,height=600');
    }
};


// modal header
$(document).ready(function() {
    $('.booking__link').click( function(event){
        event.preventDefault();
        $('.modal__overlay').fadeIn(400,
            function(){
                $('.header__modal')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200);
            });
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('.modal__close, .modal__overlay').click( function(){
        $('.header__modal')
            .animate({opacity: 0, top: '45%'}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('.modal__overlay').fadeOut(400);
                }
            );
    });
});

// modal footer
$(document).ready(function() {
    $('.contact__map').click( function(event){
        event.preventDefault();
        $('.modal__overlay').fadeIn(400,
            function(){
                $('.contact__modal')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200);
            });
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('.modal__close, .modal__overlay').click( function(){
        $('.contact__modal')
            .animate({opacity: 0, top: '45%'}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('.modal__overlay').fadeOut(400);
                }
            );
    });
});
