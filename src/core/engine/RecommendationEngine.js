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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RecommendationEngine = void 0;
var client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
var Logger_1 = require("../../utils/logger/Logger");
var RecommendationEngine = /** @class */ (function () {
    function RecommendationEngine() {
        this.bedrockClient = new client_bedrock_runtime_1.BedrockRuntimeClient({ region: process.env.AWS_REGION });
        this.logger = new Logger_1.Logger('RecommendationEngine');
    }
    RecommendationEngine.prototype.generateRecommendations = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt_1, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        prompt_1 = this.buildPrompt(request);
                        return [4 /*yield*/, this.invokeModel(prompt_1)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.processResponse(response)];
                    case 2:
                        error_1 = _a.sent();
                        this.logger.error('Error generating recommendations:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecommendationEngine.prototype.buildPrompt = function (request) {
        return JSON.stringify({
            prompt: "Generate product recommendations for user with the following preferences:\n                    Categories: ".concat(request.preferences.categories.join(', '), "\n                    Previous purchases: ").concat(request.preferences.previousPurchases.join(', '), "\n                    Interests: ").concat(request.preferences.interests.join(', ')),
            max_tokens: 1000,
            temperature: 0.7
        });
    };
    RecommendationEngine.prototype.invokeModel = function (prompt) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new client_bedrock_runtime_1.InvokeModelCommand({
                            modelId: process.env.BEDROCK_MODEL_ID,
                            contentType: "application/json",
                            accept: "application/json",
                            body: Buffer.from(prompt)
                        });
                        return [4 /*yield*/, this.bedrockClient.send(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecommendationEngine.prototype.processResponse = function (response) {
        // Process and format the model's response
        var recommendations = JSON.parse(response.body.toString());
        return {
            recommendations: recommendations.map(this.formatRecommendation)
        };
    };
    RecommendationEngine.prototype.formatRecommendation = function (item) {
        return {
            id: item.id,
            name: item.name,
            category: item.category,
            confidence: item.confidence,
            reasoning: item.reasoning
        };
    };
    return RecommendationEngine;
}());
exports.RecommendationEngine = RecommendationEngine;
