/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Creates a grunt file and package.json to work with amms.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This file tries hard not to break things. But as always, ' +
  'you should make sure you are fully committed to svn before running this so you ' +
  'can always get back to where you were before. See conner@clockwork.net if you' +
  'have questions. ';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    {
      name: 'project_name',
      message: 'What should this project be called?',
      default: 'conner_themes',
      warning: 'This is for local use.'
    },
    {
      name: 'description',
      message: 'Brief Description',
      default: 'AMM Theme Task',
      warning: 'This is for local use.'
    },
    {
      name: 'theme_directory',
      message: 'What directory does your theme live in?',
      default: 'default',
      warning: 'This should match the client/project.'
    },
    {
      name: 'min_concat',
      message: 'Should be minify your plugins.js and script.js files into output.js?',
      default: 'Y/n',
      warning: 'Yes: min + concat tasks. No: nothing to see here.'
    },
    { 
      name: 'image_min',
      message: 'Should we minify images',
      default: 'Y/n',
      warning: 'Yes: Minifying Images. No: Are you sure?'
    },

  ], function(err, props) {
   
    props.min_concat = /y/i.test(props.min_concat);
    props.image_min = /y/i.test(props.image_min);
    
    props.file_name = '<%= pkg.name %>';
    // props.package_json = true;
    // Find the first `preferred` item existing in `arr`.
    function prefer(arr, preferred) {
      for (var i = 0; i < preferred.length; i++) {
        if (arr.indexOf(preferred[i]) !== -1) {
          return preferred[i];
        }
      }
      return preferred[0];
    }

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({filter: 'isDirectory'}, '*').map(function(d) { return d.slice(0, -1); });
    props.lib_dir = prefer(dirs, ['lib', 'src']);
    props.test_dir = prefer(dirs, ['test', 'tests', 'unit', 'spec']);

    // Maybe this should be extended to support more libraries. Patches welcome!
    props.jquery = grunt.file.expand({filter: 'isFile'}, '**/jquery*.js').length > 0;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
  

   
   
   
      var devDependencies = {
        "grunt"                  : "~0.4.2",
        "grunt-contrib-jshint"   : "~0.6.3",
        "grunt-contrib-uglify"   : "~0.4.0",
        "grunt-contrib-imagemin" : "~0.5.0",
        "time-grunt"             : "~0.2.10",
        "grunt-contrib-watch"    : "~0.6.1"
      };

      // Generate package.json file, used by npm and grunt.
      init.writePackageJSON('package.json', {
        name : props.project_name,
        node_version: '>= 0.10.0',
        description: 'This is a test',
        devDependencies: devDependencies
      });
      init.copyAndProcess(files, props);

    // All done!
    done();
  });

};