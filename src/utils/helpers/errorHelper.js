/**
 * Created by wangsiyuan on 28/11/2017.
 */
import { curry } from 'lodash';

import Toast from '@components/Toast';
import constance from '@resources/constance';

const { errorTypes } = constance;

const errorHandlers = Object.keys(errorTypes).reduce((accumulator, item) => {
    return {
        ...accumulator,
        [errorTypes[item]]: message => Toast[errorTypes[item]](message)
    };
}, {});

const errorsCurried = curry((AlertComponent, handlers, error, dispatch) => {
    error && error.preventDefault();
    const { errorType = null, actionType = null, errorMessageCh = null } = error;
    if (actionType) {
        console.log(actionType);
        dispatch({ type: 'loading/@@DVA_LOADING/HIDE', payload: { actionType, namespace: actionType.split('/')[0] } });
        dispatch({ type: `${actionType}/@@end`, payload: true });
    }
    if (!errorMessageCh) return false;
    if (errorType && handlers[errorType]) return handlers[errorType](errorMessageCh);

    return AlertComponent.RNative.alert(
        '金社网超提示你',
        errorMessageCh,
        [{ text: '确定', style: 'cancel' }],
        { cancelable: false }
    );
});

const errorCreator = curry((actionType, type, message) => {
    const errorType = !type ? errorTypes.ALERT_TOAST_INFO : type;
    return {
        errorType,
        actionType,
        errorMessageCh: message
    };
});

const _ = errorsCurried(Toast, errorHandlers);

export {
    _,
    errorCreator
};
