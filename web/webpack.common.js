const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = (devMode) => {
    console.log("当前模式：", devMode ? "开发环境" : "生产环境")
    const entry = {
        index: './src/index.tsx',
        // index: './src/redux-test/todoList/index.tsx',

    };
    devMode ? entry["hot"] = 'react-hot-loader/patch' : null;
    return {
        entry: entry,
        devServer: {
            contentBase: './dist'
        },
        output: {
            filename: devMode ? '[name].js' : '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.web.js', '.ts', '.tsx', '.jsx', '.js', '.json'], //antd中 .web.js 放在 .js 之前，这样就会优先找.web.js后缀的js：
            alias: {
                //别名配置
                '@components': path.resolve(__dirname, './src/components'),
                '@container': path.resolve(__dirname, './src/container'),
                '@entry': path.resolve(__dirname, './src/entry'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@action': path.resolve(__dirname, './src/action'),
                '@stories': path.resolve(__dirname, './src/stories')
            }
        },
        module: {
            rules: [{
                    test: /\.(tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [{
                            loader: "awesome-typescript-loader",
                            options: {
                                // disable type checker - we will use it in fork plugin
                                transpileOnly: true
                            }
                        }
                    ],

                },
                {
                    test: /\.(jsx|js)$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader",
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: false
                        }
                    }]
                },
                {
                    test: /\.ejs$/,
                    use: [{
                        loader: "ejs-loader",
                    }]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'url-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: __dirname + '/src/static/',
                to: __dirname + '/dist/static/'
            }]),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/lib/',
                to: __dirname + '/dist/lib/'
            }]),
            new HtmlWebpackPlugin({
                curEnv: devMode ? "dev" : "prod",
                hash: true,
                template: path.resolve(__dirname, "src/index.temp.ejs"),
            }),
            new Visualizer({
                filename: './statistics.html'
            }),
            new ForkTsCheckerWebpackPlugin()

        ],
        externals: [{
            // String
            'react': 'React',
            'react-dom': "ReactDOM",
            'react-router-dom': "ReactRouterDOM"
        }, ]
    }
};