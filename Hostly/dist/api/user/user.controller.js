"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const tslib_1 = require("tslib");
const user_service_1 = require("./user.service");
const logger_service_1 = require("../../services/logger.service");
function getUser(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_service_1.userService.getById(req.params['userId']);
            res.send(user);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to get user', err);
            res.status(500).send({ err: 'Failed to get user' });
        }
    });
}
function updateUser(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const updatedUser = yield user_service_1.userService.update(user);
            res.send(updatedUser);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to update user', err);
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
exports.userController = {
    getUser,
    updateUser
};
//# sourceMappingURL=user.controller.js.map