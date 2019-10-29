/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-14 17:04:18
 * @Description: index
 */

import React from 'react';
// redux-persist 数据持久化
import { create } from 'dva-core';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import createLoading from 'dva-loading';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistReducer, persistStore } from 'redux-persist';

import user from '@models/user';
import router from '@models/router';
import logHelper from '@utils/helpers/logHelper';
import dvaEffectHelper from '@utils/helpers/dvaEffectHelper';
import loginMiddleWare from '@middles/login';
import { _, errorCreator } from '@utils/helpers/errorHelper';
import Router, { navigationMiddleware } from '@resources/routes';

// TODO... 1. Text 组件的属性 allowFontScaling 必须设置为 false

window.__REDUX_DEVTOOLS_EXTENSION__OPTIONS = {
    shouldHotReload: __DEV__
};

logHelper(GLOBAL, __DEV__);

const loading = createLoading({ effects: true });
const persistedReducer = reducer => {
    return persistReducer(
        {
            key: 'APP',
            storage: AsyncStorage,
            keyPrefix: 'LS_',
            whitelist: ['user']
        },
        reducer
    );
};
const app = create({
    onError: _,
    onAction: [loginMiddleWare, navigationMiddleware],
    onEffect: dvaEffectHelper({ errorCreator }, loading),
    onReducer: persistedReducer,
    initialState: {},
    extraReducers: [loading.extraReducers]
});

app.model(user);
app.model(router);

app.start();

GLOBAL.dva_store = app._store;

const App = () => (
    <Provider store={app._store}>
        <PersistGate loading={null} persistor={persistStore(app._store)}>
            <Router />
        </PersistGate>
    </Provider>
);

export default (__DEV__ ? App : /* codePushHelper(App) */ App);
