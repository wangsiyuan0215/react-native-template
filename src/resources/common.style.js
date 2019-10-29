/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-14 17:16:04
 * @Description: common.style
 */

import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';

const BaseWidth = 750;
const BaseScreenHeight = 1280;
const baseDpi = PixelRatio.get();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const BasePixelScreenHeight = PixelRatio.getPixelSizeForLayoutSize(screenHeight);
const pr = BaseWidth / Dimensions.get('window').width;
const smallScreenAdapter = size => {
    return BasePixelScreenHeight <= BaseScreenHeight ? size * 0.9 : size;
};

const X_WIDTH = 375;
const X_HEIGHT = 812;
const isIPhoneX = (() => {
    if (Platform.OS === 'android') return false;

    return (
        Platform.OS === 'ios' &&
        ((screenHeight === X_HEIGHT && screenWidth === X_WIDTH) ||
            (screenHeight === X_WIDTH && screenWidth === X_HEIGHT))
    );
})();

const baseBorderWidth = StyleSheet.hairlineWidth;
const contentInset = { top: isIPhoneX ? -44 : -20 };
const statusBarHeight = Platform.OS === 'ios' ? (isIPhoneX && 44) || 20 : 0;
const iPhoneXBottomHeight = isIPhoneX ? 34 : 0;

export {
    pr,
    baseDpi,
    isIPhoneX,
    screenWidth,
    screenHeight,
    contentInset,
    smallScreenAdapter,
    iPhoneXBottomHeight
};

// 颜色
const whiteColor = '#fff'; // whiteColor
const backgroundColor = '#f5f6f1';
const majorColor = '#f18d01';
const defaultBlackColor = '#3A444A';
const lightGreenColor = '#f0f5ec';
const lightOrangeColor = '#ffca58';
const orangeColor = '#ffc600'; // orangeColor
const redColor = '#ff0000'; // redColor
const blueColor = '#4594e2'; // blueColor
const grayColor = '#c1c1c1'; //  grayColor
const darkGrayColor = '#878787'; // darkGrayColor
const lightGrayColor = '#e4e4e4'; // lightGrayColor
const thinBlackColor = '#393939'; // thinBlackColor
const blackColor = '#000000'; // blackColor
// 2017-11-28
const frenchGreyColor = '#979797';
const creamColor = '#f9f8f0';
const dullGrayColor = '#f6f6f6';
const roseRedColor = '#ea3345';
const orangeRedColor = '#ff4800';
const recommendColor = '#b8b8b8';
const pinkRedColor = '#FF5371';

// 字体大小
const FontSize20 = 20 / pr; // FontSize20
const FontSize22 = 22 / pr; // FontSize22
const FontSize24 = 24 / pr; // FontSize24
const FontSize26 = 26 / pr; // FontSize26
const FontSize28 = 28 / pr; // FontSize28
const FontSize30 = 30 / pr; // FontSize30
const FontSize32 = 32 / pr; // FontSize32
const FontSize34 = 34 / pr; // FontSize34
const FontSize36 = 36 / pr; // FontSize36
const FontSize38 = 38 / pr; // FontSize38

export default {
    // colors
    whiteColor,
    backgroundColor,
    majorColor,
    lightGreenColor,
    lightOrangeColor,
    orangeColor,
    redColor,
    blueColor,
    defaultBlackColor,
    recommendColor,
    grayColor,
    darkGrayColor,
    lightGrayColor,
    thinBlackColor,
    blackColor,
    frenchGreyColor,
    creamColor,
    dullGrayColor,
    roseRedColor,
    orangeRedColor,
    pinkRedColor,

    // fonts size
    FontSize20,
    FontSize22,
    FontSize24,
    FontSize26,
    FontSize28,
    FontSize30,
    FontSize32,
    FontSize34,
    FontSize36,
    FontSize38,

    baseBorderWidth,
    statusBarHeight
};
