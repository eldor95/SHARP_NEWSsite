(function($) {
  'use strict';  
    /*---------------------------------
        Preloader JS
    -----------------------------------*/ 
      var prealoaderOption = $(window);
      prealoaderOption.on("load", function () {
          var preloader = jQuery('.lodar');
          var preloaderArea = jQuery('.preloader_area');
          preloader.fadeOut();
          preloaderArea.delay(350).fadeOut('slow');
      });
    /*---------------------------------
        Preloader JS
    -----------------------------------*/

    /*---------------------------------  
        sticky header JS
    -----------------------------------*/
    $(window).on('scroll',function() {    
        var scroll = $(window).scrollTop();
         if (scroll < 100) {
          $(".seomun_header").removeClass("sticky");
         }else{
          $(".seomun_header").addClass("sticky");
         }
    }); 
    /*---------------------------------  
        sticky header JS
    -----------------------------------*/
    /*---------------------------------  
        Meanmenu JS
    -----------------------------------*/ 
    $('.seomun_menu nav').meanmenu({
      meanMenuContainer: '.mobile_menu',
      meanScreenWidth: "991"
    });
    /*---------------------------------  
        Meanmenu JS
    -----------------------------------*/
    /*--------------------
      nav search js
    -------------------*/ 
    $("a.search_icon").on('click', function() {
      $(".soemun_search_form").toggle();
      return false;
    }); 
    /*---------------------- 
        owl carousel js
    ------------------------*/
    $('.testimonial_slide').slick({
      dots: true,
      infinite: false,
      autoplay: false,
      arrows: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            arrows: false,
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
          }
        }
      ]
    });
    $('.work_slide').slick({
      dots: false,
      infinite: true,
      autoplay: true,
      arrows: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 960,
          settings: {
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.blog_slide').slick({
      dots: true,
      infinite: true,
      autoplay: true,
      arrows: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 767,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.company_slide').slick({
      dots: false,
      infinite: true,
      autoplay: true,
      arrows: true,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.product_slide').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      dots: false,
      asNavFor: '.product_thumb_slide'
    });
    $('.product_thumb_slide').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.product_slide',
      dots: false,
      focusOnSelect: true
    });
    /*---------------------- 
        owl carousel js
    ------------------------*/  
    /*----------------------
        Counter js
    ------------------------*/
    $('.counter').counterUp({
        delay: 100,
        time: 4000
    });
    /*----------------------
        Counter js
    ------------------------*/
    /*---------------------- 
        magnific-Popup js
    ----------------------*/
    $('.play_btn').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    $('.video_btn').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    $('.image_gallery').magnificPopup({
      type:'image',
      gallery:{
        enabled:true
      }
    });
    /*---------------------- 
        magnific-Popup js
    ----------------------*/
    /*---------------------- 
        Isotope js
    ------------------------*/ 
    $('#portfolio').imagesLoaded( function() {
      var $grid = $('.grid_area').isotope({
        itemSelector: '.single_item',
        percentPosition: true,
        masonry: {
          columnWidth: 1
        }
      });
    });
    $('#seomun_works').imagesLoaded( function() {
        var $grid = $('.grid').isotope({
            itemSelector: '.work_item',
            layoutMode: 'fitRows'
        })
        $('.works_button').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({filter: filterValue});
        });
        $('.works_button').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.btn_active').removeClass('btn_active');
                $(this).addClass('btn_active');
            });
        });
    });
    /*---------------------- 
        Isotope js
    ------------------------*/
    
    /*---------------------- 
        wow js
    ------------------------*/
      new WOW().init();
    /*---------------------- 
        wow js
    ------------------------*/

    /*---------------------- 
        nice_number js
    ------------------------*/
      $(function(){
        $('input[type="number"]').niceNumber();
      });
    /*---------------------- 
        nice_number js
    ------------------------*/
    /*---------------------- 
        easypiechart js
    ------------------------*/
      $('.chart_1').easyPieChart({
        size: 160,
        easing: 'easeOutBounce',
        barColor: '#ffa61b',
        scaleColor: false,
        lineCap: 'circle',
        lineWidth: 4,
        trackColor: '#113044',
        animate: 2000
      });
      $('.chart_2').easyPieChart({
        size: 120,
        easing: 'easeOutBounce',
        barColor: '#ffa61b',
        scaleColor: false,
        lineCap: 'circle',
        lineWidth: 4,
        trackColor: '#eeefff',
        animate: 2000
      });
    /*---------------------- 
        easypiechart js
    ------------------------*/
    /*---------------------- 
        sidebar js
    ------------------------*/
    $.sidebarMenu($('.sidebar-menu'))
    $('.sidebar_btn').on('click', function (event) {
      $('.animate-menu-left').toggleClass('animate-menu-open')
    })
    /*---------------------- 
        sidebar js
    ------------------------*/
})(window.jQuery);   