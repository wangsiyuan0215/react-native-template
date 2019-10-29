/**
 * Created by wangsiyuan on 6/12/17.
 */

import { StyleSheet } from 'react-native';

import BaseStyle, { pr } from '@resources/common.style';

export {
    pr
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconFont: {
        fontFamily: 'iconfont',
        fontWeight: 'normal',
        backgroundColor: 'transparent',
        ...BaseStyle.BASE_TEXT
    }
});

export default styles;
