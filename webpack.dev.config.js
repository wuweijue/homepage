const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = '7080';

const webpackDevConfig = {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './lib/demo.css'
        })
    ],
    devServer: {
        port,
        publicPath: '/',
        stats: 'minimal',
        hot: true,
        open: true,
        contentBase: path.join(__dirname, './dist'),
    }
}

module.exports = merge(webpackDevConfig, webpackBaseConfig);