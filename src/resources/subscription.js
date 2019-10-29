/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-14 17:15:11
 * @Description: subscription
 */

const prefixString = '@@_AUDIT/EMITTER/';

const subscription = {
    urlChanged: 'URL_CHANGED',
    screenChanged: 'ScreenChanged',
    networkChanged: 'NETWORK_CHANGED',
    appStatusChanged: 'APP_STATUS_CHANGED'
};

Object.keys(subscription).map( (item) => {
    subscription[item] = `${prefixString}${subscription[item]}`;
});

export {
    prefixString
};

export default subscription;

