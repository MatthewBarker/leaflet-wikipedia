module.exports = {
	images: {
		src: 'images/*.png',
		dest: 'build/images'
	},
	scripts: {
		src: 'source/*.js',
		dest: 'build'
	},
	doc: {
		src: ['source/*.js', 'README.md'],
		dest: 'help'
	},
	bundle: {
		src: './build/leaflet-wikipedia.min.js',
		dest: 'example'
	},
	styles: {
		src: './node_modules/leaflet/dist/leaflet.css',
		dest: 'example'
	},
	clean: ['build', 'help', 'example/bundle.js', 'example/leaflet.css']
};