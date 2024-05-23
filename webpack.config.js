const { plugins } = require('@babel/preset-env/lib/plugins-compat-data');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {

    mode: "production",

    entry: "./client/index.js",

    output:{

        path: path.resolve(__dirname, "public"),

        filename: "bundle.js",

        publicPath: "/"
    },

    module: {
        rules: [

            {

                test:/\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        "modules": false,
                                        "useBuiltIns": "usage",
                                        "targets": '> 0.25%, not dead',
                                        "corejs": 3
                                    }
                                ],
                            ]
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [

                    MiniCssExtractPlugin.loader,

                    "css-loader"
                ]
            }
        ]
    },

    plugins: [

        new MiniCssExtractPlugin({

            filename: "styles/app.css"
        })
    ]
};