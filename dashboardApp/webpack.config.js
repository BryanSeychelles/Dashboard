module.exports = {
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime']
            }
        }, {
            test: /\.css$/,
            // exclude: /node_modules/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
            loader: 'file-loader',
            options: {
                digest: 'hex',
                hash: 'sha512',
                name: 'images/[name].[ext]'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
