'use strict'

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('min-css-extrac-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin  webpack3才需要 webpack4直接用optimization


// 多入口自动遍历 生成map数组
var srcDir = path.resolve(process.cwd(), 'src')
var entries = function () {
    var jsDir = path.resolve(srcDir, 'js')
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var map = {};
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}

module.exports = {
    mode: 'development',
    entry: entries(), //多页面入口
    // entry: {
    //     common: './src/js/common/common.js',
    //     index: './src/js/index.js'
    // },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'static/js/[name].[hash:8].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        }
    },
    devtool: "inline-source-map",  // 生成sourceMap
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/img/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'html/index.html',
            filename: 'html/index.html'
        }),
        new MiniCssExtractPlugin("static/css/[name].[chunkhash:8].css"),  //css单独打包， hash文件后缀8位数
        new CleanWebpackPlugin(),  // 构建前先清除dist文件夹
    ],

    // 提取公共js文件
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
}

// 遍历多出口plugins
var htmlEntryDir = path.resolve(process.cwd(), 'html')
var htmlPlugins = function () {
    var outPutFiles = glob.sync(htmlEntryDir + '/*.html')
    var map = {};
    for (var i = 0; i < outPutFiles.length; i++) {
        var filePath = outPutFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filename
        console.log(7, map)
        module.exports.plugins.push(
            new HtmlWebpackPlugin({
                template: 'html/' + filename + '.html',
                filename: 'html/' + filename + '.html'
            })
        )
    }
    return map;
} 
htmlPlugins()