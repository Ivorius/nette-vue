var Encore = require('@symfony/webpack-encore');
const path = require('path');


Encore
	// directory where compiled assets will be stored
	.setOutputPath('www/assets/front')
	// public path used by the web server to access the output path
	.setPublicPath('/assets/front')
	// only needed for CDN's or sub-directory deploy
	//.setManifestKeyPrefix('build/')

	.addEntry('front', './front_dev/src/front.js')
	//.addEntry('page1', './assets/js/page1.js')
	//.addEntry('page2', './assets/js/page2.js')

	.addAliases({
		'nette-forms': path.resolve(__dirname, 'vendor/nette/forms/src/assets/netteForms.js')
	})
	.enableBuildNotifications()
	// will require an extra script tag for runtime.js
	// but, you probably want this, unless you're building a single-page app
	.enableSingleRuntimeChunk()
	//.disableSingleRuntimeChunk()

	.splitEntryChunks()


	.enableSourceMaps(!Encore.isProduction())
	// enables hashed filenames (e.g. app.abc123.css)
	.enableVersioning(Encore.isProduction())


	// uncomment if you use TypeScript
	//.enableTypeScriptLoader()

	// uncomment if you use Sass/SCSS files
	.enableSassLoader()
	.enableLessLoader()
	.enableVueLoader()

	// uncomment if you're having problems with a jQuery plugin
	//.autoProvidejQuery()

	// enables @babel/preset-env polyfills
	.configureBabel(() => {
	}, {
		useBuiltIns: 'usage',
		corejs: 3
	})

	.cleanupOutputBeforeBuild()

	.autoProvideVariables({
		'window.Nette': 'nette-forms',
		'Nette': 'nette-forms',
	})


const frontConfig = Encore.getWebpackConfig();
frontConfig.name = 'front';



// export the final configuration as an array of multiple configurations
module.exports = [frontConfig];
