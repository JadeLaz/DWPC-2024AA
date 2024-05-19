const path = require('path');

module.exports = {

    mode: "development",

    entry: "./client/index.js",

    output:{

        path: path.resolve(__dirname, "public"),

        filename: "bundle.js",

        publicPath: "/"
    },

    devServer: {

        static: path.join(__dirname, "public"),

        port: 8000,

        host: "0.0.0.0"
    }
};