const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    performance: {
        hints: false
    },

    devServer: {
        contentBase: './dist'
    },

    // Minification and source maps
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],

    module: {
        rules: [

            // CSS/SCSS processing
            {
                test: /\.css$/,
                use: [ 
                    MiniCSSExtractPlugin.loader, 
                    'css-loader' 
                ]
            },
            {
                test: /\.scss$/,
                use: [ 
                    MiniCSSExtractPlugin.loader, 
                    'css-loader',
                    'sass-loader' 
                ]
            }
        ]
    }
}