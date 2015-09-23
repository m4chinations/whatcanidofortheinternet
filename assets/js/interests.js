var interest_template = '<div class="passion_selector"><h2 class="passion_name unselectable">%heading%<i class="fa fa-plus"></i></h2></div>';
var action_template = '<div class="action_item"><h3>%heading%</h3><article>%article%</article><footer>%footer%</footer></div>';
var link_template = '<a href="%link%">%link_title%</a>';

var organizationArray = [
    { 
        'name' : 'Public Knowledge',
        'url' : 'http://publicknowledge.org',
        'logo' : 'https://pbs.twimg.com/profile_images/1865408042/plainlogo_400x400.png'
    }
];


var actionItemArray = [
    {
        'heading' : 'End Patent Trolls',
        'blurb' : 'Patent Trolls curb innovation by hoarding overly-broad patents and by filing lasuits against young startups, and even software users. These trolls often don\'t produce anything, and make all their money through their extortion scheme.',
        'link' : {
            'url' : 'http://fixpatents.org',
            'title' : 'Learn more, then pledge your support.'
        }
    }
];

var interestDict = {
    'patents' : {
        'fa_icon': 'fa-laptop',
        'do_this': [
            {
                'heading': "End Patent Trolls",
                'blurb': "Patent Trolls curb innovation by hoarding overly-broad patents and by filing lawsuits against young startups, and even software users. These trolls often don't produce anything, and make all their money through their extortion scheme. ",
                'link': 'http://fixpatents.org',
                'link_text': 'Learn more, and pledge your support.',
                'video' : '<iframe width="560" height="315" src="https://www.youtube.com/embed/Il9nXHoprsU" frameborder="0" allowfullscreen></iframe>',
                'orgs' : ['publicknowledge']
            },
        ],
    },
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
