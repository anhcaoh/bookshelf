const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
var dotenv = require("dotenv").config({path: __dirname + "/.env"});
module.exports = {
    mode: "production",
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    output: {
        path: path.resolve(__dirname, "build")
    },
    devtool: "inline-source-map",
    devServer:{
        proxy: {"/api/search": {
            target: process.env.APP_OPEN_LIBRARY_API_ENDPOINT,
            pathRewrite: {"^/api/search" : ""},
            secure: false,
            changeOrigin: true
        }}
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf)$/, 
                loader: "url-loader",
                options: {
                    limit: 100000
                }
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
              test: /\.s[ac]ss$/,
              use: ["style-loader", "css-loader", "sass-loader"]
            }
          ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, "src/components/"),
            Features: path.resolve(__dirname, "src/features/"),
            Api: path.relative(__dirname, "src/api/"),
            Src: path.resolve(__dirname, "src/"),
            Scss: path.resolve(__dirname, "src/scss/"),
            Store: path.resolve(__dirname, "src/store/"),
            Static: path.resolve(__dirname, "src/static/"),
            Icons: path.resolve(__dirname, "src/static/icons/"),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.parsed)
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new ESLintPlugin()
    ]
};