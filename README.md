# whatcanidofortheinternet.org
a movement dedicated to inspiring users to read, write, and participate on the internet. 

## Overview 
Currently (subject to change at any point), the project is a html/css/js site without any bootstrapping. A few libraries are used, such as jQuery. Static assets (js, css) are found in the assets directory, and the html files are on the root level. The main driver is assets/js/main.js, and it's directly manipulating the dom with jquery. Deployment is as simple as dragging index.html into your browser, or spawning a webserver ala `python -m SimpleHTTPServer`. Note: Vimeo doesn't like it when you're hosted on file://, so the video will only work over http(s).

## Goals
* first, to **educate** users on a vision of the internet as the world's largest public resource (what is the internet?)
* second, to **inspire** users to help causes that keep the internet free, open, and accessible to all (why does the internet need me?)
* third, to **assist** in realizing action and generating sustained interest through use of guides and contact points for various campaigns and organizations (what can i do for the internet?)

## Next Steps
* Backend structure for organizations to submit project proposals, which are then reviewed and available for users to select on the site. (django? express? wordpress? github? email? how to make most easy/accessible)
* Create a better user experience throughtout the site. (i.e. how can we recommend the best projects to each user, while being transparent?)
* Brainstorm structure where users + organizations work together, report back results, and then user is rewarded with swag, recognition? 
* Create about page, with all the professional stuffs
* Make the landing page video 

