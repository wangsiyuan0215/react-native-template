/**
 * Created by wangsiyuan on 11/7/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View } from 'react-native';

import Icon from '@components/IconComponent';
import styles, { BaseStyle } from './style.toast';

class ToastContainer extends React.PureComponent {
    static propTypes = {
        visible: PropTypes.bool,
        message: PropTypes.string,
        unicode: PropTypes.string
    };

    static defaultProps = {
        duration: 2000,
        visible: false,
        unicode: '\ue60f'
    };

    constructor (props) {
        super(props);

        this.state = {
            animatedValue: new Animated.Value(props.visible ? 1 : 0)
        };
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.visible !== nextProps.visible) {
            nextProps.visible ? this.show() : this.hide();
        }
    }

    show = () => {
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    hide = () => {
        Animated.timing(this.state.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    render () {
        const { message, unicode } = this.props;
        const { animatedValue } = this.state;
        const animatedStyle = {
            opacity: animatedValue.interpolate({
                inputRange: [0, 0.9, 1],
                outputRange: [0, 0, 1]
            }),
            transform: [{
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                })
            }]
        };
        return (
            <Animated.View style={[styles.alertContainer, animatedStyle]}>
                <View style={styles.alertBox}>
                    <Icon
                        size="36"
                        style={styles.iconWrapper}
                        color={BaseStyle.whiteColor}
                        offset={{ y: 2 }}
                        unicode={unicode}
                    />
                    <Text style={styles.text}>
                        {message}
                    </Text>
                </View>
            </Animated.View>
        );
    }
}
export default ToastContainer;
