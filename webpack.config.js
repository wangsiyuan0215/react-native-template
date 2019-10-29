/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
    resolve: {
        alias: {
            /* eslint global-require: ["off"] */
            '@': require('path').resolve(__dirname, 'src'),
            '@utils': require('path').resolve(__dirname, 'src/utils'),
            '@pages': require('path').resolve(__dirname, 'src/pages'),
            '@assets': require('path').resolve(__dirname, 'src/assets'),
            '@images': require('path').resolve(__dirname, 'src/assets/images'),
            '@models': require('path').resolve(__dirname, 'src/models'),
            '@locales': require('path').resolve(__dirname, 'src/locales'),
            '@services': require('path').resolve(__dirname, 'src/services'),
            '@resources': require('path').resolve(__dirname, 'src/resources'),
            '@middles': require('path').resolve(__dirname, 'src/middles'),
            '@components': require('path').resolve(__dirname, 'src/components')
        }
    }
};
