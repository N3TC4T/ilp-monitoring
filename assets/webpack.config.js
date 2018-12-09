const path = require('path');
const Webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    development: []
}


module.exports = (env, options) => ({
    entry: [
        './src/app.jsx'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../priv/static/js')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules"), // the old 'fallback' option (needed for npm link-ed packages)
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                include: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name:"../fonts/[name].[ext]",
                            limit: 10000,
                            context: process.cwd()
                        }
                    }
                ]
            }

        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: {
                        keep_fnames: true,
                    },
                },
            })
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '../css/app.css' }),
        new CopyWebpackPlugin([{ from: 'static/', to: '../' }]),
        new Webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new Webpack.optimize.AggressiveMergingPlugin(),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), //https://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
    ]
});
