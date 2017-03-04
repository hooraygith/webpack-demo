const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcDir = path.resolve(__dirname, 'src');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        // name hash chunkhash
        filename: '[name]-[chunkhash:8].js'
    },

    module: {
        rules: [
        {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: [srcDir],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.js$/,
            include: [srcDir],
            loader: 'babel-loader',
            options: {
                "plugins": ["transform-es2015-modules-commonjs"]
            }
        }, {
            test: /\.less$/,
            include: [srcDir],
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!less-loader"
                })
        }, {
            test: /\.(jpe?g|svg|png|gif|webp)$/,
            include: [srcDir],
            use: 'url-loader'
        }]
    },
    plugins: [

        // css 插入 html head
        new ExtractTextPlugin('[name]-[chunkhash:8].css'),

        // js 插入 html body
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}
