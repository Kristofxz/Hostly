"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stayService = void 0;
const tslib_1 = require("tslib");
var dbService = require('../../services/db.service');
var ObjectId = require('mongodb').ObjectId;
var logger = require('../../services/logger.service');
const STAY_INCREMENT = 20;
function query(filterBy, index) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const criteria = _buildCriteria(filterBy);
            const collection = yield dbService.getCollection('stay');
            const stays = yield collection.find(criteria).toArray();
            return stays.slice(STAY_INCREMENT * index, STAY_INCREMENT * index + STAY_INCREMENT);
        }
        catch (err) {
            logger.error('cannot find stays', err);
            throw err;
        }
    });
}
function staysLength(filterBy) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const criteria = _buildCriteria(filterBy);
            const collection = yield dbService.getCollection('stay');
            const stays = yield collection.find(criteria).toArray();
            return stays.length;
        }
        catch (err) {
            logger.error('cannot find stays', err);
            throw err;
        }
    });
}
function getById(stayId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection('stay');
            const stay = collection.findOne({ _id: new ObjectId(stayId) });
            return stay;
        }
        catch (err) {
            logger.error(`while finding stay ${stayId}`, err);
            throw err;
        }
    });
}
function add(stay) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection('stay');
            yield collection.insertOne(stay);
            return stay;
        }
        catch (err) {
            logger.error('cannot insert stay', err);
            throw err;
        }
    });
}
function update(stay) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const stayToSave = Object.assign({}, stay);
            delete stayToSave._id;
            const collection = yield dbService.getCollection('stay');
            yield collection.updateOne({ _id: new ObjectId(stay._id) }, { $set: stayToSave });
            return stay;
        }
        catch (err) {
            logger.error(`cannot update stay ${stay._id}`, err);
            throw err;
        }
    });
}
function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.place) {
        criteria['loc.address'] = { $regex: filterBy.place, $options: 'i' };
    }
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.likeByUser) {
        criteria.likedByUsers = { $in: [filterBy.likeByUser] };
    }
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.label) {
        criteria.labels = { $in: [filterBy.label] };
    }
    if (filterBy === null || filterBy === void 0 ? void 0 : filterBy.hostId) {
        criteria['host._id'] = filterBy.hostId;
    }
    if ((filterBy === null || filterBy === void 0 ? void 0 : filterBy.isPetAllowed) === 'true') {
        criteria.amenities = { $in: ['Pets allowed'] };
    }
    return criteria;
}
exports.stayService = {
    query,
    staysLength,
    getById,
    add,
    update,
};
//# sourceMappingURL=stay.service.js.map