/**
 * Edited by WangSiYuan At 27/02/18
 */
import { DeviceEventEmitter } from 'react-native';

import delay from '@utils/delay';
import routerHelper from '@utils/helpers/routerHelper';
import subscription from '@resources/subscription';
import { routerReducer } from '@resources/routes';
import { NavigationActions } from '@utils/navigatorExtendOf';

const actions = [
    NavigationActions.BACK,
    NavigationActions.NAVIGATE,
    NavigationActions.BATCH,
    NavigationActions.INIT,
    NavigationActions.SET_PARAMS
];

const patternActions = (action) => {


    if (actions.includes(action.type)) {
        const payload = action.type === 'Navigation/RESET'
            ? action.actions[action.actions.length - 1]
            : action;
        DeviceEventEmitter.emit(subscription.screenChanged, payload);
        return true;
    }

    return false;
};

export default {
    namespace: 'router',
    state: {
        ...routerReducer()
    },
    subscriptions: {
        setup ({ dispatch }) {
            DeviceEventEmitter.addListener(subscription.urlChanged,
                (event) => {
                    dispatch({ type: 'responseForURLFromOuter', payload: event });
                });
        }
    },
    reducers: {
        apply (state, { payload: action }) {
            return routerReducer(state, action);
        }
    },
    effects: {
        /**
         * 回到首页
         * @param _
         * @param __
         * @param put
         */
        * goBackHome (_, __, { put }) {
            yield put(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeNavigator' })
                ]
            }));
        },
        watch: [
            function* ({ take, call, put, select }) {
                const loop = true;
                const delayActions = actions.slice(0, 4);
                while (loop) {
                    const { router } = yield select(state => state);
                    const payload = yield take(patternActions);
                    const action = payload;
                    const nextState = routerReducer(router, action);
                    if (
                        action.type === NavigationActions.NAVIGATE
                        || action.type === NavigationActions.BACK
                    ) {
                        const currentScreen = routerHelper.getCurrentRoute(router);
                        const nextScreen = routerHelper.getCurrentRoute(nextState);
                        if (nextScreen.routeName !== currentScreen.routeName) {
                        }
                    }
                    yield put({ type: 'apply', payload });
                    if (delayActions.includes(payload.type)) {
                        yield call(delay, 250);
                    }
                }
            },
            { type: 'watcher' }
        ]
    }
};
