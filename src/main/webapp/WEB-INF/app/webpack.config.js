var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/app.module.js',
    },
    output: {
        path: __dirname + './../../resources/dist',
        filename: 'app.bundle.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
            {test: /\.html$/, loader: 'html-loader'},
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })/*,
        new webpack.optimize.UglifyJsPlugin()*/
    ]
};