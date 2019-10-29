/**
 * Edited by WangSiYuan At 27/02/18
 */
/**
 * 通过 routeName 递归获取对应 routeName 的key
 * 不仅限于 MainNavigator 或者是 modalNavigator
 * @type {RegExp}
 */
const navigationRegExp = /\d{13}-(\d*)$/;
export const getKeyByRouteName = (routeName, routes) => {
    if (!routeName) return null;

    const routesLength = routes.length;
    for (let index = 0; index < routesLength; index++) {
        const route = routes[index];
        if (!navigationRegExp.test(route.key)) return null;
        if (!route.routes) return null;
        if (route.routeName === routeName) {
            return index === routesLength - 1 ? route.routes[1].key : routes[index + 1].key;
        }

        return getKeyByRouteName(routeName, route.routes);
    }
};

export function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

export function getCurrentRoute(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRoute(route);
    }
    return route;
}
