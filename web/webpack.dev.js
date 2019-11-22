const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack=require("webpack");
const path = require('path');

module.exports = merge(common(true), {
    devtool: 'inline-source-map',
    mode: 'development',
    // module:{
    //     rules:[{
    //         test: /\.(tsx|ts|jsx|js)$/,
    //         include: path.resolve(__dirname, 'src'),
    //         enforce: 'pre',
    //         use: {
    //             loader: "eslint-loader",
    //             options: {
    //                 configFile: __dirname + '/.eslintrc.js'
    //             }
    //         },
    //     }], 
    // },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
});
