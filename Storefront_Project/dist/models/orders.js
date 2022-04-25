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
exports.orders = void 0;
var database_1 = __importDefault(require("../database"));
// class products is the representation of products table in JS
var orders = /** @class */ (function () {
    function orders() {
    }
    // READ
    orders.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Cannot get orders ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Read the row with Id 1
    orders.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders WHERE id=($1)";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // CREATE
    orders.prototype.create = function (b) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, order, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "INSERT INTO orders (user_id, orderstatus) VALUES ((SELECT id FROM users where id=($1)), $2) RETURNING *;";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [b.user_id, b.orderstatus])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not add new order ".concat(b.user_id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE order_product table to be able to delete the others because foreign key constraints
    orders.prototype.deleteOrder_products = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM order_products WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, "DELETING ORDER_PRODUCTS item SUCCESS!"];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not delete order_products. Error: ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE
    orders.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not delete order ".concat(id, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Adding product to an order
    orders.prototype.addProduct = function (quantity, orderID, productID) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sqlTwo, conn, result, secondconn, result_order_products, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, (SELECT id FROM orders where id=($2)), (SELECT id FROM products where id=($3))) RETURNING *";
                        sqlTwo = "SELECT * FROM orders WHERE id=($1)";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sqlTwo, [orderID])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows[0] === undefined) {
                            throw new Error("Could not add product ".concat(productID, " to order ").concat(orderID, ". Error: check inputs"));
                        }
                        return [4 /*yield*/, database_1.default.connect()];
                    case 3:
                        secondconn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                quantity,
                                orderID,
                                productID,
                            ])];
                    case 4:
                        result_order_products = _a.sent();
                        order = result.rows[0];
                        secondconn.release();
                        return [2 /*return*/, order];
                    case 5:
                        err_5 = _a.sent();
                        throw new Error("Could not add product ".concat(productID, " to order ").concat(orderID, ". Error: ").concat(err_5));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return orders;
}());
exports.orders = orders;
