/**
 * Created by wangsiyuan on 01/02/2018.
 */

/**
 * 验证 nickname 是否可用
 * 验证规则是：非空字符 3 - 10 个
 * @param nickname
 * @returns {boolean}
 */
export default nickname => /^\S{3,10}$/.test(nickname);
