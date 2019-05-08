const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
      './index.js'
    ],
    mode: 'development',
    target: 'node',
    devtool: 'source-map',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js$/
            }
        ]
    }
}
