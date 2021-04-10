"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("./lib/client");
class Piston {
    constructor({ baseURL, apiKey = '', apiKeyHeader = '' }) {
        if (!baseURL)
            throw new Error('Must Provide A Base URL For The Piston Server');
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.apiKeyHeader = apiKeyHeader;
        this.client = client_1.default.create(this.baseURL, this.apiKey, this.apiKeyHeader);
    }
    run({ language, sourceCode, fileName, input = [''], expectedOutput, compileTimeout = 10000, runTimeout = 3000, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expectedOutput && input.length !== expectedOutput.length)
                throw new Error('Length of expected output must match length of input');
            const response = yield this.client.post('/jobs', Object.assign(Object.assign({ language: language.name, version: language.version, files: [
                    {
                        name: fileName,
                        content: sourceCode,
                    },
                ], main: fileName, stdin: input }, (expectedOutput && { expected_output: expectedOutput })), { compile_timeout: compileTimeout, run_timeout: runTimeout, args: [] }));
            return response.data;
        });
    }
}
exports.default = Piston;
//# sourceMappingURL=piston.js.map