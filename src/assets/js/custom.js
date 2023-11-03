

$('.banner_slider .owl-carousel').owlCarousel({
  loop: true,
  margin: 0,
  nav: false,
  autoplay: true,
  autoplayTimeout:3000,
  dots:false,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
})

$('.case_slider .owl-carousel').owlCarousel({
  loop: true,
  margin: 60,
  nav: true,
  autoplay: true,
  autoplayTimeout:3000,
  dots:false,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 2
    }
  }
})
$('.testi_slider .owl-carousel').owlCarousel({
  loop: true,
  margin: 5,
  nav: true,
  autoplay: true,
  autoplayTimeout:3000,
  dots:false,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 1
    }
  }
})
$('.logo_cpy_sect .owl-carousel').owlCarousel({
  loop: true,
  margin: 30,
  nav: false,
  autoplay: true,
  autoplayTimeout:3000,
  dots:false,
  responsive: {
    0: {
      items: 2
    },
    600: {
      items: 3
    },
    1000: {
      items: 5
    }
  }
})



$.fn.jQuerySimpleCounter = function (options) {
  var settings = $.extend({
      start: 0,
      end: 100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options);

  var thisElement = $(this);

  $({ count: settings.start }).animate({ count: settings.end }, {
      duration: settings.duration,
      easing: settings.easing,
      step: function () {
          var mathCount = Math.ceil(this.count);
          thisElement.text(mathCount);
      },
      complete: settings.complete
  });
};


$('#number1').jQuerySimpleCounter({ end: 41, duration: 3000 });
$('#number2').jQuerySimpleCounter({ end: 150, duration: 3000 });
$('#number3').jQuerySimpleCounter({ end: 220, duration: 2000 });

