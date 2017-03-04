const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
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
        rules: [{
            test: /\.js$/,
            include: [srcDir],
            loader: 'babel-loader',
            options: {
                "presets": [
                    ["env", {"targets": {"ie": 9}, "loose": true}]
                ],
                "plugins": ["transform-runtime"]
            }
        }, {
            test: /\.less$/,
            include: [srcDir],
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!postcss-loader!less-loader"
                })
        }, {
            test: /\.(jpe?g|svg|png|gif|webp)$/,
            include: [srcDir],
            use: 'url-loader?limit=10000'
        }]
    },
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                path.join(__dirname, './node_modules')
                ) === 0
            )
          }
        }),

        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),

        // css 插入 html head
        new ExtractTextPlugin('[name]-[chunkhash:8].css'),
        // 压缩 css
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // js 插入 html body
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}
