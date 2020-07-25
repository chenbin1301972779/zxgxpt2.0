// vue.config.js
var path = require('path')
module.exports = {
    devServer: {
        overlay: {
            warning: false,
            errors: true
        },
        // 设置代理
        port: 9092,
        proxy: {
            '/api': {
                target: 'http://10.0.130.28:9292/',
                //target: 'http://192.168.1.54:80/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    transpileDependencies: [
        // 打包后生效
        'element-ui',
        'axios',
        'nprogress'
    ],
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //打包压缩gzip
            const CompressionWebpackPlugin = require('compression-webpack-plugin')
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css', 'html'].join('|') + ')$'),
                    threshold: 1000,
                    minRatio: 1
                })
            )

            //打包去除console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }

        //设置别名
        config.resolve.alias['@'] = path.join(__dirname, 'src')
    }
}
