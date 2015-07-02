$(document).ready(function() {

    $('.typo').lettering();
    $('#typo_what').fitText(0.31);
    $('#typo_canido').fitText(0.45);
    $('#typo_forthe').fitText(0.42);
    $('#typo_internet').fitText(0.28);

    var toggle_state = 'left'; //sidebar toggle
    var iframe = $('#intro')[0];
    var player = $f(iframe);
    var status = 'paused';

    function isVideo(st) {
        if (typeof st === 'undefined')
            return false;
        switch(st) {
            case 'paused':
                return status == 'paused' ? true : false;
            case 'playing':
                return status == 'paused' ? false : true;
        }
    };

    function playVideo() {
        player.api('play');
    };

    function pauseVideo() {
        player.api('pause');
    };
    function onPause() {
        $('.sidebar').addClass('bounce');
        status = 'paused';
    }
    function onPlay() {
        $('.sidebar').removeClass('bounce');
        status = 'playing';
    }
    player.addEvent('ready', function() {
        player.addEvent('pause', onPause);
        player.addEvent('play', onPlay);
    });


    setInterval(function () {
        if (toggle_state == 'left' &&
            !$('.sidebar').is(':hover') &&
            isVideo('paused')) {
                $('.sidebar').toggleClass('bounce');
                if ($('.sidebar').hasClass('bounce')) {
                    $('.rarrow').fadeIn('slow');
                    setTimeout(function() { $('.rarrow').fadeOut('slow'); }, 1000);
                }
        }
    }, 1500);

    $(document).keypress(function(event) {
        if (event.key == 'Enter' && toggle_state == 'left') {
            $('.sidebar').click();
        }
    });

    $('.sidebar').hover(function() {
        $('.sidebar').removeClass('bounce');
        if (toggle_state == 'left') {
            $('.sidebar').addClass('bounce_out_left');
            $('.rarrow').show();
        } else if (toggle_state == 'right') {
            $('.sidebar').addClass('bounce_out_right');
            $('.larrow').show();
        }
    }, function() {
        if (isVideo('paused') && toggle_state == 'left') {
            $('.sidebar').addClass('bounce');
        }
        $('.rarrow').hide();
        $('.larrow').hide();
    });



    $('.sidebar').click(function(event) {
        if (toggle_state == 'left') {
            toggle_state = 'moving_left';
            $('.sidebar').css('left', "calc(100% - "+$('.sidebar').width()+"px)");
            $('.video_container').css('left', '90%');
            $('.sidebar').removeClass('bounce_out_left');
            pauseVideo();
            $('.content').fadeIn();
        } else if (toggle_state == 'right'){
            $('.video_container').css('left', '20%');
            toggle_state = 'moving_right';
            $('.sidebar').css('right', "calc(100% - "+$('.sidebar').width()+"px)");
            $('.sidebar').removeClass('bounce_out_right');
            $('.content').fadeOut();
        }
    });

    $('.sidebar').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        if (e.originalEvent.propertyName == 'transform' && !(e.propertyName == 'left' || e.propertyName == 'right'))
            return;
        if (toggle_state == 'moving_left') {
            toggle_state = 'right';
            $('.sidebar').css('right', '0');
            $('.sidebar').css('left', 'auto');
            $('.sidebar').addClass('bounce_out_right');
        } else if (toggle_state == 'moving_right'){
            toggle_state = 'left';
            $('.sidebar').css('left', '0');
            $('.sidebar').css('right', 'auto');
            $('.sidebar').addClass('bounce_out_left');
        }
    });
});
