/**
 * Created by wangsiyuan on 6/13/17.
 * Edited by wangsiyuan on 8/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes } from 'react-native';

import styles, { pr } from './style.icon';

// IconComponent
const Icon = (props) => {
    const {
        unicode = '',
        size = '20',
        color = '#000',
        offset = { x: 0, y: 0 },
        style = {},
        textStyle = {}
    } = props;
    const _containerStyle = {
        width: Math.ceil(parseFloat(size) / pr),
        height: Math.ceil(parseFloat(size) / pr)
    };
    const _style = {
        fontSize: Math.floor(parseFloat(size) / pr),
        color,
        marginLeft: (offset.x || 0) / pr,
        marginBottom: -offset.y / pr
    };

    return (
        <View style={[styles.iconContainer, _containerStyle, style]}>
            <Text style={[styles.iconFont, _style, textStyle]}>{unicode}</Text>
        </View>
    );
};

Icon.propTypes = {
    unicode: PropTypes.string,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    color: PropTypes.string,
    offset: PropTypes.object
};

export default Icon;
