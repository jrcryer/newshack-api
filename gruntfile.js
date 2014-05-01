'use strict';

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project Configuration
    var yeomanConfig = {
        app: 'app',
        pub: 'public',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: ['gruntfile.js', 'test/**/*.js', 'app/controllers/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 4000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            tasks: ['nodemon'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        }
    });

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    // Default task(s).
    grunt.registerTask('build', ['jshint']);

    //Test task.
    grunt.registerTask('test', ['mochaTest']);
};
