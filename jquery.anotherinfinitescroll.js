(function($) {
  $.fn.infinitescroll = function(options) {
    return $(this).each(function() {      
      var settings = $.extend({
          lookahead: 400,
          container: $(document)
        }, options);
        
      var _this = $(this);
      var req = null;
      var nextLink = $(settings.next);
      
      if (!settings.callback) {
        settings.callback = function(data) {
          if (data.worked) {
            _this.append(data.html);
            if (data.has_more) {
              nextLink.attr('href', data.next_url);
            } else {
              $(window).unbind('scroll');
              nextLink.remove();
            }
          }
        };
      }

      $(window).scroll(function(e) {
        if (req && req.readyState < 4 && req.readyState > 0) {
          return;
        }

        var containerScrollTop = settings.container.scrollTop() || $(settings.container.get().ownerDocument.body).scrollTop();
        var distanceToBottom = $(document).height() - (containerScrollTop + $(window).height());
        
        if (distanceToBottom < settings.lookahead) {  
          req = $.get(nextLink.attr('href'), {}, settings.callback, 'json');
        }
      });
    });
  };
})(jQuery);