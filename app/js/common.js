var stickyHeaders = (function() {

    var $window = $(window),
        $stickies;

    var load = function(stickies, shift) {

        if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

            $stickies = stickies.each(function() {

                var $thisSticky = $(this).wrap('<div class="followWrap" />');

                $thisSticky
                    .data('originalPosition', $thisSticky.offset().top)
                    .data('originalHeight', $thisSticky.outerHeight())
                    .parent()
                    .height($thisSticky.outerHeight());
            });

            $window.off("scroll.stickies").on("scroll.stickies", function() {
                _whenScrolling(shift);
            });
        }
    };

    var _whenScrolling = function(shift) {

        $stickies.each(function(i) {

            var $thisSticky = $(this),
                $stickyPosition = $thisSticky.data('originalPosition');

            if ($stickyPosition <= +$window.scrollTop() + shift) {

                var $nextSticky = $stickies.eq(i + 1),
                    $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');

                $thisSticky.addClass("fixed");

                if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {

                    $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
                }

            } else {

                var $prevSticky = $stickies.eq(i - 1);

                $thisSticky.removeClass("fixed");

                if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight') - shift) {

                    $prevSticky.removeClass("absolute").removeAttr("style");
                }
            }
        });
    };

    return {
        load: load
    };
})();

var smothScroll = function(classEl) {
    $(classEl).on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
}

$(function() {

    stickyHeaders.load($(".b-panel__title"), 60);

    $(window).on('scroll', function() {

        if ($(this).scrollTop() > 0) {
            $('.b-top').addClass('fixed')
        } else {
            $('.b-top').removeClass('fixed')
        }
    });

    smothScroll('.b-methods__link')
 
});