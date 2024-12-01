"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const config_1 = require("../config");
const als_service_1 = require("../services/als.service");
function requireAuth(req, res, next) {
    const loggedinUser = als_service_1.asyncLocalStorage.getStore();
    if (config_1.config.isGuestMode && !loggedinUser) {
        req.loggedinUser = { _id: '', fullname: 'Guest' };
        return next();
    }
    if (!loggedinUser)
        return res.status(401).send('Not Authenticated');
    next();
}
exports.requireAuth = requireAuth;
//# sourceMappingURL=requireAuth.middleware.js.map