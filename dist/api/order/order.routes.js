"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const order_controller_1 = require("./order.controller");
exports.router = express_1.default.Router();
exports.router.get('/', order_controller_1.orderController.getOrders);
exports.router.post('/', order_controller_1.orderController.addOrder);
exports.router.put('/', requireAuth_middleware_1.requireAuth, order_controller_1.orderController.updateOrder);
//# sourceMappingURL=order.routes.js.map