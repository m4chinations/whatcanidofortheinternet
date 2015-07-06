$(document).ready(function() {

    $('.typo').lettering();
    $('.typo_what').fitText(0.31);
    $('.typo_canido').fitText(0.45);
    $('.typo_forthe').fitText(0.42);
    $('.typo_internet').fitText(0.28);
    $('.fa').fitText(0.2);

    var toggle_state = 'left'; //sidebar toggle
    var iframe = $('#intro')[0];
    var player = $f(iframe);
    var status = 'paused';


    var sidebar = $('.sidebar');
    var rightArrow = $('.rarrow');
    var leftArrow = $('.larrow');

    var currentlyMovingInterests = 0;

    function isVideo(st) {
        if (typeof st === 'undefined')
            return false;
        switch(st) {
            case 'paused':
                return status == 'paused' ? true : false;
            case 'playing':
                return status == 'paused' ? false : true;
        }
    }

    function playVideo() {
        player.api('play');
    }

    function pauseVideo() {
        player.api('pause');
    }

    function onPause() {
        sidebar.addClass('bounce');
        status = 'paused';
    }
    function onPlay() {
        sidebar.removeClass('bounce');
        status = 'playing';
    }
    player.addEvent('ready', function() {
        player.addEvent('pause', onPause);
        player.addEvent('play', onPlay);
    });


    setInterval(function () {
        if (toggle_state == 'left' &&
            !sidebar.is(':hover') &&
            isVideo('paused')) {
                sidebar.toggleClass('bounce');
                if (sidebar.hasClass('bounce')) {
                    rightArrow.fadeIn('slow');
                    setTimeout(function() {
                        if (!sidebar.is(':hover'))
                            rightArrow.fadeOut('slow');
                    }, 1000);
                }
        }
    }, 1500);

    $(document).keydown(function(event) {
        console.log(event);
        if ((event.keyCode == 39 || event.keyCode == 13) && toggle_state == 'left') {
            sidebar.click();
        } else if (event.keyCode == 37 && toggle_state == 'right') {
            sidebar.click();
        }
    });

    $('.main').on('click', '.passion_selector', function(event) {
        var clicked = $(event.target);
        if (clicked.is('div'))
            clicked = clicked.children().first();

        selectInterest(clicked, clicked.parent().find('h2').html());
        currentlyMovingInterests++;
    });

    sidebar.hover(function() {
        sidebar.removeClass('bounce');
        if (toggle_state == 'left') {
            sidebar.addClass('bounce_out_left');
            rightArrow.fadeIn();
        } else if (toggle_state == 'right') {
            sidebar.addClass('bounce_out_right');
            leftArrow.fadeIn();
        }
    }, function() {
        if (isVideo('paused') && toggle_state == 'left') {
            sidebar.addClass('bounce');
        }
        rightArrow.fadeOut();
        leftArrow.fadeOut();
    });



    sidebar.click(function(event) {
        if (toggle_state == 'left') {
            toggle_state = 'moving_left';
            sidebar.css('left', "calc(100% - "+sidebar.width()+"px)");
            $('.video_container').css('left', '90%');
            sidebar.removeClass('bounce_out_left');
            pauseVideo();
            $('.content').fadeIn();
            populateMain();
            $('.fa').fitText(0.2);
        } else if (toggle_state == 'right'){
            $('.video_container').css('left', '20%');
            toggle_state = 'moving_right';
            sidebar.css('right', "calc(100% - "+sidebar.width()+"px)");
            sidebar.removeClass('bounce_out_right');
            $('.content').fadeOut();
        }
    });

    sidebar.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        if (e.originalEvent.propertyName == 'transform' && !(e.propertyName == 'left' || e.propertyName == 'right'))
            return;
        if (toggle_state == 'moving_left') {
            toggle_state = 'right';
            sidebar.css('right', '0');
            sidebar.css('left', 'auto');
            sidebar.addClass('bounce_out_right');
        } else if (toggle_state == 'moving_right'){
            toggle_state = 'left';
            sidebar.css('left', '0');
            sidebar.css('right', 'auto');
            sidebar.addClass('bounce_out_left');
        }
    });

    $('.main').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', '.passion_selector_icon', function(e) {
        if (!(e.originalEvent.propertyName == 'transform'))
            return;
        var icon = $(e.currentTarget);
        icon.css('transform', 'none');
        icon.appendTo('.selected_interests');
        icon.fitText(0.4);
        icon.removeClass('selected');
        currentlyMovingInterests--;
    });

    function selectInterest(element, interest) {
        //$('.selected_interests').append('<i class="fa '+interestDict[interest].fa_icon+'"></i>');
        var translation = getMovementOffsetForInterestIcon(element);
        element.css('transform', 'translate('+translation.x+'px, '+translation.y+'px)');
    }

    function getMovementOffsetForInterestIcon(element) {
        var destination;
        var left_offset = 0;
        var bar = $('.selected_interests');
        if (currentlyMovingInterests > 0) {
            left_offset += currentlyMovingInterests * (bar.width() * 0.14);
        }
        if (bar.children().length) {
            destination = bar.children().last().offset();
            destination.left += bar.children().last().width();
        } else {
            destination = bar.offset();
        }
        destination.left += left_offset;
        console.log(destination);
        var currentPos = element.offset();
        return {
                'y' : destination.top - currentPos.top,
                'x' : destination.left - currentPos.left,
        };
    }

    function removeInterest(interest) {

    }


    function populateMain() {
        var interests = randomInterests();
        var interest;
        var mainContent = $('.main');
        for (var i = 0; i < interests.length; i++) {
            interest = interests[i];
            mainContent.append(interestHTML(interest));
        }
    }

    function interestHTML(interest) {
        return interest_template.
                replace('%fa_icon%', interestDict[interest].fa_icon).
                replace('%heading%', interest);
    }


    function randomInterests() {
        var interests = [];
        for (var interest in interestDict) {
            if (interestDict.hasOwnProperty(interest)) {
                interests.push(interest);
            }
        }
        var randomInts = [];
        var randomIdx;
        for (var i = 0; i < 8; i++) {
            randomIdx = Math.floor(Math.random() * interests.length);
            if (!interestDict[interests[randomIdx]].selected)
                randomInts.push(interests[randomIdx]);
        }
        return randomInts;
    }


});

var interest_template = '<div class="passion_selector"><i class="fa %fa_icon% passion_selector_icon"></i><h2>%heading%</h2></div>';


var interestDict = {
    'photography' : {
        'fa_icon': 'fa-camera-retro',
        'do_this': [
            {
                'heading': "Learn about Creative Commons",
                'blurb': "The Creative Commons project aims to...",
                'link': 'creativecommons.org',
            },
        ],
    },
    'memes' : {
        'fa_icon': 'fa-smile-o',
        'do_this': [
            {
                'heading': "Use this online video editor to make videos",
                'blurb': "Ever wanted to make the next viral video? This project lets you create, edit, and publish videos directly from the web.",
                'link': 'https://popcorn.webmaker.org',
            },
            {
                'heading': "Make more content!",
                'blurb': "Content creators - like you - are what brings the Internet to life. Even if we don't think we /need/ another funny cat image, please, for the Internet, make another funny cat image!",
                'link': 'https://popcorn.webmaker.org',
            },
        ],
    },
    'coding' : {
        'fa_icon': 'fa-code',
        'do_this': [
            {
                'heading': "Contribute to Open Source projects",
                'blurb': "A large portion of the software you rely on daily is Open Source! Strengthing these libraries, applications, and frameworks is one of the most impactful things you can do for the Open Web.",
                'link': 'https://en.wikipedia.org/wiki/List_of_free_and_open-source_software_packages ',
            },
            {
                'heading': "Teach a friend how to code",
                'blurb': "Teaching someone how to code changes the way they think about the Internet. By passing on your skills to a friend, you're helping to make the Internet a better place.",
                'link': 'https://teach.mozilla.org/',
            },
            {
                'heading': "Encrypt, Encrypt, Encrypt!",
                'blurb': "If you run a website, or know someone who does, you should make sure HTTPS is used on your/their website. Soon, every website operator will have the ability to protect their website with HTTPS for free, with LetEncrypt! Follow the project and encrypt your website! ",
                'link': 'https://letsencrypt.org/',
            },
        ],
    },
    'advocacy' : {
        'fa_icon': 'fa-bullhorn',
        'do_this': [
            {
                'heading': "Advocate for encryption standards",
                'blurb': "A large portion of the software you rely on daily is Open Source! Strengthing these libraries, applications, and frameworks is one of the most impactful things you can do for the Open Web.",
                'link': 'https://en.wikipedia.org/wiki/List_of_free_and_open-source_software_packages ',
            },
            {
                'heading': "Host a Cryptoparty",
                'blurb': "Teaching someone how to code changes the way they think about the Internet. By passing on your skills to a friend, you're helping to make the Internet a better place.",
                'link': 'https://teach.mozilla.org/',
            },
            {
                'heading': "Run a Wikipedia Edit-a-thon",
                'blurb': "If you run a website, or know someone who does, you should make sure HTTPS is used on your/their website. Soon, every website operator will have the ability to protect their website with HTTPS for free, with LetEncrypt! Follow the project and encrypt your website! ",
                'link': 'https://letsencrypt.org/',
            },
        ],
    },
};
