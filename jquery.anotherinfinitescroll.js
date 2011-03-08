(function($) {
  $.fn.infinitescroll = function(options) {
    return $(this).each(function() {
      var el = $(this);
      var settings = $.extend({
          triggerAt: 1000,
          container: $(document),
          callback: null
        }, options);
      var req = null;

      $(window).scroll(function(e) {
        var distanceToBottom = $(document).height() - (settings.container.scrollTop() || $(settings.container.get().ownerDocument.body).scrollTop()) - $(window).height();
        
        if (distanceToBottom < settings.triggerAt) {
          if (req && req.readyState < 4 && req.readyState > 0) {
            return;
          }
          var nextLink = $(settings.next);
          req = $.get(nextLink.attr('href'), {}, function(data) {
            if (data.worked) {
              el.append(data.html);
              if (data.has_more) {
                nextLink.attr('href', data.next_url);
              } else {
                $(window).unbind('scroll');
                nextLink.remove();
              }
              if (settings.callback) {
                settings.callback(data);
              }
            }
          }, 'json');
        }
      });
    });
  };
})(jQuery);