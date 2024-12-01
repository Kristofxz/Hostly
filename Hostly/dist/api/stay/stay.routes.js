"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const stay_controller_1 = require("./stay.controller");
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
exports.router = express_1.default.Router();
exports.router.get('/', stay_controller_1.stayController.getStays);
exports.router.get('/length', stay_controller_1.stayController.getStaysLength);
exports.router.get('/:stayId', stay_controller_1.stayController.getStayById);
exports.router.post('/', stay_controller_1.stayController.addStay);
exports.router.put('/', requireAuth_middleware_1.requireAuth, stay_controller_1.stayController.updateStay);
//# sourceMappingURL=stay.routes.js.map