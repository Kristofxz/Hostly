"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAsyncLocalStorage = void 0;
const tslib_1 = require("tslib");
const auth_service_1 = require("../api/auth/auth.service");
const als_service_1 = require("../services/als.service");
function setupAsyncLocalStorage(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const storage = {};
        als_service_1.asyncLocalStorage.run(storage, () => {
            if (!req.cookies)
                return next();
            const loggedinUser = auth_service_1.authService.validateToken(req.cookies.loginToken);
            if (loggedinUser) {
                const alsStore = als_service_1.asyncLocalStorage.getStore();
                alsStore.loggedinUser = loggedinUser;
            }
            next();
        });
    });
}
exports.setupAsyncLocalStorage = setupAsyncLocalStorage;
//# sourceMappingURL=setupAls.middleware.js.map