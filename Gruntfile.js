'use strict';

// livereload
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    watch: {
      livereload: {
        files: [
          '*.html',
          '.tmp/{,*/}*.js',
          'test/js/{,*/}*.js',
          'test/css/{,*/}*.css'
        ],
        tasks: ['livereload']
      },
      src: {
        files: [
          'src/{,*/}*.js',
          'spec/**/*.spec.js'
        ],
        tasks: ['concat:editable']
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          // Change this to '0.0.0.0' to access the server from outside.
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          middleware: function(connect, options) {
            return [
              folderMount(connect, options.base)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },
    clean: {
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS']
      },
      browsers: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome', 'Firefox', 'Safari']
      },
      build: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome', 'Firefox', 'Safari'],
        singleRun: true
      }
    },
    concat: {
      dist: {
        files: {
          'editable.js': [
            'bower_components/rangy/rangy-core.js',
            'bower_components/bowser/bowser.js',
            '.tmp/editable.js'
          ]
        }
      },
      editable: {
        files: {
          '.tmp/editable.js': [
            'editable.prefix',
            'src/util/*.js',
            'src/config.js',
            'src/core.js',
            'src/!(core|config).js',
            'editable.suffix'
          ],
          '.tmp/editable-test.js': [
            'editable.prefix',
            'src/util/*.js',
            'src/config.js',
            'src/core.js',
            'src/!(core|config).js',
            'spec/**/*.js',
            'editable.suffix'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'editable.min.js': [
            'editable.js'
          ],
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['-a'], // '-a' for all files
        pushTo: 'origin'
      }
    },
    shell: {
      npm: {
        command: 'npm publish'
      }
    }
  });

  // livereload does not work with grunt-contrib-watch, so we use regarde instead
  // https://github.com/gruntjs/grunt-contrib-watch/issues/59
  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'concat:editable',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch:livereload'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'concat:editable',
    'karma:unit'
  ]);

  grunt.registerTask('lint', [
    'jshint'
  ]);

  grunt.registerTask('dev', [
    'concat:editable',
    'watch:src'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'clean:server',
    'concat:editable',
    'karma:build',
    'concat:dist',
    'uglify'
  ]);

  grunt.registerTask('devbuild', [
    'clean:server',
    'concat:editable',
    'concat:dist',
    'uglify'
  ]);

  grunt.registerTask('default', ['server']);


  // Release a new version
  // Only do this on the `master` branch.
  //
  // options:
  // release:patch
  // release:minor
  // release:major
  grunt.registerTask('release', function (type) {
    type = type ? type : 'patch';
    grunt.task.run('bump:' + type);
    grunt.task.run('shell:npm');
  });

};
