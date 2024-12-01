"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
if (process.env['NODE_ENV'] === 'production') {
    exports.config = require('./prod');
}
else {
    exports.config = require('./dev');
}
const port = process.env['PORT'] || 3030;
//# sourceMappingURL=index.js.map