"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const tslib_1 = require("tslib");
const auth_service_1 = require("./auth.service");
const logger_service_1 = require("../../services/logger.service");
function login(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield auth_service_1.authService.login(username, password);
            const loginToken = auth_service_1.authService.getLoginToken(user);
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
            res.json(user);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to login: ' + err);
            res.status(401).send({ error: 'Invalid username or password' });
        }
    });
}
function signup(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const newUser = yield auth_service_1.authService.signup(user);
            const loginToken = auth_service_1.authService.getLoginToken(newUser);
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
            res.status(201).json(newUser);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to signup: ' + err);
            res.status(400).send({ error: 'Failed to signup' });
        }
    });
}
function logout(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('loginToken', { sameSite: 'none', secure: true });
            res.send({ message: 'Logged out successfully' });
        }
        catch (err) {
            logger_service_1.logger.error('Failed to logout: ' + err);
            res.status(500).send({ error: 'Failed to logout' });
        }
    });
}
exports.authController = {
    login,
    signup,
    logout
};
//# sourceMappingURL=auth.controller.js.map