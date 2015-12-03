module.exports = function(grunt){
	grunt.initConfig({
		wiredep: {
			task: {
				src: [
					'./index.html'
				],
				ignorePath: /\.\.\//
			}
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
};