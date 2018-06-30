(function ($) {

    'use strict';
  
    var ph = {
      /**
       * Init Function
       */
      init: function () {
        ph.menu();
        ph.slickSlider();
        ph.partners();
        ph.news();
        ph.formValidate();
        ph.form();
      },

      menu: function() {
        // when opening the sidebar
        $('.navbar-toggler').on('click', function () {
          if ($(window).width() < 992) {
            $('body').addClass('open-menu');
            // open sidebar
            $('.navbar-wrap').addClass('active');
            // fade in the overlay
            $('.overlay').fadeIn();
          }
        });
        // if dismiss or overlay was clicked
        $('.navbar-toggler__x, .overlay').on('click', function () {
            $('body').removeClass('open-menu');
          // hide the sidebar
          $('.navbar-wrap').removeClass('active');
          // fade out the overlay
          $('.overlay').fadeOut();
        });
        if ($('.navbar-toggler').length) {
            $(window).on('resize', function () {
              if ($(window).width() >= 992) {
                $('body').removeClass('open-menu');
                $('.overlay').fadeOut();
                $('.navbar-wrap').removeClass('active');
              }
            });
          }
    },

    slickSlider: function() {
        $('.testimonials__slider').slick({
            slidesToShow: 1,
            slidesToSlide: 1,
            arrows: false,
            dots: true
        });
    },

    partners: function() {
        $.get("http://kitan.pl/pb/data/logos.json")
        .done(function(data) {
            var paLogo = data.logos;
            var paLength = paLogo.length;
            for (var y = 0; y < paLength; y++) {
                var partner = $('.partners__img')[y];
                var partnerId = partner.getAttribute('id');
                var paSrc = paLogo[y].src.x1;
                var paAlt = paLogo[y].alt;
                $('#' + partnerId).attr('src', paSrc);
                $('#' + partnerId).attr('alt', paAlt);
            }
        });
    },

    news: function() {
        $.get("http://kitan.pl/pb/data/news.json")
        .done(function(data) {
        var newsLength = data.length -1;
        for (var z = 0; z < newsLength; z++) {
            var newsTitle = data[z].title;
            var newsImg = data[z].image.x1;
            var newsAuthor = data[z].author;
            var newsDate = data[z].date_timestamp;
            var time = new Date(newsDate *1000);
            var newsText = data[z].description;
            if (newsText.length > 200) {
                newsText = newsText.substring(0,200) + "...";
            }
            var thisBox = $('.box')[z];
            var thisBoxId = thisBox.getAttribute('id');
            $('#'+thisBoxId +'> .box-header').text(newsTitle);
            $('#'+thisBoxId + '> .img > img').attr('src', newsImg);
            $('#'+thisBoxId + '>.sign > .author > span').text(newsAuthor);
            $('#'+thisBoxId + '>.sign > .date > time').text(time);
            $('#'+thisBoxId + '> p').text(newsText);
        };
        });
    },

    formValidate: function() {
        $('.form__wrap').validate();
    },

    form: function() {
        $('.form__wrap').on('submit', function(e){
            e.preventDefault();
            $.get("http://kitan.pl/pb/data/api.php", $('.form').serialize());
        });
    }
}

  
    $(function() {
     ph.init();
    })
  
  })(jQuery);
