"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Client {
    static create(baseURL, apiKey, apiKeyHeader) {
        const headerObj = {};
        headerObj[`${apiKeyHeader}`] = apiKey;
        return axios_1.default.create({
            baseURL,
            headers: Object.assign({}, headerObj),
        });
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map