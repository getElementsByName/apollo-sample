const path = require("path")
const webpack = require('webpack');
const projectRoot = path.join(__dirname, "..")
const outputPath = path.join(projectRoot, "./dist")

module.exports = {
    entry: {
        bundle: [path.join(projectRoot, "./client/index.tsx")]
    },
    output: {
        filename: "[name].js",
        path: outputPath,
    },

    devServer: {
        contentBase: outputPath,
        compress: true,
        publicPath: '/static/',
        port: 8080,
        hot: false,
        proxy: {
            '/': {
              target: 'http://localhost:8000'
            }
        }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".mjs", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](?!@apollo-sample)/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },

    // plugins: [new webpack.HotModuleReplacementPlugin()]
};