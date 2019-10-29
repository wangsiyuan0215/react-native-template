module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '@utils': './src/utils',
                    '@pages': './src/pages',
                    '@assets': './src/assets',
                    '@images': './src/assets/images',
                    '@models': './src/models',
                    '@locales': './src/locales',
                    '@middles': './src/middles',
                    '@services': './src/services',
                    '@resources': './src/resources',
                    '@components': './src/components'
                }
            }
        ]
    ]
};
