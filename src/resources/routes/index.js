/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-14 17:16:39
 * @Description: index
 */
import React from 'react';
import RNExitApp from 'react-native-exit-app';
import { connect } from 'react-redux';
import { BackHandler, Platform } from 'react-native';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import routerConfig from '@resources/routes/route.config';
import navigatorExtendOf, { NavigationActions } from '@utils/navigatorExtendOf';

export const navigationMiddleware = createReactNavigationReduxMiddleware(state => state.router);

const Navigator = navigatorExtendOf(routerConfig);

export const routerReducer = (state, action = {}) =>
    Navigator.router.getStateForAction(action, state);

const AppContainer = createReduxContainer(routerConfig, 'root');

class Router extends React.Component {
    componentDidMount() {
        // const { dispatch } = this.props;
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.backHandle);
        }
        // dispatch({ type: 'app/init' });
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
        }
    }

    getCurrentScreen = navigationState => {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            return this.getCurrentScreen(route);
        }
        return route.routeName;
    };

    backHandle = () => {
        const { dispatch, router } = this.props;
        const currentScreen = this.getCurrentScreen(router);

        if (currentScreen !== 'Home' && currentScreen !== 'GuidePages') {
            dispatch(NavigationActions.back());
            return true;
        }
        RNExitApp.exitApp();
        return true;
    };

    render() {
        const { dispatch, router } = this.props;
        return <AppContainer state={router} dispatch={dispatch} />;
    }
}

const mapStateToProps = ({ router }) => ({
    router
});

export default connect(mapStateToProps)(Router);
