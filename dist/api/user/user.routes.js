"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_controller_1 = require("./user.controller");
exports.router = express_1.default.Router();
exports.router.get('/:userId', user_controller_1.userController.getUser);
exports.router.put('/', user_controller_1.userController.updateUser);
//# sourceMappingURL=user.routes.js.map