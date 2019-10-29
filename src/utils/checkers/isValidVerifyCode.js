/**
 * Created by wangsiyuan on 01/02/2018.
 */

/**
 * 验证码验证规则
 * @param code
 * @returns {boolean}
 */
export default code => /^\d{6}$/.test(code);
