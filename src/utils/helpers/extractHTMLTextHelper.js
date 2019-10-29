/**
 * Created by wangsiyuan on 11/2/17.
 */
/**
 * extracting text in HTML Tags
 *
 * @param htmlString
 * @param separator
 * @returns {Array}
 */
import { curry, flow } from 'lodash';

const replace = curry((regExp, replaceStr, str) => {
    return str.replace(regExp, replaceStr);
});

export default (htmlString, separator = '|#|') => {
    const replaceEnter = replace(/(<.+?>)|(\r\n)/g, '');
    const replaceBr = replace(/<br.+?>/g, separator);
    const contentString = flow(replaceBr, replaceEnter)(htmlString);
    return contentString && contentString.split(separator) || false;
};
