;(function ($){
  $.fn.carousel3d = function (options) {
    options = $.extend({
      interval: 4000,
      width: 400,
      zindex: 100,
      offset: {
        right: 20,
        bottom: 20
      },
    }, options)

    return this.each(function () {
      var $items = $('img', this)
        , scale = 1/$items.length
        , active = 0
        , interval = null

      function show(index) {
        for (var i = 0; i < $items.length; i++) {
          $items.eq((index + i) % $items.length).css({
            width: options.width * (1 - scale * i),
            left: (options.offset.right + options.width * scale) * i,
            bottom: options.offset.bottom * i,
            zIndex: options.zindex - i
          })
        }

        clearInterval(interval)
        interval = setInterval(next, options.interval)
      }

      function next() {
        show(++active)
      }

      function prev() {
        show(--active)
      }

      (new Hammer(this)).on('panleft panright', function(event) {
        if (event.isFinal && event.type == 'panleft') {
          next()
        }

        if (event.isFinal && event.type == 'panright') {
          prev()
        }
      })

      show(active)
    })
  }
})(jQuery)
