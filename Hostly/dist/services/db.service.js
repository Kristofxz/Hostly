"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbService = exports.getCollection = void 0;
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
const logger_service_1 = require("./logger.service");
let dbConn = null;
function getCollection(collectionName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield connect();
            const collection = yield db.collection(collectionName);
            return collection;
        }
        catch (err) {
            logger_service_1.logger.error('Failed to get Mongo collection', err);
            throw err;
        }
    });
}
exports.getCollection = getCollection;
function connect() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (dbConn)
            return dbConn;
        try {
            const client = yield mongodb_1.MongoClient.connect(config_1.config.dbURL);
            const db = client.db(config_1.config.dbName);
            dbConn = db;
            return db;
        }
        catch (err) {
            logger_service_1.logger.error('Cannot Connect to DB', err);
            throw err;
        }
    });
}
exports.dbService = {
    getCollection
};
//# sourceMappingURL=db.service.js.map