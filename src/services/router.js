/**
 * Edited by WangSiYuan at 23/05/18
 */
import { Linking } from 'react-native';

export async function registerLinking (callback) {
    return Linking.addEventListener('url', callback);
}

export const canOpenUrl = (url) => {
    return new Promise((resolve, reject) => {
        return Linking.canOpenURL(url).then(resolve).catch(reject);
    });
};

export const openUrl = (url) => {
    return new Promise((resolve, reject) => {
        return Linking.openURL(url).then(resolve).catch(reject);
    });
};
