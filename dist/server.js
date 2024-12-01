"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const path_1 = tslib_1.__importDefault(require("path"));
const logger_service_1 = require("./services/logger.service");
const setupAls_middleware_1 = require("./middlewares/setupAls.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist/airbnb')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist/airbnb/index.html'));
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
const http = require('http').createServer(app);
if (process.env['NODE_ENV'] === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
        credentials: true
    };
    app.use((0, cors_1.default)(corsOptions));
}
// Import routes
const stay_routes_1 = require("./api/stay/stay.routes");
const order_routes_1 = require("./api/order/order.routes");
const user_routes_1 = require("./api/user/user.routes");
const auth_routes_1 = require("./api/auth/auth.routes");
// Setup routes
app.all('*', setupAls_middleware_1.setupAsyncLocalStorage);
app.use('/api/stay', stay_routes_1.router);
app.use('/api/order', order_routes_1.router);
app.use('/api/user', user_routes_1.router);
app.use('/api/auth', auth_routes_1.router);
app.get('/**', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
const port = process.env['PORT'] || 3030;
http.listen(port, () => {
    logger_service_1.logger.info('Server is running on port: ' + port);
});
//# sourceMappingURL=server.js.map