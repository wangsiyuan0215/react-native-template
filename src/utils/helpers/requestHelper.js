/**
 * Created by wangsiyuan on 5/31/17.
 *
 * 封装 fetch 为 request
 *
 * 使用
 *
 *      request(options, url).then().then().catch();
 *
 *      options: {
 *          timeout: #超时#
 *          header: #头部信息#
 *          credentials: #为了在当前域名下自动发送 cookie, 默认为 include#
 *          method: POST|GET|PUT|DELETE...,
 *          body: bodyData
 *          ...
 *      }
 *
 */
import qs from 'qs';
import { isArray, isObject } from 'lodash';

import constance from '@resources/constance';
import { formatMessage } from '@locales';

const { headers, requestTimeOut, mapAlertKeyForErrorType } = constance;
const mapKeyForErrorType = {
    SERVER_ERROR: '@@ERROR_SERVER',
    TIMEOUT_ERROR: '@@ERROR_TIMEOUT'
};
const mapValueForErrorType = {
    '@@ERROR_SERVER': 'serverError',
    '@@ERROR_TIMEOUT': 'timeoutError'
};
const defaultMethod = 'GET';
const defaultCredentials = 'include';

const request = (url, options) => {
    const defaultOptions = {
        credentials: defaultCredentials,
        method: defaultMethod,
        timeout: requestTimeOut,
        headers
    };

    const { getState } = GLOBAL.dva_store || {};
    const {
        user: {
            userEntity: { token }
        }
    } = getState();
    const { body = {}, json = false, method, noToken = false, timeout, ...ops } = {
        ...defaultOptions,
        ...options,
        headers: { ...headers, ...(options.headers || {}) }
    };
    const finalBodyData = noToken ? { ...body } : { token, ...body };
    const params = json ? JSON.stringify({ ...finalBodyData }) : qs.stringify({ ...finalBodyData });

    const timeoutPromise = new Promise((resolve, reject) => {
        // eslint-disable-next-line no-bitwise
        if (~~timeout !== 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            setTimeout(() => reject({ status: mapKeyForErrorType.TIMEOUT_ERROR }), timeout);
        }
    });
    const fetchPromise = new Promise((resolve, reject) => {
        (
            (method.toUpperCase() === 'GET' && fetch(`${url}?${params}`, ops)) ||
            fetch(url, { ...ops, method, body: params })
        )
            .then(resolve)
            .catch(error => {
                console.log(`fetch ${url} catch`, error);
                reject(error);
            });
    });

    return Promise.race([fetchPromise, timeoutPromise])
        .then(response => {
            if (response.status && response.status === 200) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            if (data.datas && data.datas.error) {
                if (Number(data.login) === 0 && token) {
                    // eslint-disable-next-line no-unused-expressions
                    GLOBAL.dva_store &&
                        GLOBAL.dva_store.dispatch({ type: 'user/replicatedLoginHandler' });
                    throw { error: true };
                }
                throw {
                    error: true,
                    errorType: data.datas.errorType || mapAlertKeyForErrorType.ALERT_TOAST_INFO,
                    errorMessageCh: data.datas.error
                };
            }
            return isObject(data.datas) || isArray(data.datas)
                ? { success: true, data: data.datas }
                : { success: true, data };
        })
        .catch(error => {
            console.log('--- REQUEST FAIL ---');
            console.log(error);
            console.log('--- REQUEST FAIL ---');

            // handling error response for
            // the signal of Promise`s reject ( TIMEOUT_ERROR | SERVER_ERROR )
            if (error.status && mapValueForErrorType[error.status]) {
                return {
                    success: false,
                    errorType: mapAlertKeyForErrorType.ALERT_TOAST_INFO,
                    errorMessageCh: language.errorMessage[mapValueForErrorType[error.status]]
                };
            }
            // handling error response for network and
            // api of servers with logical error (400 | 500 | ...)
            return {
                success: false,
                errorType: mapAlertKeyForErrorType.ALERT_TOAST_INFO,
                errorMessageCh: language.errorMessage[mapKeyForErrorType.SERVER_ERROR]
            };
        });
};

export default request;
