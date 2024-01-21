"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./sequelize"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
sequelize_1.default.authenticate().then(() => {
    app.listen(config_1.default.port, () => { console.log("Double Success"); });
}).catch((e) => { console.log(e); });
