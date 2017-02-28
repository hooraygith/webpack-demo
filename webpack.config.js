const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcDir = path.resolve(__dirname, 'src');

module.exports = {
    //context: process.cwd(),
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        // name hash chunkhash
        filename: '[name]-[chunkhash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [srcDir],
                use: [{loader: 'babel-loader'}]
            },
            {
                test: /\.less$/,
                include: [srcDir],
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: "css-loader!postcss-loader!less-loader"
                })
                // use: [
                //     {loader: 'less-loader'},
                //     {loader: 'postcss-loader'},
                //     {loader: 'css-loader'},
                //     {loader: 'style-loader'}
                // ]
            },
            {
                test: /\.(jpe?g|svg|png|gif|webp)$/,
                include: [srcDir],
                use: [{loader: 'url-loader?limit=10000'}]
            }
        ]
    },
    plugins: [
        // 发现webpack自带uglify的效果，其实是babili带的
        // uglifyJsPlugin不能识别generate的*号
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),


        // 会将多个入口的公共模块抽出，放进common.js
        new CommonsChunkPlugin('common'),

        new ExtractTextPlugin('[name]-[chunkhash:8].css'),

        new HtmlWebpackPlugin({  // Also generate a test.html 
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}
