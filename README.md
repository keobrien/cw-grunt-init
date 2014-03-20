Clockwork Grunt Init
=============

Grunt init file for AMM Default Themes

Prerequisits:

* Install Node http://nodejs.org/
* run `npm install -g grunt-cli`
* run `npm install -g grunt-init`
* run `mkdir ~/.grunt-init`
* run `git clone https://github.com/ClockworkNet/cw-grunt-init.git ~/.grunt-init/amm-themes`

Now that you have that in place, setting up new projects will be much easier. 

Grab your theme directory from pion, using whatever method you wish. I'm a fan of gitsync, so I'm going to assume you have that up and running. I'd add node_modules to your gitsync ignore list going forward as well. 

cd into your themes directory. Once at the top level. run the following commands. 

 * `grunt-init amm_themes` - This will ask you a series of questions that will configure your tasks. 
 * `npm install` - This installs all the necessary node modules. 
 * `grunt` - This actually runs the tasks. 
 
By default this grunt task does the following. Assuming your theme is in the folder `default_2014`

 * Runs jshint against 
    - Scripts in `/htdocs/amm/themes/default_2014/js/includes`
    - Scripts in `/htdocs/amm/themes/default_2014/js/libs`
    - Scripts in `/htdocs/amm/themes/default_2014/js` except for `plugins.js` and `output.min.js`
 * Uglifies and concatenates in order, 
  - Scripts in `/htdocs/amm/themes/default_2014/js/includes`
  - `/htdocs/amm/themes/default_2014/js/plugins.js`
  - `/htdocs/amm/themes/default_2014/js/scripts.js`
 * Optimizes all images(this overwrite them) in  `/htdocs/amm/themes/default_2014/images`
  
You can also type `grunt watch` and it will handle checking your javascript and concatenating it as you edit. We generate a .map file for your minified scripts so debugging isn't completely impossible. 