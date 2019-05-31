const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: path.resolve(__dirname, "..", "index.js"),

	module: {
		rules: [{
			test: /\.js$/,
			loader: "babel-loader",
			query: {
				presets: [
					[
						'babel-preset-env',
						{ targets: { "node": "6.14" } }
					]
				],
				plugins: ['transform-object-rest-spread', 'transform-runtime'],
			},
			include: [
				path.resolve(__dirname, "..", 'lib')
			],
		}],
	},

	target: 'node',

	output: {
		library: "Etherlime-cli",
		libraryTarget: "umd",
		umdNamedDefine: true,
		filename: "etherlime-cli.js",
		path: path.join(__dirname, "..", "dist"),
		devtoolModuleFilenameTemplate: '[absolute-resource-path]',
		devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
	},
	node: {
		__dirname: false
	},

	resolve: {
		modules: [path.resolve(__dirname, ".."), "node_modules"]
	},

	// in order to ignore all modules in node_modules folder
	externals: [nodeExternals()]
};