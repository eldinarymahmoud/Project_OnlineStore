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
var products_1 = require("../products");
var database_1 = __importDefault(require("../../database"));
var product_test = new products_1.products();
describe("Testing products model", function () {
    describe("Test product model exists", function () {
        it("Should have an create product method", function () {
            expect(product_test.create).toBeDefined();
        });
        it("Should have a read product method", function () {
            expect(product_test.index).toBeDefined();
        });
        it("Should have a show product method", function () {
            expect(product_test.show).toBeDefined();
        });
        it("Should have a delete product method", function () {
            expect(product_test.delete).toBeDefined();
        });
    });
    describe("Testing methods logic", function () {
        var productOne = {
            id: "5",
            name: "pepsi",
            price: "10",
            category: "drinks",
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var productT;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_test.create(productOne)];
                    case 1:
                        productT = _a.sent();
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
                        sqltwo = "DELETE FROM products;";
                        return [4 /*yield*/, conn.query(sqltwo)];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        // Checking if product created
        // Checking the return of get endpoint
        it("Get method should return All available products in DB", function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_test.index()];
                    case 1:
                        products = _a.sent();
                        expect(products.length).toBe(4);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Show method should return testproduct when called with ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_test.show(productOne.id)];
                    case 1:
                        returnedproduct = _a.sent();
                        expect(returnedproduct.name).toBe("pepsi");
                        expect(returnedproduct.category).toBe("drinks");
                        return [2 /*return*/];
                }
            });
        }); });
        //delete product
        it("Delete One method should delete product from DB", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_test.delete(productOne.id)];
                    case 1:
                        deletedproduct = _a.sent();
                        expect(deletedproduct.id.toString()).toBe(productOne.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
