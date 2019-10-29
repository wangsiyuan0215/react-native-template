import codePush from 'react-native-code-push';

const codePushOptions = {
    // updateDialog: {
    //     appendReleaseDescription: true,
    //     descriptionPrefix: '\n\n更新内容456：\n',
    //     title: '提示',
    //     mandatoryUpdateMessage: '',
    //     mandatoryContinueButtonLabel: '更新',
    //     optionalIgnoreButtonLabel: '取消',
    //     optionalInstallButtonLabel: '更新',
    //     optionalUpdateMessage: '检测到有版本更新'
    // },
    // 检查频率
    // https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md#checkfrequency
    // codePush.CheckFrequency.ON_APP_START  APP启动时进行检查
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    // 安装模式
    // https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md#installmode
    // codePush.InstallMode.ON_APP_START APP重启时进行安装
    InstallMode: codePush.InstallMode.ON_APP_START,
    // 强制安装模式
    // https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md#installmode
    // codePush.InstallMode.ON_NEXT_RESUME APP重启时进行安装
    mandatoryInstallMode: codePush.InstallMode.ON_APP_START
    // 在应用重启之前保持后台状态的最小时间
    // minimumBackgroundDuration: 0,
    // 更新提示框
    // updateDialog: null
};

export default codePush(codePushOptions);
