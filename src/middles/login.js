/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-14 17:17:54
 * @Description: login
 */

import { NavigationActions } from '@utils/navigatorExtendOf';

// 需要登录的action
const loginActions = [
    'cart/handlePay/',
    'pay/payStepTwo/',
    'user/goToMeCouponCodesPage/@@start'
];

const routeNames = [
    'Share',
    'MeInfo',
    'MeFavorite',
    'MeAccount',
    'MeVoucher',
    'MeOrderRefund',
    'GoodDetailVouchers',
    'MeAccountCashRecharge',
    'CustomerServiceWebView',
    'MeAddressManagementHome'
];

const LoginMiddleWare = ({ getState, dispatch }) => next => (action) => {
    const { user: { userEntity } } = getState();
    const {
        token = null,
        isLogin = false
    } = userEntity || {};

    //  已登录，不做处理
    if (token && isLogin) return next(action);

    const { type } = action;
    const needLogin = loginActions.includes(type)
        || (type === 'Navigation/NAVIGATE' && routeNames.includes(action.routeName));

    // 未登录，不符合条件的action不作处理
    if (!needLogin) return next(action);

    // 未登录，若符合条件的action跳转到登录页面
    dispatch(NavigationActions.navigate({
        routeName: 'Login'
    }));
};

export default LoginMiddleWare;
