const path = require('path');

module.exports = {
    entry: './scripts/main.js', // Entry point of your application
    output: {
        filename: 'bundle.js', // Output bundle filename
        path: path.resolve(__dirname, 'dist') // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply rule for .js files
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: 'babel-loader' // Use babel-loader for .js files
                }
            },
            {
                test: /\.scss$/, // Apply rule for .scss files
                use: [
                    'style-loader', // Inject CSS into DOM
                    'css-loader',   // Translate CSS into CommonJS
                    'sass-loader'   // Compile Sass to CSS
                ]
            }
        ]
    }
};

