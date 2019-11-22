 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const webpack = require('webpack');
 const WorkboxPlugin = require('workbox-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const TerserJSPlugin = require('terser-webpack-plugin');
 const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 const glob = require('glob-all')
 const PurifyCSS = require('purifycss-webpack');
 const path=require('path');
 const {
     CleanWebpackPlugin
 } = require('clean-webpack-plugin');
 //  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


 module.exports = merge(common(false), {
     mode: 'production',
     plugins: [
         new CleanWebpackPlugin(),
         new webpack.HashedModuleIdsPlugin(), //修复vendors hash值 因module.id的自增而变化 
         new webpack.DefinePlugin({
             'process.env.NODE_ENV': JSON.stringify('production')
         }),

         new WorkboxPlugin.GenerateSW({
             // 离线应用pwa
             // 这些选项帮助 ServiceWorkers 快速启用
             // 不允许遗留任何“旧的” ServiceWorkers
             clientsClaim: true,
             skipWaiting: true
         }),
         
         new PurifyCSS({
            paths: glob.sync([
                // 要做CSS Tree Shaking的路径文件
                path.resolve(__dirname, "./*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, "./src/*.js")
            ])
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename:'[name].[hash].css',
        
        }),
     ],
     optimization: {
         minimizer: [
             new TerserJSPlugin({}),  //压缩js
             new OptimizeCSSAssetsPlugin({})], //压缩css文件
         runtimeChunk: {
             name: 'single' //将 webpack 的样板(boilerplate)和 manifest 提取出来。
         },
     },
 });