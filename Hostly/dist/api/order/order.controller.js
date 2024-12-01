"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const tslib_1 = require("tslib");
const order_service_1 = require("./order.service");
const logger_service_1 = require("../../services/logger.service");
function getOrders(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            logger_service_1.logger.debug('Getting orders');
            const filterBy = req.query;
            const orders = yield order_service_1.orderService.query(filterBy);
            res.json(orders);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to get orders', err);
            res.status(500).send({ err: 'Failed to get orders' });
        }
    });
}
function addOrder(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const order = req.body;
            const addedOrder = yield order_service_1.orderService.add(order);
            res.json(addedOrder);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to add order', err);
            res.status(500).send({ err: 'Failed to add order' });
        }
    });
}
function updateOrder(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const order = req.body;
            const updatedOrder = yield order_service_1.orderService.update(order);
            res.json(updatedOrder);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to update order', err);
            res.status(500).send({ err: 'Failed to update order' });
        }
    });
}
exports.orderController = {
    getOrders,
    addOrder,
    updateOrder,
};
//# sourceMappingURL=order.controller.js.map