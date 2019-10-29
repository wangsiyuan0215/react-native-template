/**
 * Created by wangsiyuan on 04/12/2017.
 */
// import { DeviceEventEmitter, Platform } from 'react-native';

const initialState = {};

export default {
    namespace: 'user',
    state: {
        ...initialState
    },
    subscriptions: {
        // setup ({ dispatch }) {
        //     DeviceEventEmitter.addListener(subscription.screenChanged, ({ routeName }) => {
        //         if (routeName === 'Me') {
        //             dispatch({ type: 'fetchMemberInfo' });
        //         }
        //     });
        // }
    },
    effects: {},
    reducers: {}
};
