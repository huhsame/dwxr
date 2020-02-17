const path = require('path');
// const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    // enntry file
    // target: "node",
    entry: {
        space: ['@babel/polyfill', './src/js/space.js'],
        'gun': ['@babel/polyfill', './src/js/init-ddb.js'],
        'experiment':['@babel/polyfill', './src/js/experiment.js','./src/scss/app.scss'],
        'test':['@babel/polyfill', './src/js/test-space.js','./src/scss/app.scss'],
        'test-random':['@babel/polyfill', './src/js/test-space-random.js','./src/scss/app.scss'],
        'test-auto':['./src/js/test-auto.js'],
        main:['@babel/polyfill', './src/js/index.js','./src/scss/app.scss'],
        'test-survey':['@babel/polyfill', './src/js/test-survey.js','./src/scss/app.scss']
    },
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js'),
                    // path.resolve(__dirname, 'node_modules/gun'),
                    // path.resolve(__dirname, 'node_modules/aframe')
                ],
                // exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // {
                    //     // Adds CSS to the DOM by injecting a `<style>` tag
                    //     loader: 'style-loader'
                    // },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
        noParse: [/gun\.js$/, /sea\.js$/]
    },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development',
    node: {
        fs: 'empty',
        // dgram: 'empty',
        global: true
    }
};
