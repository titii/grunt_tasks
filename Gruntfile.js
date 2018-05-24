module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-replace');

  grunt.initConfig({
    jshint: {
      "gruntfile": {
        "src" : "Gruntfile.js"
      }
    },
    wiredep: {
      task: {
        src: [
          'src/views/**/*.html'   // .html support...
        ]
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'build/main.css': 'src/views/sass/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ]
      },
      build: {
        src: 'build/**/*.css'
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'revision',
              replacement: '<%= grunt.template.today("yyyymmddhhmmss") %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['src/views/index.html'], dest: 'build/'}
        ]
      }
    }
  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('serve', ['jshint', 'wiredep', 'sass', 'postcss:build', 'replace']);
};