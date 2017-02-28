const path = require('path');
const webpack = require('webpack');
const AssetsWebpackPlugin = require('module-watcher/plugin/assets-webpack-plugin');
const dist = path.join(__dirname, '..', 'dist');


module.exports = {
    context: __dirname,
    output: {
        path: dist,
        filename: '[name].[chunkhash].js',
        library: 'TTXS_LIBS',
    },
    resolve: {
        alias: {
            // Vue2 为了推广虚拟 DOM，默认版本不完整
            vue: 'vue/dist/vue.js',
            powder: path.join(__dirname, 'powder1.5.4.js'),

            // 全局的公共业务组件
            cache: path.join(__dirname, 'common', 'cache.js'),
            client: path.join(__dirname, 'common', 'client.js'),
            full: path.join(__dirname, 'common', 'full.js'),
            report: path.join(__dirname, 'common', 'report.js'),
            request: path.join(__dirname, 'common', 'request.js'),
            time: path.join(__dirname, 'common', 'time.js')
        }
    },
    entry: {
        vendor: ['jquery', 'jquery-touch-events', 'fastclick', 'vue', 'powder'],
    },
    devtool: false,
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }, {
            test: /\.(jpe?g|svg|png|gif|webp)$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(ttf|svg|woff|woff2|eot|cur|ico)(\?.*)?$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new AssetsWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(dist, 'manifest.json'),
            name: 'TTXS_LIBS',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
};