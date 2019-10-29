/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-14 17:12:35
 * @Description: route.config
 */
import { createStackNavigator } from 'react-navigation';

import Home from '@pages/Home';

/**
 * App navigator
 * 用于 App 初始化的路由
 */
const routerConfig = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        initialRouteName: 'Home'
    }
);

export default routerConfig;
