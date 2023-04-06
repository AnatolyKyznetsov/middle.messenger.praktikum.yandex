const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.hbs$/i,
                    exclude: /node_modules/,
                    loader: 'handlebars-loader',
                },
                {
                    test: /\.tsx?$/i,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    exclude: /node_modules/,
                    type: 'asset/resource',
                    generator: {
                        filename: path.join('static/fonts', '[name].[contenthash][ext]'),
                    },
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    exclude: /node_modules/,
                    type: 'asset/resource',
                    generator: {
                        filename: path.join('static/images', '[name].[contenthash][ext]'),
                    },
                },
                {
                    test: /\.svg$/i,
                    exclude: /node_modules/,
                    type: 'asset/resource',
                    generator: {
                        filename: path.join('static/images/icons', '[name].[contenthash][ext]'),
                    },
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                inject: 'body',
                template: './src/index.html',
            }),
            new FileManagerPlugin({
                events: {
                    onStart: {
                        delete: ['dist'],
                    }
                },
            }),
        ],
        devServer: {
            open: false,
            compress: true,
            port: 8080,
            historyApiFallback: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
        },
    }
};
