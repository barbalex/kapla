module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
      x64: {
        appDirectory: './release/win32-x64/Kapla-win32-x64',
        outputDirectory: './release/installer',
        authors: 'Gabriel Software',
        noMsi: false,
        certificateFile: '../../user.cert'
      }
    }
  })

  grunt.loadNpmTasks('grunt-electron-installer')

  grunt.registerTask('default', ['create-windows-installer'])
}
