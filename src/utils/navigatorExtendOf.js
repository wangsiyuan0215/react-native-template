/**
 * Created by wangsiyuan on 11/2/17.
 */
import { NavigationActions as originalActions } from 'react-navigation';

const BATCH = 'Navigation/BATCH';

/**
 * BATCH 批量处理路由事件
 * 使用方法：
 *      NavigationAction.batch({
            index: 4,
            actions: [
                NavigationActions.back(),
                NavigationActions.back(),
                NavigationActions.back(),
                NavigationActions.navigate({
                    routeName: 'Login'
                })
            ]
       })
 * @type {{
 *      BACK: string,
 *      INIT: string,
 *      BATCH: string,
 *      NAVIGATE: string,
 *      SET_PARAMS: string,
 *      back: function(*=): {type: string}
 *      init: function(*=): {type: string}
 *      batch: function(*=): {type: string}
 *      navigate: function(*=): {type: string}
 *      setParams: function(*=): {type: string}
 *  }}
 */
const NavigationActions = {
    ...originalActions,
    BATCH,
    batch: (payload = {}) => ({
        type: BATCH,
        ...payload
    })
};

export { NavigationActions };

export default Navigator => {
    const defaultGetStateForAction = Navigator.router.getStateForAction;

    const defaultRouterReducer = (state, action) => {
        return defaultGetStateForAction(action, state);
    };

    return {
        ...Navigator,
        router: {
            ...Navigator.router,
            getStateForAction: (action, state) => {
                if (state && action && action.type === 'Navigation/BATCH') {
                    const { actions } = action;
                    // const currentAction = index && actions[index] || actions[actions.length - 1];
                    // DeviceEventEmitter.emit(subscription.screenChanged, currentAction);
                    return actions.reduce(defaultRouterReducer, state);
                }

                return defaultGetStateForAction(action, state);
            }
        }
    };
};
