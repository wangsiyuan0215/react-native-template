/**
 * Created by wangsiyuan on 04/12/2017.
 */
import Toast from '@components/Toast';
import { curry } from 'lodash';

const networkIgnoreActions = [

];

/**
 * @param {Object} fns
 * @param {Object} onEffectInspector || false
 * @type {Function}
 */
const dvaEffectHelper = curry((fns, onEffectInspector, effect, effects, model, actionType) => {
    /* eslint func-names: ["off"] */
    return function* (...args) {
        const networkStatus = yield effects.select(state => state.app.networkStatus);
        const finalFns = Object.keys(fns)
            .reduce((accumulator, key) => ({ ...accumulator, [key]: fns[key](actionType) }), {});

        const paramsInspector = { ...finalFns, networkStatus };

        if (!networkStatus && !networkIgnoreActions.includes(actionType)) {
            return Toast.INTERNET_SHOW(language.errorMessage.networkDisabled);
        }

        if (!onEffectInspector) {
            yield effect(paramsInspector, ...args);
        } else {
            yield onEffectInspector
                .onEffect(effect, { ...effects }, model, actionType)(paramsInspector, ...args);
        }
    };
});

export default dvaEffectHelper;
