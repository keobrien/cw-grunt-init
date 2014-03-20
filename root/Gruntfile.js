/*global module:false*/
module.exports = function(grunt) {

   require('time-grunt')(grunt);  
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    {% if (min_concat) { %}
    uglify: {
            my_target: {
              options: {
                sourceMap: true,
              },
              files: {
                'htdocs/amm/themes/{%= theme_directory %}/js/output.min.js': ['htdocs/amm/themes/default/js/includes/*.js', 'htdocs/amm/themes/{%= theme_directory %}/js/plugins.js', 'htdocs/amm/themes/default/js/scripts.js']
              }
             }
        },
    {% } %}
   {% if (image_min) { %}
   imagemin: { 
            dynamic: {    
                    options: {                       // Target options
                    optimizationLevel: 4,
                    cache: false
                },                 // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                     cwd   : './htdocs/amm/themes/{%= theme_directory %}/images/',
                    src:  '*.{png,jpg,gif}',   // Actual patterns to match
                    dest: './htdocs/amm/themes/{%= theme_directory %}/images'              // Destination path prefix
                }]
            }
        },
   {% } %}
   jshint: {
            all: ['htdocs/amm/themes/default/js/libs/*.js', 'htdocs/amm/themes/default/js/includes/*.js', 'htdocs/amm/themes/{%= theme_directory %}/js/*.js', '!htdocs/amm/themes/{%= theme_directory %}/js/plugins.js', '!htdocs/amm/themes/{%= theme_directory %}/js/output.min.js']
        },
    watch: {
        files: 'htdocs/amm/themes/{%= theme_directory %}/js/**',
        tasks: ['default:jshint{%= min_concat ? ", default:uglify" : "" %} ']
    }
  });

  // These plugins provide necessary tasks. {% if (min_concat) { %}
  grunt.loadNpmTasks('grunt-contrib-uglify'); {% } %} //{% if (image_min) { %}
  grunt.loadNpmTasks('grunt-contrib-imagemin'); {% } %}
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint' {%= min_concat ? ", 'uglify'" : "" %} {%= min_concat ? ", 'imagemin'" : "" %}]);

};
