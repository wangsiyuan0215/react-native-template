/**
 * Created by wangsiyuan on 11/7/17.
 */
import React from 'react';
import { Alert } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

import ToastContainer from './ToastContainer';

const unicodeMap = {
    info: '\ue60f',
    star: '\ue611',
    error: '\ue631',
    success: '\ue660',
    internet: '\ue614'
};

class ToastStatic extends React.PureComponent {
    static show = (message, type, duration = 2000) => {
        this.timer && clearTimeout(this.timer);
        if (!this._alert) {
            this._alert = new RootSiblings(
                (
                    <ToastContainer
                        message={message}
                        unicode={unicodeMap[type]}
                        duration={duration}
                        visible
                    />
                )
            );
        } else {
            this._alert.update(
                <ToastContainer
                    message={message}
                    unicode={unicodeMap[type]}
                    duration={duration}
                    visible
                />
            );
        }

        this.timer = setTimeout(() => {
            this._alert.update(
                <ToastContainer visible={false} message={message} unicode={unicodeMap[type]} />
            );
        }, duration);

        return this._alert;
    };

    static hide = alert => {
        if (alert instanceof RootSiblings) {
            alert.destroy();
        } else {
            console.warn(
                `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof alert}\` instead.`
            );
        }
    };

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return null;
    }
}
Object.keys(unicodeMap).map(item => {
    ToastStatic[item.toUpperCase()] = item;
});

ToastStatic.INFO_SHOW = (message, duration) => {
    ToastStatic.show(message, ToastStatic.INFO, duration);
};
ToastStatic.INTERNET_SHOW = (message, duration) => {
    ToastStatic.show(message, ToastStatic.INTERNET, duration);
};
ToastStatic.STAR_SHOW = (message, duration = 2000) => {
    ToastStatic.show(message, ToastStatic.STAR, duration);
};
ToastStatic.ERROR_SHOW = (message, duration = 2000) => {
    ToastStatic.show(message, ToastStatic.ERROR, duration);
};
ToastStatic.SUCCESS_SHOW = (message, duration) => {
    ToastStatic.show(message, ToastStatic.SUCCESS, duration);
};
ToastStatic.RNative = Alert;

export default ToastStatic;
