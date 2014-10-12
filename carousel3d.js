;(function ($){
  var Carousel3d = function (element, options) {
    this.$items = $('img', element)
    this.options = options
    this.scale = 1 / this.$items.length
    this.active = 0
    this.interval = null
    this.to(this.active)
  }

  Carousel3d.DEFAULTS = {
    interval: 5000,
    width: 400,
    zindex: 100,
    offset: {
      right: 20,
      bottom: 20
    }
  }

  Carousel3d.prototype.cycle = function () {
    this.interval && clearInterval(this.interval)
    this.interval = setInterval($.proxy(this.next, this), this.options.interval)
  }

  Carousel3d.prototype.to = function (index) {
    for (var i = 0; i < this.$items.length; i++) {
      this.$items.eq((index + i) % this.$items.length).css({
        width: this.options.width * (1 - this.scale * i),
        left: (this.options.offset.right + this.options.width * this.scale) * i,
        bottom: this.options.offset.bottom * i,
        zIndex: this.options.zindex - i
      })
    }

    this.cycle()
  }

  Carousel3d.prototype.next = function () {
    this.to(++this.active)
  }

  Carousel3d.prototype.prev = function () {
    this.to(--this.active)
  }

  $.fn.carousel3d = function (options) {
    return this.each(function () {
      var carousel3d = new Carousel3d(this, $.extend(Carousel3d.DEFAULTS, options))
      ;(new Hammer(this)).on('panleft panright', function(event) {
        if (event.isFinal && event.type == 'panleft') {
          carousel3d.next()
        }

        if (event.isFinal && event.type == 'panright') {
          carousel3d.prev()
        }
      })
    })
  }
})(jQuery)
