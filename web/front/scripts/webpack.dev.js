const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve('./src/app.jsx'),
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'js/[name].js?v=[hash:6]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: path.resolve('./dist'),
        historyApiFallback: true,
        hot: true,
        open: true,
        inline: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: '/img/[name].[ext]?v=[hash:6]'
                }
            }, {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: 'font/[name].[ext]?v=[hash:6]'
                }
            }
        ],
    },
    plugins: [
        // 提取css
        new ExtractTextPlugin('css/[name].css?v=[hash:6]'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}