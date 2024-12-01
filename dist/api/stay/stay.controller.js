"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stayController = void 0;
const tslib_1 = require("tslib");
const stay_service_1 = require("./stay.service");
const logger_service_1 = require("../../services/logger.service");
function getStays(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const filterBy = req.query;
            const index = req.query['page'] ? +req.query['page'] : 0;
            logger_service_1.logger.debug('Getting stays');
            const stays = yield stay_service_1.stayService.query(filterBy, index);
            res.json(stays);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to get stays', err);
            res.status(500).send({ err: 'Failed to get stays' });
        }
    });
}
function getStaysLength(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const filterBy = req.query;
            logger_service_1.logger.debug('Getting stays length');
            const stays = yield stay_service_1.stayService.staysLength(filterBy);
            res.json(stays);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to get stays length', err);
            res.status(500).send({ err: 'Failed to get stays length' });
        }
    });
}
function getStayById(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const stayId = req.params['stayId'];
            const stay = yield stay_service_1.stayService.getById(stayId);
            res.json(stay);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to get stay', err);
            res.status(500).send({ err: 'Failed to get stay' });
        }
    });
}
function addStay(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const stay = req.body;
            const addedStay = yield stay_service_1.stayService.add(stay);
            res.json(addedStay);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to add stay', err);
            res.status(500).send({ err: 'Failed to add stay' });
        }
    });
}
function updateStay(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const stay = req.body;
            const updatedStay = yield stay_service_1.stayService.update(stay);
            res.json(updatedStay);
        }
        catch (err) {
            logger_service_1.logger.error('Failed to update stay', err);
            res.status(500).send({ err: 'Failed to update stay' });
        }
    });
}
exports.stayController = {
    getStays,
    getStaysLength,
    getStayById,
    addStay,
    updateStay,
};
//# sourceMappingURL=stay.controller.js.map