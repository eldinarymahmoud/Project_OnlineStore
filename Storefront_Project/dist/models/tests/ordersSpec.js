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
var orders_1 = require("../orders");
var products_1 = require("../../models/products");
var users_1 = require("../../models/users");
var database_1 = __importDefault(require("../../database"));
var order_test = new orders_1.orders();
var product_test = new products_1.products();
var user_test = new users_1.users();
describe("Testing orders model", function () {
    describe("Test order model exists", function () {
        it("Should have an create order method", function () {
            expect(order_test.create).toBeDefined();
        });
        it("Should have a read order method", function () {
            expect(order_test.index).toBeDefined();
        });
        it("Should have a show order method", function () {
            expect(order_test.show).toBeDefined();
        });
        it("Should have a delete order method", function () {
            expect(order_test.delete).toBeDefined();
        });
        it("Should have a delete order method", function () {
            expect(order_test.addProduct).toBeDefined();
        });
    });
    describe("Testing methods logic", function () {
        var userOne = {
            id: "4",
            firstname: "james",
            lastname: "bond",
            email: "jamesbond@gmail.com",
            password: "1234",
        };
        var orderOne = {
            id: "2",
            user_id: "4",
            orderstatus: "open",
        };
        var productOne = {
            id: "4",
            name: "miranda",
            price: "10",
            category: "drinks",
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var userT, productT, orderT;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_test.create(userOne)];
                    case 1:
                        userT = _a.sent();
                        return [4 /*yield*/, product_test.create(productOne)];
                    case 2:
                        productT = _a.sent();
                        return [4 /*yield*/, order_test.create(orderOne)];
                    case 3:
                        orderT = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sqltwo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqltwo = "DELETE FROM orders CASCADE";
                        return [4 /*yield*/, conn.query(sqltwo)];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        // Checking if order created
        // Checking the return of get endpoint
        it("Get method should return All available orders in DB", function () { return __awaiter(void 0, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_test.index()];
                    case 1:
                        orders = _a.sent();
                        expect(orders.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Show method should return testorder when called with ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedorder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_test.show(orderOne.id)];
                    case 1:
                        returnedorder = _a.sent();
                        expect(returnedorder.user_id).toBe("4");
                        expect(returnedorder.orderstatus).toBe("open");
                        return [2 /*return*/];
                }
            });
        }); });
        //add product to order
        it("Adding product to order", function () { return __awaiter(void 0, void 0, void 0, function () {
            var addedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_test.addProduct(10, orderOne.id, productOne.id)];
                    case 1:
                        addedProduct = _a.sent();
                        expect(addedProduct.user_id).toBe(userOne.id);
                        return [2 /*return*/];
                }
            });
        }); });
        //delete order
        it(" ---Delete order_products row---", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedorder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_test.deleteOrder_products("2")];
                    case 1:
                        deletedorder = _a.sent();
                        expect(deletedorder).toBe("DELETING ORDER_PRODUCTS item SUCCESS!");
                        return [2 /*return*/];
                }
            });
        }); });
        //delete order
        it("Delete method should delete order from DB", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedorder;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, order_test.delete(orderOne.id)];
                    case 1:
                        deletedorder = _b.sent();
                        expect((_a = deletedorder.id) === null || _a === void 0 ? void 0 : _a.toString()).toBe(orderOne.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
