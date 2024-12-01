"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
exports.router = express_1.default.Router();
exports.router.post('/login', auth_controller_1.authController.login);
exports.router.post('/signup', auth_controller_1.authController.signup);
exports.router.post('/logout', auth_controller_1.authController.logout);
exports.default = exports.router;
//# sourceMappingURL=auth.routes.js.map