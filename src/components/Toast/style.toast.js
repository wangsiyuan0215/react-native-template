/**
 * Created by wangsiyuan on 6/26/17.
 */
import { StyleSheet } from 'react-native';

import BaseStyle, { pr } from '@resources/common.style';

const size20 = 20 / pr;
const size36 = 36 / pr;

export { BaseStyle };
export default StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        bottom: 150,
        maxWidth: 300,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    alertBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginBottom: 150,
        paddingLeft: size36 / 2,
        paddingRight: size20 * 1.4,
        paddingVertical: size36 / 2,
        borderRadius: size36,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    iconWrapper: {
        marginRight: size20
    },
    text: {
        color: BaseStyle.whiteColor,
        fontSize: BaseStyle.FontSize28,
        ...BaseStyle.BASE_TEXT
    }
});
