(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      sass: {
        options: {
          sourcemap: 'none'
        },
        "default": {
          files: [
            {
              "dist/basic.css": "src/basic.scss",
              "dist/dropzone.css": "src/dropzone.scss"
            }
          ]
        },
        compressed: {
          options: {
            style: 'compressed'
          },
          files: [
            {
              "dist/min/basic.min.css": "src/basic.scss",
              "dist/min/dropzone.min.css": "src/dropzone.scss"
            }
          ]
        }
      },
      coffee: {
        "default": {
          files: {
            "dist/dropzone.js": "src/dropzone.coffee"
          }
        },
        test: {
          files: {
            "test/test.js": "test/*.coffee"
          }
        }
      },
      concat: {
        amd: {
          src: ["AMD_header", "dist/dropzone.js", "AMD_footer"],
          dest: "dist/dropzone-amd-module.js"
        }
      },
      watch: {
        js: {
          files: ["src/dropzone.coffee"],
          tasks: ["js"],
          options: {
            nospawn: true
          }
        },
        test: {
          files: ["test/*.coffee"],
          tasks: ["coffee:test"],
          options: {
            nospawn: true
          }
        },
        css: {
          files: ["src/*.scss"],
          tasks: ["css"],
          options: {
            nospawn: true
          }
        }
      },
      uglify: {
        js: {
          files: [
            {
              "dist/min/dropzone-amd-module.min.js": "dist/dropzone-amd-module.js",
              "dist/min/dropzone.min.js": "dist/dropzone.js"
            }
          ]
        }
      }
    });
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default", ["downloads"]);
    grunt.registerTask("css", "Compile the sass files to css", ["sass"]);
    grunt.registerTask("js", "Compile coffeescript", ["coffee", "concat"]);
    return grunt.registerTask("downloads", "Compile all stylus and coffeescript files and generate the download files", ["js", "css", "uglify"]);
  };

}).call(this);
