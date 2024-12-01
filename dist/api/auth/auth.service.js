"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const user_service_1 = require("../user/user.service");
const logger_service_1 = require("../../services/logger.service");
function login(username, password) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        logger_service_1.logger.debug(`auth.service - login with username: ${username}`);
        const users = yield user_service_1.userService.getByUsername(username);
        if (!users.length) {
            return Promise.reject('Invalid username or password');
        }
        const user = users[0];
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return Promise.reject('Invalid username or password');
        }
        delete user.password;
        return user;
    });
}
function signup(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        logger_service_1.logger.debug(`auth.service - signup with username: ${user.username}, fullname: ${user.fullname}`);
        if (!user.username || !user.password || !user.fullname) {
            return Promise.reject('Missing required signup information');
        }
        const usersExist = yield user_service_1.userService.getByUsername(user.username);
        if (usersExist.length) {
            return Promise.reject('Username already taken');
        }
        const saltRounds = 10;
        user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
        return user_service_1.userService.add(user);
    });
}
function getLoginToken(user) {
    const tokenPayload = { _id: user._id, username: user.username, fullname: user.fullname };
    return JSON.stringify(tokenPayload);
}
function validateToken(loginToken) {
    try {
        const user = JSON.parse(loginToken);
        if (user && user._id && user.username) {
            return user;
        }
    }
    catch (err) {
        logger_service_1.logger.error('Invalid token:', err);
        return null;
    }
    return null;
}
exports.authService = {
    signup,
    login,
    getLoginToken,
    validateToken
};
//# sourceMappingURL=auth.service.js.map