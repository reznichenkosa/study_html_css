
document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.slider', {
        loop: false
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
          .eq($(this).index()).addClass('catalog__content_active');
    }); 
    
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault()
                $(".catalog-item__content").eq(i).toggleClass('catalog-item__content_active');
                $(".catalog-item__list").eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $(document).on('keyup', function(e) {
        if ( e.key == "Escape" ) {
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        }
    });

    $('[data-modal=order]').on('click', function() {
        $('[data-modal=order]').each(function(i) {
            $(this).on('click', function() {
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            }); 
        });
        $('.overlay, #order').fadeIn('slow');
        
    });

    $('[data-modal=consultation]').on('click', function() { 
        $('.overlay, #consultation').fadeIn('slow');
    }); 

    function validateForm(form) {
        $(form).validate({
            rules: {
              name: "required",
              email: {
                required: true,
                email: true
              },
              phone: "required",
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                email: {
                  required: "Введите свой email адрес",
                  email: "Ваш адрес должен иметь формат name@domain.com"
                },
                phone: "Пожалуйста, введите свой номер телефона",
            }
        });
    }

    validateForm('#order .feed-form');
    validateForm('#consultation .feed-form');
    validateForm('#consultation form');

    //scroll page up

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    function scrollSmooth(arg) {
        $(`a[href*="#${arg}"]`).click(function() {
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });
    }
    scrollSmooth('up');
    scrollSmooth('catalog');
});

    