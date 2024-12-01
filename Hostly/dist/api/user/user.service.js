"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const db_service_1 = require("../../services/db.service");
const logger_service_1 = require("../../services/logger.service");
function query() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield db_service_1.dbService.getCollection('user');
            const users = yield collection.find().toArray();
            const sanitizedUsers = users.map(user => {
                delete user.password;
                return user;
            });
            return sanitizedUsers;
        }
        catch (err) {
            logger_service_1.logger.error('cannot find users', err);
            throw err;
        }
    });
}
function getById(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield db_service_1.dbService.getCollection('user');
            const user = yield collection.findOne({ _id: new mongodb_1.ObjectId(userId) });
            if (user)
                delete user['password'];
            return user;
        }
        catch (err) {
            logger_service_1.logger.error(`while finding user by id: ${userId}`, err);
            throw err;
        }
    });
}
function getByUsername(username) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield db_service_1.dbService.getCollection('user');
            const users = yield collection.find({ username }).toArray();
            return users;
        }
        catch (err) {
            logger_service_1.logger.error(`while finding user by username: ${username}`, err);
            throw err;
        }
    });
}
function update(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const userToSave = Object.assign({}, user);
            delete userToSave._id;
            const collection = yield db_service_1.dbService.getCollection('user');
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(user._id) }, { $set: userToSave });
            return user;
        }
        catch (err) {
            logger_service_1.logger.error(`cannot update user ${user._id}`, err);
            throw err;
        }
    });
}
function add(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const userToAdd = Object.assign({}, user);
            const collection = yield db_service_1.dbService.getCollection('user');
            yield collection.insertOne(userToAdd);
            return userToAdd;
        }
        catch (err) {
            logger_service_1.logger.error('cannot add user', err);
            throw err;
        }
    });
}
exports.userService = {
    query,
    add,
    update,
    getById,
    getByUsername
};
//# sourceMappingURL=user.service.js.map