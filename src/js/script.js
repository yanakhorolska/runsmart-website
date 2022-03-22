const slider = tns({
    container: '.carousel__inner',
    slideBy: 'page',
    autoplay: false,
    controls: false,
    speed: 1500,
    nav: false
});
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
  });

  (function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
      
      $('.catalog-item__link').each(function(i){
          $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          });
      });
      $('.catalog-item__back').each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });

          // modal

          $('[data-modal="consultation"]').on('click', function() {
            $('.overlay, #consultation').fadeIn('slow');
          });
          $('.modal__close').on('click', function() {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
          });
          // $('.button_mini').on('click', function() {
          //   $('.overlay, #order').fadeIn('slow');
          // });

          $('.button_mini').each(function(i) {
              $(this).on('click', function() {
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
                $('.overlay, #order').fadeIn('slow');
              });
          });

          // validation
          // $('#consultation form').validate({
          //   rules: {
          //     name: "required",
          //     email: {
          //       required: true,
          //       email: true
          //     },
          //     phone: "required"
          //   },
          //   messages: {
          //     name: "Пожалуйста, введите ваше имя",
          //     email: {
          //       required: "Пожалуйста, введите ваш e-mail",
          //       email: "Введите корректный email"
          //     },
          //     phone: "Пожалуйста, введите ваш номер телефона"
          //   }
          // });
          // $('#order form').validate({
          //   rules: {
          //     name: "required",
          //     email: {
          //       required: true,
          //       email: true
          //     },
          //     phone: "required"
          //   },
          //   messages: {
          //     name: "Пожалуйста, введите ваше имя",
          //     email: {
          //       required: "Пожалуйста, введите ваш e-mail",
          //       email: "Введите корректный email"
          //     },
          //     phone: "Пожалуйста, введите ваш номер телефона"
          //   }
          // });
          // $('#consultation-form').validate({
          //   rules: {
          //     name: "required",
          //     email: {
          //       required: true,
          //       email: true
          //     },
          //     phone: "required"
          //   },
          //   messages: {
          //     name: "Пожалуйста, введите ваше имя",
          //     email: {
          //       required: "Пожалуйста, введите ваш e-mail",
          //       email: "Введите корректный email"
          //     },
          //     phone: "Пожалуйста, введите ваш номер телефона"
          //   }
          // });
          
          // OPTIMIZATION VALIDATE

          function valideForm(form){
            $(form).validate({
              rules: {
                name: "required",
                email: {
                  required: true,
                  email: true
                },
                phone: "required"
              },
              messages: {
                name: "Пожалуйста, введите ваше имя",
                email: {
                  required: "Пожалуйста, введите ваш e-mail",
                  email: "Введите корректный email"
                },
                phone: "Пожалуйста, введите ваш номер телефона"
              }
        });
      }

      valideForm('#order form');
      valideForm('#consultation-form');
      valideForm('#consultation form');
     
      // mask for input phone
      $('input[name=phone]').mask("+48 999-999-999");

      // php mailer
      $('form').submit(function(e)  {
        // отменяет стандартное поведение браузера
        //  - перезагрузку страницы
        e.preventDefault();

        if(!$(this).valid()){
          return;
        }

        $.ajax({
          // method of sending
          type: "POST", 
          // where i want to sending
          url: "mailer/smart.php",
          // what i  want to sending
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");

          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');


          $('form').trigger('reset');
        });
        return false;
      });

      // smooth scroll and page up

      $(window).scroll(function() {
        if ($(this).scrollTop() > 1400) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      });

    });
    })(jQuery);