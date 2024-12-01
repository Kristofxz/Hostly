"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const tslib_1 = require("tslib");
const db_service_1 = require("../../services/db.service");
const mongodb_1 = require("mongodb");
const logger_service_1 = require("../../services/logger.service");
function query(filterBy) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const criteria = _buildCriteria(filterBy);
            const collection = yield db_service_1.dbService.getCollection('order');
            var orders = yield collection.find(criteria).toArray();
            return orders;
        }
        catch (err) {
            logger_service_1.logger.error('cannot find orders', err);
            throw err;
        }
    });
}
function add(order) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield db_service_1.dbService.getCollection('order');
            yield collection.insertOne(order);
            return order;
        }
        catch (err) {
            logger_service_1.logger.error('cannot insert order', err);
            throw err;
        }
    });
}
function update(order) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const orderToSave = Object.assign({}, order);
            delete orderToSave._id;
            const collection = yield db_service_1.dbService.getCollection('order');
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(order._id) }, { $set: orderToSave });
            return order;
        }
        catch (err) {
            logger_service_1.logger.error(`cannot update order ${order._id}`, err);
            throw err;
        }
    });
}
function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.term) {
        const txtCriteria = { $regex: filterBy.term, $options: 'i' };
        criteria.$or = [
            {
                ['stay.name']: txtCriteria
            },
            {
                ['host.fullname']: txtCriteria
            }
        ];
    }
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.hostId)
        criteria['host._id'] = filterBy.hostId;
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.buyerId)
        criteria['buyer._id'] = filterBy.buyerId;
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.status)
        criteria.status = filterBy.status;
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.stayName)
        criteria['stay.name'] = filterBy.stayName.replace(/amp;/g, '&');
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.hostName)
        criteria['host.fullname'] = filterBy.hostName;
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.totalPrice)
        criteria.totalPrice = filterBy.totalPrice;
    return criteria;
}
exports.orderService = {
    query,
    add,
    update
};
//# sourceMappingURL=order.service.js.map