/*
 * @Author: SiYuan Wang
 * @Date: 2019-07-22 15:17:42
 * @Description: locale
 */
import zhCN from './zh-CN';

let localeIndex = 'zh-CN';
const locales = {
    'zh-CN': zhCN
};

export const setLocaleIndex = index => {
    if (typeof index !== 'string') return false;
    localeIndex = index;
    return true;
};

export const formatMessage = (id, values) => {
    if (typeof id !== 'string') return id;
    const currentLocale = locales[localeIndex];
    if (!Object.prototype.hasOwnProperty.call(currentLocale, id)) return id;
    const keys = values ? Object.keys(values) : [];
    return (keys.length
        ? keys.reduce((acc, item) => {
              const regExp = new RegExp(`{${item}`, 'g');
              return acc.replace(regExp, values[item]);
          }, currentLocale[id])
        : currentLocale[id]
    ).replace(/{.*}/g, '');
};

export const formatScore = (value, maxValue) => {
    return (value / maxValue).toFixed(2) * 100;
};
