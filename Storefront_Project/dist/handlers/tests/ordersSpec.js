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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = require("../../models/orders");
var database_1 = __importDefault(require("../../database"));
var server_1 = __importDefault(require("../../server"));
var users_1 = require("../../models/users");
var products_1 = require("../../models/products");
var supertest_1 = __importDefault(require("supertest"));
var order_test = new orders_1.orders();
var user_test = new users_1.users();
var product_test = new products_1.products();
var req = (0, supertest_1.default)(server_1.default);
var token = '';
describe("Testing API logic", function () {
    var userOne = {
        id: "1",
        firstname: "henry",
        lastname: "ford",
        email: "henryford@gmail.com",
        password: "1234",
    };
    var productOne = {
        id: "1",
        name: "vimto",
        price: "10",
        category: "drinks",
    };
    var orderOne = {
        id: "1",
        user_id: "1",
        orderstatus: "open",
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var userT, productT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_test.create(userOne)];
                case 1:
                    userT = _a.sent();
                    return [4 /*yield*/, product_test.create(productOne)];
                case 2:
                    productT = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sqlthree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sqlthree = "DELETE FROM orders CASCADE;";
                    return [4 /*yield*/, conn.query(sqlthree)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("Test CRUD API", function () {
        it(" Authenticate to get token for orders", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, email, userToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .post("/authenticate")
                            .set("Content-type", "application/json")
                            .send({
                            email: "henryford@gmail.com",
                            password: "1234",
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, email = _a.email, userToken = _a.token;
                        expect(email).toBe("henryford@gmail.com");
                        token = userToken;
                        return [2 /*return*/];
                }
            });
        }); });
        it("should create new order", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, user_id, orderstatus;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .post("/orders")
                            .set("Content-type", "application/json")
                            .set("Authorization", "Bearer ".concat(token))
                            .send(orderOne)];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body, user_id = _a.user_id, orderstatus = _a.orderstatus;
                        expect(user_id).toBe("1");
                        expect(orderstatus).toBe("open");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should get all orders", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .get("/orders")
                            .set("Content-type", "application/json")
                            .set("Authorization", "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should show order info", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .get("/orders/1")
                            .set("Content-type", "application/json")
                            .set("Authorization", "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.user_id).toBe("1");
                        expect(res.body.orderstatus).toBe("open");
                        return [2 /*return*/];
                }
            });
        }); });
        //addProduct
        it("should add product to an order", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .post("/orders/1/products")
                            .set("Content-type", "application/json")
                            .set("Authorization", "Bearer ".concat(token))
                            .send({
                            quantity: 10,
                            productId: productOne.id,
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(orderOne.id.toString()).toBe("1");
                        expect(res.body.user_id.toString()).toBe("1");
                        expect(res.body.orderstatus).toBe("open");
                        return [2 /*return*/];
                }
            });
        }); });
        // delete product from order
        it("should delete orderproducts", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .delete("/orderproducts/1")
                            .set("Content-type", "application/json")
                            .set("Authorization", "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.body).toBe("DELETING ORDER_PRODUCTS item SUCCESS!");
                        return [2 /*return*/];
                }
            });
        }); });
        // delete product
        it("should delete order", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .delete("/orders/1")
                            .set("Content-type", "application/json")
                            .set("Authorization", "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.id.toString()).toBe(orderOne.id);
                        expect(res.body.user_id.toString()).toBe("1");
                        expect(res.body.orderstatus).toBe("open");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
