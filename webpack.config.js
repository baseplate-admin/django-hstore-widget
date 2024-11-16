const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.ts', // Main entry point
    output: {
        filename: '[name].bundle.js', // Use a dynamic filename for chunks
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean output directory before each build
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve these extensions
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage', // Polyfill as needed
                                        corejs: 3, // Specify CoreJS version
                                    },
                                ],
                            ],
                        },
                    },
                    'ts-loader',
                ],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: [
                    {
                        loader: 'minify-html-literals-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        ...(isDevelopment
            ? [
                  new HtmlWebpackPlugin({
                      template: './index.html',
                  }),
              ]
            : []),
    ],
    optimization: {
        minimize: true, // Enable minimization
        minimizer: [new TerserPlugin()],
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Serve files from the output directory
        port: 3000, // Dev server port
        hot: true, // Enable hot module replacement
        open: true, // Automatically open the browser
    },
    devtool: isDevelopment ? 'source-map' : false, // Source maps in development
    mode: isDevelopment ? 'development' : 'production', // Set mode
};
