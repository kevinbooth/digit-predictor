'use strict';

var pkgjson = require('./package.json');

var config = {
    pkg: pkgjson,
};
module.exports = function (grunt) {
    grunt.initConfig({
        cacheBust: {
            options: {
                queryString: true
            },
            full: {
                options: {
                    assets: ['static/styles/**', 'static/scripts/**', 'vendor/**'],
                },
                src: ['index.html']
            },
            css: {
                options: {
                    assets: ['static/styles/**'],
                },
                src: ['index.html']
            },
            js: {
                options: {
                    assets: ['static/scripts/**'],
                },
                src: ['index.html']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'static/images/',
                    src: ['**/*.{gif}'], //{png,jpg,gif}
                    dest: 'static/images/'
                }]
            }
        },
        jshint: {
            options: {
                strict: false,
                'esversion': 6
            },
            files: ['static/scripts/js/*.js']
        },
        sass: {
            options: {
                style: 'compressed',
            },
            compile: {
                files: {
                    'static/styles/styles.min.css': 'static/styles/scss/styles.scss',
                }
            }
        },
        uglify: {
            options: {
                srcMap: true
            },
            compile: {
                files: {
                    'static/scripts/common.min.js': ['static/scripts/js/app.js']
                }
            }
        },
        watch: {
            css: {
                files: ['static/styles/scss/*.scss', 'static/styles/scss/**/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'uglify','imagemin', 'cacheBust:js']
            }
        }
    });


    grunt.registerTask('init', [
        'move'
    ]);
    grunt.registerTask('optimize', [
		'sass',
		'jshint',
		'uglify',
		'imagemin',
        'cacheBust:full'
    ]);
    grunt.registerTask('default', []);

    // Load Tasks
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};