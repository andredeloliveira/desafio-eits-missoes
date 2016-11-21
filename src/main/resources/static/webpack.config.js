var path = require('path');

module.exports = {
    entry: ['./src/main/resources/static/app.jsx',
    './src/main/resources/static/Header.jsx',
    './src/main/resources/static/Footer.jsx'
    ],
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ],
        { test: /materialize-css\/bin\//, loader: 'imports?jQuery=jquery,$=jquery,hammerjs' },
    }
};
