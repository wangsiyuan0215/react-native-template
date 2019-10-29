/**
 * Created by wangsiyuan on 02/12/2017.
 */

export default (global, devEnv) => {
    if (!devEnv) {
        global.LOG = () => {};
        global.console = {
            info: () => {},
            log: () => {},
            warn: () => {},
            error: () => {}
        };
    } else {
        global.XMLHttpRequest = global.originalXMLHttpRequest
            ? global.originalXMLHttpRequest
            : global.XMLHttpRequest;
        global.FormData = global.originalFormData ? global.originalFormData : global.FormData;
        global.LOG = (tag, ...args) => {
            if (!args || !args.length) {
                args = [tag];
                tag = 'App';
            }

            console.info(`+==================== 🏀 LOG - ${tag} 🏈 ====================+`);
            args.map((item) => {
                console.log(` 📦 typeof: ${typeof item}`);
                if (typeof item === 'string' || typeof item === 'number') {
                    console.log(' 🍔 value: ', item);
                } else {
                    console.log(' 🍔 value: ');
                    console.log(item);
                }
            });
        };
    }
};
