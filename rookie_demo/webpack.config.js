var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendors: ['react', 'redux'],
        demo_list: './src/demo_list.js',
        demo_form: './src/demo_form.js'
    },
    output: {
        publicPath: "/dist/",
        path:path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    // 新添加的module属性
    module: {
        loaders: [
            {
                test:/\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets:['react','es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        // 将公共部分抽成
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    devServer:{
        inline:true,
        hot:true
    }
};