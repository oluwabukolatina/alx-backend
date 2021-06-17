"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Bonus = database_1.default.define('Bonus', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    modelName: 'Bonus',
    tableName: 'Bonuses',
});
exports.default = Bonus;
//# sourceMappingURL=bonus.js.map