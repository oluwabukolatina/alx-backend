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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const service_1 = __importDefault(require("../../../db/models/service"));
const { Op } = sequelize_1.default;
class ServiceService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield service_1.default.create(data);
            }
            catch (error) {
                return error;
            }
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield service_1.default.findAll();
            }
            catch (error) {
                return error;
            }
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield service_1.default.findByPk(id);
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * search
     */
    static search(q) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield service_1.default.findAll({
                    where: {
                        description: { [Op.iLike]: `%${q}%` },
                    },
                });
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = ServiceService;
//# sourceMappingURL=service.service.js.map