(function($) {
  $.fn.infinitescroll = function(options) {
    return $(this).each(function() {      
      var settings = $.extend({
          triggerAt: 400,
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
        var distanceToBottom = $(document).height() - (settings.container.scrollTop() || $(settings.container.get().ownerDocument.body).scrollTop()) - $(window).height();
        
        if (distanceToBottom < settings.triggerAt) {
          if (req && req.readyState < 4 && req.readyState > 0) {
            return;
          }
          
          req = $.get(
            nextLink.attr('href'), 
            {}, 
            settings.callback,
            'json'
          );
        }
      });
    });
  };
})(jQuery);