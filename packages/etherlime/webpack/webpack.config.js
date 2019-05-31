const webpack = require('webpack');
const merge = require("webpack-merge");
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');


const commonConfig = require("./webpack.config-common.js");
const cwd = process.cwd();

const etherlimeCli = merge(commonConfig, {
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),

		new CopyPlugin([
			{
				from: `./cli-commands/init/circuit.circom`, to: './'
			},
			{
				from: `./cli-commands/init/deploymentTemplate.js`, to: './'
			},
			{
				from: `./cli-commands/init/gitIgnoreSource.js`, to: './'
			},
			{
				from: `./cli-commands/init/input.json`, to: './'
			},
			{
				from: `./cli-commands/init/LimeFactory.sol`, to: './'
			},
			{
				from: `./cli-commands/init/package.json`, to: './'
			},
			{
				from: `./cli-commands/init/testTemplate.js`, to: './'
			}
		]),
	],
});

module.exports = etherlimeCli;