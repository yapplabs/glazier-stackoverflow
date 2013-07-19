module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var glazierCardGruntConfig = require('glazier-card-grunt-config'),
    sharedConfig = glazierCardGruntConfig.createSharedConfig(grunt);

  grunt.initConfig(sharedConfig);
  glazierCardGruntConfig.registerSharedTasks(grunt);
  grunt.registerTask('build', ['clean', 'emberTemplates', 'transpile', 'jshint', 'copy:main', 'copy:test', 'copy:testVendor', 'concat', 'dev_manifest']);
};
