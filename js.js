$(document).ready(function() {


    /* .fitText is a $ plugin that makes text
        auto resize to an element's width... the number is just
        a product of tweaking. http://fittextjs.com/
    */
    $('.typo').lettering(); //lettering makes typography easier http://letteringjs.com/
    $('.typo_what').fitText(0.31);
    $('.typo_canido').fitText(0.45);
    $('.typo_forthe').fitText(0.42);
    $('.typo_internet').fitText(0.28);

    var toggle_state = 'left'; //sidebar toggle state
    var player = $f($('#intro')[0]); //vimeo api object
    var status = 'paused'; //video state... no API for it, so manual tracking is needed

    /* caching jquery lookups that are used a lot */
    var sidebar = $('.sidebar');
    var rightArrow = $('.rarrow');
    var leftArrow = $('.larrow');
    var interestBar = $('.selected_interests');
    var splashPanel = $('.splash');

    /* Usage: isVideo('{playing | paused}'), will return T/F depending if vimeo video is playing */
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
    /* onPause listener for vimeo API */
    function onPause() {
        sidebar.addClass('bounce'); //make the sidebar bounce when paused
        status = 'paused';
    }
    /* onPlay listener for vimeo API */
    function onPlay() {
        sidebar.removeClass('bounce'); //stop the bouncing sidebar when played
        status = 'playing';
    }
    /* adding hooks to the vimeo player */
    player.addEvent('ready', function() {
        player.addEvent('pause', onPause);
        player.addEvent('play', onPlay);
    });

    function getBouncingInterval() {
        return setInterval(function () {
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
    }

    var bouncer_interval = getBouncingInterval(); //start the bouncing sidebar

    //on mouseout, start the bouncer again
    sidebar.mouseleave(function(event) {
        bouncer_interval = getBouncingInterval();
    });

    //stop the bouncing sidebar when the mouse is in the sidebar
    sidebar.mouseenter(function(event) {
        clearInterval(bouncer_interval);
    });

    // mapping left, right, and enter to sidebar click
    $(document).keydown(function(event) {
        if ((event.keyCode == 39 || event.keyCode == 13) && toggle_state == 'left') {
            sidebar.click();
        } else if (event.keyCode == 37 && toggle_state == 'right') {
            sidebar.click();
        }
    });

    //when the sidebar is hovered on, toggle some classes and show some stuff
    sidebar.hover(function() { //mousein
        sidebar.removeClass('bounce');
        if (toggle_state == 'left') {
            sidebar.addClass('bounce_out_left');
            rightArrow.fadeIn();
        } else if (toggle_state == 'right') {
            sidebar.addClass('bounce_out_right');
            leftArrow.fadeIn();
        }
    }, function() { //mouseout
        if (isVideo('paused') && toggle_state == 'left') {
            sidebar.addClass('bounce');
        }
        rightArrow.fadeOut();
        leftArrow.fadeOut();
    });


    //handle the click. should scroll the page back and forth between the selection view and video view
    sidebar.click(function(event) {
        if (toggle_state == 'left') {
            /* lazy timeouts to toggle the state once a click is done */
            setTimeout(function(){
                toggle_state = 'right';
            }, 300);
            $('.typo_internet > .char10').css('animation', 'none'); //stop the blinking cursor to minimize painting during transition
            $('.content').show(); //show the main content div
            sidebar.removeClass('bounce_out_left');
            pauseVideo();
            populateMain();
            /* translate the entire video view right, uncovering the main view*/
            $('.splash').css('transform', 'translate('+ ($(window).width() - sidebar.width()) +'px, 0)');
        } else if (toggle_state == 'right'){
            setTimeout(function(){
                toggle_state = 'left';
                //$('.content').hide();
            }, 300);
            sidebar.removeClass('bounce_out_right');
            $('.splash').css('transform', 'none');
        }
    });


    /* resize listener to correct .splash translation */
    $(window).resize(function(event) {
        $('.splash').css('transform', 'translate('+ ($(window).width() - sidebar.width()) +'px, 0)');
    });

    function populateMain() {
        var interests = randomInterests();
        var interest;
        var interestsDiv = $('.interests');

        interestsDiv.empty();

        for (var i = 0; i < interests.length; i++) {
            interest = interests[i];
            interestsDiv.prepend(interestHTML(interest));
        }
    }

    $('.main').on('click', '.passion_name', function(e) {
        var passion = $(e.target);
        if (passion.is('h2'))
            passion = passion.parent();
        else if (passion.is('i'))
            passion = passion.parent().parent();
        passion.toggleClass('selected');
        passion.find('i').toggleClass('fa-check fa-plus');
    })

    $('.done_button').click(function(event) {
        processInterests();
    });


    function interestHTML(interest) {
        return interest_template.
                replace('%fa_icon%', interestDict[interest].fa_icon).
                replace('%heading%', interest);
    }

    function getSelectedInterests() {
        var elems = $('.passion_selector.selected');
        var interest_names = [];
        elems.each(function(index, el) {
            interest_names.push($(el).find('h2').text());
        });
        return interest_names;
    }

    /* called when the user presses i'm done. this function calls the
        actionHTML function with the users' data to produce the action items */
    function processInterests() {
        var interests = getSelectedInterests();
        $('.interests').fadeOut();
        $('.done_button').fadeOut(400, function() {
            $('.main_heading').text("Here you go!");
            $.each(interests, function(index, element) {
                var do_thisArray = interestDict[element].do_this;
                var do_this = do_thisArray[Math.floor(Math.random() * do_thisArray.length)];
                $('.action_items').append(actionHTML(do_this));
            });
        });
    }

    /* creates HTML from a specitic do_this entry */
    function actionHTML(do_this) {
        var html = action_template.
                    replace("%heading%", do_this.heading).
                    replace("%article%", do_this.blurb);
        if (typeof do_this.link === 'string') {
            var link = link_template.replace("%link%", do_this.link);
            html = html.replace('%footer%', link);
            if (!do_this.link_title) {
                html = html.replace("%link_title%", do_this.link);
            }
        } else { //else we have multiple links
            var footer = "";
            $.each(do_this.link, function(index, element) {
                footer += link_template.
                            replace("%link%", element).
                            replace("%link_title%",
                                (do_this.link_title && do_this.link_title[index]) ?
                                    do_this.link_title[index] : element);

            });
            html = html.replace("%footer%", footer);
        }
        return html;
    }

    /* returns a list of 8 random interests selected from interestDict.
        right now there may be repeats genereted */
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

var interest_template = '<div class="passion_selector"><h2 class="passion_name unselectable">%heading%<i class="fa fa-plus"></i></h2></div>';
var action_template = '<div class="action_item"><h3>%heading%</h3><article>%article%</article><footer>%footer%</footer></div>';
var link_template = '<a href="%link%">%link_title%</a>';

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
    'learning' : {
        'fa_icon': 'fa-book',
        'do_this': [
            {
                'heading': "Participate in free courses",
                'blurb': "A number of Universities have started opening up some of their courses. You can also find community generated courses on wikiversity.",
                'link': ['https://en.wikiversity.org/','https://www.coursera.org/'],
            },
            {
                'heading': "Learn about the intricacies of everything web",
                'blurb': "The future of the internet relies on many social and technical sciences. By studinfdsfs",
                'link': 'https://en.wikipedia.org/?title=Portal:Internet',
            },
            {
                'heading': "Learn To Code!",
                'blurb': "Coding is more accessable than ever, and you can make your first webpage in minutes!",
                'link': 'https://code.org/',
            },
        ],
    },
    'contributing data' : {
        'fa_icon': 'fa-book',
        'do_this': [
            {
                'heading': "Edit the Open Street Map",
                'blurb': "Contributing information to OSM helps everyone!",
                'link': ['openstreetmap.org'],
            },
            {
                'heading': "Stumble for Mozilla",
                'blurb': "The future of the internet relies on many social and technical sciences. By studinfdsfs",
                'link': 'https://location.services.mozilla.com/',
            },
            {
                'heading': "Take the Internet Health Test",
                'blurb': "The Internet Health Test is being used to ensure ISPs are obeying net neutrality rules.",
                'link': 'https://www.battleforthenet.com/internethealthtest/',
            },
        ],
    },
};
