"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const als_service_1 = require("./als.service");
const logsDir = './logs';
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir);
}
//define the time format
function getTime() {
    let now = new Date();
    return now.toLocaleString('he');
}
function isError(e) {
    return e && e.stack && e.message;
}
function doLog(level, ...args) {
    var _a;
    const strs = args.map(arg => (typeof arg === 'string' || isError(arg)) ? arg : JSON.stringify(arg));
    var line = strs.join(' | ');
    const store = als_service_1.asyncLocalStorage.getStore();
    const userId = (_a = store === null || store === void 0 ? void 0 : store.loggedinUser) === null || _a === void 0 ? void 0 : _a._id;
    const str = userId ? `(userId: ${userId})` : '';
    line = `${getTime()} - ${level} - ${line} ${str}\n`;
    console.log(line);
    fs_1.default.appendFile('./logs/backend.log', line, (err) => {
        if (err)
            console.log('FATAL: cannot write to log file');
    });
}
exports.logger = {
    debug(...args) {
        if (process.env['NODE_NEV'] === 'production')
            return;
        doLog('DEBUG', ...args);
    },
    info(...args) {
        doLog('INFO', ...args);
    },
    warn(...args) {
        doLog('WARN', ...args);
    },
    error(...args) {
        doLog('ERROR', ...args);
    }
};
//# sourceMappingURL=logger.service.js.map