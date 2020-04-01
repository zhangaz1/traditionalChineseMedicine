const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    devServer: {
        // proxy: 'http://localhost:8080'
        proxy: 'http://47.103.217.238:9002' // mockServer
    },
    chainWebpack: (config) => {
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 100
            });
    },
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 100, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        // propWhiteList: [],  // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
                    })
                ]
            }
        }
    },
    productionSourceMap: false, // 打包不生成SourceMap
    configureWebpack: config => { // 开启gzip压缩
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.css/, // 匹配文件名
                        threshold: 5120, // 对超过10k的数据压缩
                        deleteOriginalAssets: false // 不删除源文件
                    })
                ]
            };
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
