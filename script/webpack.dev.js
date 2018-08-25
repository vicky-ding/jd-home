const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve('./web/back/app.jsx'),
        vendor: ['react', 'react-dom', 'babel-polyfill']
    },
    output: {
        path: path.resolve('./web/dist'),
        filename: 'js/[name].js?v=[hash:6]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        inline: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }, {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }, {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[ext]?v=[hash:6]'
                }
            }, {
                test: /\.(woff|eot|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    publicPath: '../',
                    name: 'font/[name].[ext]?v=[hash:6]'
                }
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        // 提取css
        new ExtractTextPlugin('css/[name].css?v=[hash:6]'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './web/src/index.html'
        })
    ]
}